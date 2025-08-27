import React from 'react';
import { Box, Text, VStack, Badge, Progress } from '@chakra-ui/react';

function TestModuleComponent({ config }) {
  return (
    <VStack spacing={3} align="stretch" height="100%">
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="blue.600">
          {config?.title || '测试模块'}
        </Text>
        <Text fontSize="sm" color="gray.600" mt={1}>
          {config?.description || '这是一个可拖拽和缩放的测试模块'}
        </Text>
      </Box>
      
      <Box>
        <Text fontSize="sm" fontWeight="medium" mb={2}>
          自定义消息:
        </Text>
        <Text fontSize="md" p={2} bg="gray.50" borderRadius="md">
          {config?.message || 'Hello from Test Module!'}
        </Text>
      </Box>
      
      <Box>
        <Text fontSize="sm" fontWeight="medium" mb={2}>
          进度示例:
        </Text>
        <Progress value={config?.progress || 65} colorScheme="blue" size="sm" />
        <Text fontSize="xs" color="gray.500" mt={1}>
          {config?.progress || 65}% 完成
        </Text>
      </Box>
      
      <Box>
        <Text fontSize="sm" fontWeight="medium" mb={2}>
          标签示例:
        </Text>
        <Box>
          <Badge colorScheme="green" mr={2} mb={1}>React</Badge>
          <Badge colorScheme="blue" mr={2} mb={1}>Grid</Badge>
          <Badge colorScheme="purple" mb={1}>Layout</Badge>
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
    progress: 65
  },
  configSchema: { 
    type: 'object', 
    properties: { 
      title: { type: 'string' },
      description: { type: 'string' },
      message: { type: 'string' },
      progress: { type: 'number' }
    } 
  },
};

export default module;