// src/components/ConfigurableGridLayout.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import './GridLayout.css';
import ModuleContainer from './ModuleContainer';

const ResponsiveGridLayout = WidthProvider(Responsive);

// 使用 forwardRef 包装组件，以便外部能获取 ref
const ConfigurableGridLayout = React.forwardRef(
  (
    { modules = [], onLayoutChange, isEditable = true, showSettings = true },
    ref
  ) => {
    const [layout, setLayout] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [gridRows, setGridRows] = useState(4);
    const [isDragging, setIsDragging] = useState(false);

    const calculateGridRows = useCallback(
      (currentLayout, isDraggingMode = false) => {
        if (!currentLayout || currentLayout.length === 0) {
          return 4;
        }
        const maxY = Math.max(...currentLayout.map((item) => item.y + item.h));
        const extraRows = isDraggingMode ? 4 : 2;
        return Math.max(maxY + extraRows, 4);
      },
      []
    );

    const saveLayout = useCallback((newLayout) => {
      localStorage.setItem('dashboard-layout', JSON.stringify(newLayout));
    }, []);

    useEffect(() => {
      const savedLayout = localStorage.getItem('dashboard-layout');
      if (savedLayout) {
        try {
          const parsedLayout = JSON.parse(savedLayout);
          setLayout(parsedLayout);
          const savedRows = calculateGridRows(parsedLayout);
          setGridRows(savedRows);
        } catch (error) {
          console.error('Failed to parse saved layout:', error);
          setLayout([]);
        }
      }
      setMounted(true);
    }, [calculateGridRows]);

    const handleLayoutChange = useCallback(
      (currentLayout, allLayouts) => {
        if (isEditable) {
          setLayout(currentLayout);
          const newRows = calculateGridRows(currentLayout, isDragging);
          setGridRows(newRows);
          saveLayout(currentLayout);
          if (onLayoutChange) {
            onLayoutChange(currentLayout, allLayouts);
          }
        }
      },
      [saveLayout, onLayoutChange, isEditable, calculateGridRows, isDragging]
    );

    const handleDragStart = useCallback(
      (layout, oldItem, newItem, placeholder, e, element) => {
        setIsDragging(true);
        const expandedRows = calculateGridRows(layout, true);
        setGridRows(expandedRows);
      },
      [calculateGridRows]
    );

    const handleDrag = useCallback(
      (layout, oldItem, newItem, placeholder, e, element) => {
        const allItems = layout.map((item) =>
          item.i === newItem.i ? newItem : item
        );
        const currentMaxY = Math.max(
          ...allItems.map((item) => item.y + item.h)
        );
        if (currentMaxY >= gridRows - 2) {
          const newRows = Math.max(gridRows, currentMaxY + 3);
          setGridRows(newRows);
        }
      },
      [gridRows]
    );

    const handleDragStop = useCallback(
      (layout, oldItem, newItem, placeholder, e, element) => {
        setIsDragging(false);
        const finalRows = calculateGridRows(layout, false);
        setGridRows(finalRows);
      },
      [calculateGridRows]
    );

    const generateDefaultLayout = useCallback(() => {
      return modules.map((module, index) => ({
        i: module.id,
        x: (index * (module.defaultSize?.w || 2)) % 12,
        y: Math.floor(index / (12 / (module.defaultSize?.w || 2))),
        w: module.defaultSize?.w || 2,
        h: module.defaultSize?.h || 2,
        minW: module.minSize?.w || 1,
        minH: module.minSize?.h || 1,
      }));
    }, [modules]);

    useEffect(() => {
      if (mounted && layout.length === 0 && modules.length > 0) {
        const defaultLayout = generateDefaultLayout();
        setLayout(defaultLayout);
        const initialRows = calculateGridRows(defaultLayout);
        setGridRows(initialRows);
        saveLayout(defaultLayout);
      }
    }, [
      mounted,
      layout.length,
      modules.length,
      generateDefaultLayout,
      saveLayout,
      calculateGridRows,
    ]);

    if (!mounted) {
      return null;
    }

    return (
      // 关键：把 ref 传给外层 Box，供 html2canvas 截图
      <Box
        ref={ref}
        className="grid-layout-container"
        height="100%"
        width="100%"
      >
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={100}
          rows={gridRows}
          onLayoutChange={handleLayoutChange}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragStop={handleDragStop}
          onResizeStart={handleDragStart}
          onResize={handleDrag}
          onResizeStop={handleDragStop}
          isDraggable={isEditable}
          isResizable={isEditable}
          margin={[16, 16]}
          containerPadding={[16, 16]}
          autoSize={true}
          preventCollision={true}
          compactType={null}
          allowOverlap={false}
          verticalCompact={false}
          useCSSTransforms={true}
          // 🔥 修复输入框跳动的关键：禁止在输入框上拖拽
          draggableCancel=".no-drag, input, textarea, button, [contenteditable]"
          // 可选：只有 .drag-handle 才能拖拽
          draggableHandle=".drag-handle"
        >
          {modules.map((module) => (
            <Box key={module.id} className="grid-item">
              <ModuleContainer
                module={module}
                showSettings={showSettings && isEditable}
              />
            </Box>
          ))}
        </ResponsiveGridLayout>
      </Box>
    );
  }
);

ConfigurableGridLayout.displayName = 'ConfigurableGridLayout';

export default ConfigurableGridLayout;
