import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import './GridLayout.css';
import ModuleContainer from './ModuleContainer';

const ResponsiveGridLayout = WidthProvider(Responsive);

const ConfigurableGridLayout = ({ 
  modules = [], 
  onLayoutChange, 
  isEditable = true,
  showSettings = true 
}) => {
  const [layout, setLayout] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [gridRows, setGridRows] = useState(4);
  const gridRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // 计算网格行数
  const calculateGridRows = useCallback((currentLayout, isDraggingMode = false) => {
    if (!currentLayout || currentLayout.length === 0) {
      return 4; // 默认4行
    }
    
    // 找到最底部的模块位置
    const maxY = Math.max(...currentLayout.map(item => item.y + item.h));
    // 拖拽时添加更多额外行数，让用户有足够空间
    const extraRows = isDraggingMode ? 4 : 2;
    return Math.max(maxY + extraRows, 4); // 最少4行
  }, []);

  // 保存布局到localStorage
  const saveLayout = useCallback((newLayout) => {
    localStorage.setItem('dashboard-layout', JSON.stringify(newLayout));
  }, []);

  // 从localStorage加载布局
  useEffect(() => {
    const savedLayout = localStorage.getItem('dashboard-layout');
    if (savedLayout) {
      try {
        const parsedLayout = JSON.parse(savedLayout);
        setLayout(parsedLayout);
        
        // 计算保存的布局的网格行数
        const savedRows = calculateGridRows(parsedLayout);
        setGridRows(savedRows);
      } catch (error) {
        console.error('Failed to parse saved layout:', error);
        setLayout([]);
      }
    }
    setMounted(true);
  }, [calculateGridRows]);

  // 处理布局变化
  const handleLayoutChange = useCallback((currentLayout, allLayouts) => {
    if (isEditable) {
      console.log('Layout changed:', currentLayout);
      setLayout(currentLayout);
      
      // 动态调整网格行数
      const newRows = calculateGridRows(currentLayout, isDragging);
      setGridRows(newRows);
      
      saveLayout(currentLayout);
      if (onLayoutChange) {
        onLayoutChange(currentLayout, allLayouts);
      }
    }
  }, [saveLayout, onLayoutChange, isEditable, calculateGridRows, isDragging]);

  // 处理拖拽开始
  const handleDragStart = useCallback((layout, oldItem, newItem, placeholder, e, element) => {
    setIsDragging(true);
    // 立即扩展网格以提供更多拖拽空间
    const expandedRows = calculateGridRows(layout, true);
    setGridRows(expandedRows);
  }, [calculateGridRows]);

  // 处理拖拽/缩放过程中
  const handleDrag = useCallback((layout, oldItem, newItem, placeholder, e, element) => {
    // 检查是否需要进一步扩展网格
    const allItems = layout.map(item => item.i === newItem.i ? newItem : item);
    const currentMaxY = Math.max(...allItems.map(item => item.y + item.h));
    
    // 如果当前操作的项目接近网格底部，扩展网格
    if (currentMaxY >= gridRows - 2) {
      const newRows = Math.max(gridRows, currentMaxY + 3);
      setGridRows(newRows);
    }
  }, [gridRows]);

  // 处理拖拽结束
  const handleDragStop = useCallback((layout, oldItem, newItem, placeholder, e, element) => {
    setIsDragging(false);
    // 拖拽结束后重新计算合适的网格行数
    const finalRows = calculateGridRows(layout, false);
    setGridRows(finalRows);
  }, [calculateGridRows]);

  // 生成默认布局
  const generateDefaultLayout = useCallback(() => {
    return modules.map((module, index) => ({
      i: module.id,
      x: (index * 2) % 12, // 每行最多6个模块
      y: Math.floor(index / 6), // 每6个模块换行
      w: 2,
      h: 2,
      minW: 1,
      minH: 1,
    }));
  }, [modules]);

  // 如果没有保存的布局，生成默认布局
  useEffect(() => {
    if (mounted && layout.length === 0 && modules.length > 0) {
      const defaultLayout = generateDefaultLayout();
      setLayout(defaultLayout);
      
      // 设置初始网格行数
      const initialRows = calculateGridRows(defaultLayout);
      setGridRows(initialRows);
      
      saveLayout(defaultLayout);
    }
  }, [mounted, layout.length, modules.length, generateDefaultLayout, saveLayout, calculateGridRows]);

  if (!mounted) {
    return null;
  }

  return (
    <Box>
      <ResponsiveGridLayout
        ref={gridRef}
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
};

export default ConfigurableGridLayout;
