import React from 'react';
import { Box, Text, VStack, Badge } from '@chakra-ui/react';

function WelcomeModuleComponent({ config }) {
  return (
    <VStack spacing={3} align="stretch" height="100%">
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="blue.600">
          {config?.title || '欢迎模块'}
        </Text>
        <Text fontSize="sm" color="gray.600" mt={1}>
          {config?.description || '这是一个可拖拽和缩放的欢迎模块'}
        </Text>
      </Box>

      <Box>
        <Text fontSize="sm" fontWeight="medium" mb={2}>
          姓名:
        </Text>
        <Text fontSize="md" p={2} bg="gray.50" borderRadius="md">
          {config?.user_name || '无'}
        </Text>
      </Box>

      <Box>
        <Text fontSize="sm" fontWeight="medium" mb={2}>
          职位:
        </Text>
        <Text fontSize="md" p={2} bg="gray.50" borderRadius="md">
          {config?.user_position || '无'}
        </Text>
      </Box>

      <Box>
        <Text fontSize="sm" fontWeight="medium" mb={2}>
          简介:
        </Text>
        <Text fontSize="md" p={2} bg="gray.50" borderRadius="md">
          {config?.user_introduction || '无'}
        </Text>
      </Box>
    </VStack>
  );
}

export const module = {
  id: 'WelcomeModule',
  name: '欢迎模块',
  component: WelcomeModuleComponent,
  defaultConfig: {
    title: '欢迎模块',
    description: '这是一个可拖拽和缩放的欢迎模块',
    message: 'Hello from Welcome Module!',
    user_name: '无',
    user_position: '无',
    user_introduction: '无',
  },
  configSchema: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      message: { type: 'string' },
      user_name: { type: 'string' },
      user_position: { type: 'string' },
      user_introduction: { type: 'string' },
    },
  },
};

export default module;
