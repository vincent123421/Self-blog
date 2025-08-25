import {
  Box,
  Text,
  VStack,
  Alert,
  AlertIcon,
  Spinner,
  HStack,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModuleLoader from '../core/module-loader';
import { loadConfig, saveConfig } from '../core/config-manager';
import ConfigurableGridLayout from '../components/ConfigurableGridLayout';

const Editor = () => {
  const [modules, setModules] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const moduleIds = ['TestModule', 'ClockModule', 'WelcomeModule'];

  useEffect(() => {
    let mounted = true;

    const loadModules = async () => {
      try {
        const modulePromises = moduleIds.map((id) => ModuleLoader.load(id));
        const loadedModules = await Promise.all(modulePromises);

        if (!mounted) return;

        // 确保有配置保存用于演示
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

  return (
    <VStack spacing={6} align="stretch">
      <Box textAlign="center">
        <Text fontSize="2xl" mb={4}>
          模块编辑器
        </Text>
        <Text color="gray.600">拖拽和配置你的个人主页模块</Text>
      </Box>

      <HStack justify="center" spacing={4}>
        <Button as={Link} to="/" colorScheme="blue" variant="outline">
          预览效果
        </Button>
        <Button colorScheme="green">保存配置</Button>
      </HStack>

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
            isEditable={true}
            showSettings={true}
          />
        </Box>
      )}

      <Alert status="info">
        <AlertIcon />
        <Box>
          <Text fontWeight="bold">编辑功能：</Text>
          <Text fontSize="sm">
            • 拖拽模块到不同位置
            <br />• 拉伸模块大小
            <br />• 点击设置按钮配置模块内容
            <br />• 布局自动保存
            <br />• 点击"预览效果"查看最终效果
          </Text>
        </Box>
      </Alert>
    </VStack>
  );
};

export default Editor;
