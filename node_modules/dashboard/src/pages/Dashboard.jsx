// src/pages/Dashboard.jsx
import {
  Box,
  Text,
  VStack,
  Alert,
  AlertIcon,
  Spinner,
  HStack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import Header_blackandwhite from '../components/Header_blackandwhite';
import ModuleLoader from '../core/module-loader';
import { loadConfig, saveConfig } from '../core/config-manager';
import ConfigurableGridLayout from '../components/ConfigurableGridLayout';

const Dashboard = () => {
  const [modules, setModules] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const moduleIds = ['TestModule', 'ClockModule', 'WelcomeModule'];
  const modulesRef = useRef(null);
  const bgColor = useColorModeValue('white', 'gray.900');

  useEffect(() => {
    let mounted = true;

    const loadModules = async () => {
      try {
        const modulePromises = moduleIds.map((id) => ModuleLoader.load(id));
        const loadedModules = await Promise.all(modulePromises);

        if (!mounted) return;

        loadedModules.forEach((moduleDef) => {
          const existing = loadConfig(
            moduleDef.id,
            moduleDef.defaultConfig || {}
          );
          saveConfig(moduleDef.id, existing);
        });

        setModules(loadedModules);
      } catch (e) {
        if (!mounted) return;
        setError(e);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadModules();

    return () => {
      mounted = false;
    };
  }, []);

  const handleLayoutChange = (currentLayout, allLayouts) => {
    console.log('Layout changed:', currentLayout);
  };

  const handleExport = async () => {
    if (!modulesRef.current) {
      alert('无法找到要导出的内容');
      return;
    }

    try {
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; padding: 12px;
        background: #38a169; color: white; border-radius: 6px; z-index: 9999;
      `;
      toast.textContent = '正在导出...';
      document.body.appendChild(toast);

      const canvas = await html2canvas(modulesRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: bgColor,
        logging: false,
        imageTimeout: 15000,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `my-dashboard-${Date.now()}.png`;
      link.href = imgData;
      link.click();

      toast.textContent = '导出成功！';
      toast.style.background = '#38a169';
      setTimeout(() => document.body.removeChild(toast), 2000);
    } catch (error) {
      console.error('导出失败:', error);
      alert('导出失败，请检查控制台');
    }
  };

  return (
    <VStack spacing={0} align="stretch" h="100vh">
      {/* 🔥 使用新 Header */}
      <Header_blackandwhite />

      {/* 主内容区 */}
      <Box flex="1" overflow="auto" p={6} bg="bg.page" color="text.primary">
        <HStack justify="flex-end" mb={6}>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={handleExport}
            leftIcon={<span>⬇️</span>}
          >
            一键导出为图片
          </Button>
        </HStack>

        <Box textAlign="center" mb={6}>
          <Text fontSize="2xl" mb={4}>
            Welcome to Dashboard
          </Text>
          <Text color="text.secondary">
            这里是仪表盘主页面，支持拖拽布局的个人主页
          </Text>
        </Box>

        {error && (
          <Alert status="error">
            <AlertIcon />
            加载模块失败：{String(error)}
          </Alert>
        )}

        {loading && (
          <Box
            display="flex"
            gap={3}
            alignItems="center"
            justifyContent="center"
          >
            <Spinner size="sm" />
            <Text>Loading modules...</Text>
          </Box>
        )}

        {!loading && !error && modules.length > 0 && (
          <Box ref={modulesRef}>
            <ConfigurableGridLayout
              modules={modules}
              onLayoutChange={handleLayoutChange}
              isEditable={false}
              showSettings={false}
            />
          </Box>
        )}

        <Alert status="info" mt={6}>
          <AlertIcon />
          <Box>
            <Text fontWeight="bold">Dashboard 展示页面：</Text>
            <Text fontSize="sm">
              • 这是只读的展示界面
              <br />• 显示用户在编辑器中配置的布局
              <br />• 适合对外分享和展示
              <br />• 如需编辑，请访问 /editor 页面
            </Text>
          </Box>
        </Alert>
      </Box>
    </VStack>
  );
};

export default Dashboard;
