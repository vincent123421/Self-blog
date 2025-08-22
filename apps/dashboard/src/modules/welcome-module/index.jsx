import React, { useState, useRef } from 'react';
import {
  Box,
  Text,
  VStack,
  Button,
  IconButton,
  Image,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { LuFileImage, LuX } from 'react-icons/lu';

const CustomFileUpload = ({ files, removeFile }) => {
  if (!files || files.length === 0) return null;

  return (
    <Flex wrap="wrap" gap={3} mt={3}>
      {files.map((file) => (
        <Box
          key={file.name}
          position="relative"
          w="80px"
          h="80px"
          borderRadius="md"
          overflow="hidden"
        >
          <Image
            src={URL.createObjectURL(file)}
            alt={file.name}
            objectFit="cover"
            borderRadius="full"
            w="full"
            h="full"
          />
          <IconButton
            aria-label="删除文件"
            icon={<LuX />}
            size="xs"
            position="absolute"
            top="1"
            right="1"
            colorScheme="red"
            onClick={() => removeFile(file.name)}
          />
        </Box>
      ))}
    </Flex>
  );
};

function WelcomeModuleComponent({ config }) {
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);
  const toast = useToast();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({
        title: '文件类型错误',
        description: '只能上传图片文件',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setFiles([file]); // 只保留1个文件
  };

  const removeFile = (fileName) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

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
        <Button
          variant="outline"
          size="sm"
          leftIcon={<LuFileImage />}
          onClick={() => inputRef.current.click()}
        >
          上传图片
        </Button>
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleUpload}
        />
        <CustomFileUpload files={files} removeFile={removeFile} />
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
