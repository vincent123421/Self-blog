import { Box, Text, VStack, Alert, AlertIcon, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ModuleLoader from '../core/module-loader';
import { loadConfig, saveConfig } from '../core/config-manager';
import ConfigurableGridLayout from '../components/ConfigurableGridLayout';

const Dashboard = () => {
  const [modules, setModules] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const moduleIds = ['TestModule', 'ClockModule', 'WelcomeModule', 'TextCardModule'];

  useEffect(() => {
    let mounted = true;
    
    const loadModules = async () => {
      try {
        const modulePromises = moduleIds.map(id => ModuleLoader.load(id));
        const loadedModules = await Promise.all(modulePromises);
        
        if (!mounted) return;
        
        // 确保有配置保存用于演示
        loadedModules.forEach(moduleDef => {
          const existing = loadConfig(moduleDef.id, moduleDef.defaultConfig || {});
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

  return (
    <VStack spacing={6} align="stretch">
      <Box textAlign="center">
        <Text fontSize="2xl" mb={4}>
          Welcome to Dashboard
        </Text>
        <Text color="gray.600">这里是仪表盘主页面，支持拖拽布局的个人主页</Text>
      </Box>

      {error && (
        <Alert status="error">
          <AlertIcon />
          加载模块失败：{String(error)}
        </Alert>
      )}

      {loading && (
        <Box display="flex" gap={3} alignItems="center" justifyContent="center">
          <Spinner size="sm" />
          <Text>Loading modules...</Text>
        </Box>
      )}

      {!loading && !error && modules.length > 0 && (
        <Box>
          <ConfigurableGridLayout 
            modules={modules} 
            onLayoutChange={handleLayoutChange}
            isEditable={false}
            showSettings={false}
          />
        </Box>
      )}

      <Alert status="info">
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

      <Alert status="success">
        <AlertIcon />
        <Box>
          <Text fontWeight="bold">当前加载的模块：</Text>
          <Text fontSize="sm">
            {modules.map(module => `• ${module.name} (${module.id})`).join('\n')}
          </Text>
        </Box>
      </Alert>
    </VStack>
  );
};

export default Dashboard;