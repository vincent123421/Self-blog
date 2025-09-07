import React from 'react';
import {
  Box,
  Text as ChakraText,
  VStack,
  Badge,
  Progress,
} from '@chakra-ui/react';
import { InlineTextEditor } from '../../components/common';
import Markdown from 'react-markdown';

function TestModuleComponent({ config, onConfigChange, showSettings = true }) {
  const isEditable = showSettings;
  const handleConfigChange = (field, value) => {
    onConfigChange?.({ ...config, [field]: value });
  };
  const md = `## Hello, world!
  
  This is a simple paragraph with some **bold** text.`;
  return (
    <VStack spacing={3} align="stretch" height="100%">
      <Box>
        <InlineTextEditor
          value={config?.title}
          onChange={(value) => handleConfigChange('title', value)}
          placeholder="测试模块"
          disabled={!isEditable}
          textProps={{
            fontSize: 'lg',
            fontWeight: 'bold',
            color: 'blue.600',
          }}
        />
        <InlineTextEditor
          value={config?.description}
          onChange={(value) => handleConfigChange('description', value)}
          placeholder="这是一个可拖拽和缩放的测试模块"
          disabled={!isEditable}
          textProps={{
            fontSize: 'sm',
            color: 'gray.600',
            mt: 1,
          }}
        />
      </Box>

      <Box>
        <InlineTextEditor
          value={config?.message}
          onChange={(value) => handleConfigChange('message', value)}
          placeholder="Hello from Test Module!"
          disabled={!isEditable}
          textProps={{
            fontSize: 'md',
            p: 2,
            bg: 'gray.50',
            borderRadius: 'md',
          }}
        />
      </Box>

      <Box>
        <Markdown>{md}</Markdown>
      </Box>

      <Box>
        <ChakraText fontSize="sm" fontWeight="medium" mb={2}>
          进度示例:
        </ChakraText>
        <Progress value={config?.progress || 65} colorScheme="blue" size="sm" />
        <ChakraText fontSize="xs" color="gray.500" mt={1}>
          {config?.progress || 65}% 完成
        </ChakraText>
      </Box>

      <Box>
        <ChakraText fontSize="sm" fontWeight="medium" mb={2}>
          标签示例:
        </ChakraText>
        <Box>
          <Badge colorScheme="green" mr={2} mb={1}>
            React
          </Badge>
          <Badge colorScheme="blue" mr={2} mb={1}>
            Grid
          </Badge>
          <Badge colorScheme="purple" mb={1}>
            Layout
          </Badge>
        </Box>
      </Box>
    </VStack>
  );
}

export const module = {
  id: 'TestModule',
  name: '测试模块',
  component: TestModuleComponent,
  defaultSize: { w: 3, h: 3 },
  minSize: { w: 2, h: 2 },
  defaultConfig: {
    title: '测试模块',
    description: '这是一个可拖拽和缩放的测试模块',
    message: 'Hello from Test Module!',
    progress: 65,
  },
  configSchema: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      message: { type: 'string' },
      progress: { type: 'number' },
    },
  },
};

export default module;
