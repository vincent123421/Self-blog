import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  Divider,
  Input,
} from '@chakra-ui/react';

export default function WelcomeModuleComponent({ config, onConfigChange }) {
  const [editing, setEditing] = useState(null);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const startEdit = (field) => {
    setEditing(field);
    setValue(config[field] || '');
  };

  const saveEdit = () => {
    if (!editing || !onConfigChange) return;
    if (value !== config[editing]) {
      onConfigChange({ ...config, [editing]: value });
    }
    setEditing(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit();
    else if (e.key === 'Escape') setEditing(null);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  return (
    <VStack
      spacing={4}
      align="stretch"
      height="100%"
      p={4}
      bg="gray.50"
      borderRadius="lg"
    >
      <HStack spacing={4} justify="center">
        <Avatar
          src={config.avatarUrl || 'https://via.placeholder.com/80'}
          name={config.name || 'User'}
          size="lg"
        />
      </HStack>

      <VStack spacing={1} textAlign="center">
        {/* 姓名 */}
        {editing === 'name' ? (
          <Input
            ref={inputRef}
            size="sm"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleKeyDown}
            // 🔧 关键：强制和 Text 一致
            h="auto"
            minH="auto"
            px="2"
            py="1"
            fontSize="xl"
            fontWeight="bold"
            lineHeight="1"
            textAlign="center"
            maxW="200px"
            mx="auto"
            // 🧼 去掉默认的 padding 和 border 影响
            sx={{
              '& input': {
                textAlign: 'center',
                py: '2px', // 微调垂直居中
                px: '4px',
              },
            }}
          />
        ) : (
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="gray.800"
            onClick={() => startEdit('name')}
            cursor="text"
            _hover={{ bg: 'blue.50', borderRadius: 'md', px: 2 }}
            transition="all 0.2s"
            px={2}
            py={1}
            // 📏 固定高度，防止跳动
            lineHeight="1.2"
            display="inline-block"
          >
            {config.name || '张三'}
          </Text>
        )}

        {/* 职位 */}
        {editing === 'title' ? (
          <Input
            ref={inputRef}
            className="no-drag"
            size="sm"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleKeyDown}
            h="auto"
            minH="auto"
            px="2"
            py="1"
            fontSize="md"
            fontWeight="medium"
            lineHeight="1"
            textAlign="center"
            maxW="240px"
            mx="auto"
            sx={{
              '& input': {
                py: '2px',
                px: '4px',
              },
            }}
          />
        ) : (
          <Text
            fontSize="md"
            color="blue.600"
            fontWeight="medium"
            onClick={() => startEdit('title')}
            cursor="text"
            _hover={{ bg: 'blue.50', borderRadius: 'md', px: 2 }}
            transition="all 0.2s"
            px={2}
            py={1}
            lineHeight="1.2"
            display="inline-block"
          >
            {config.title || '前端工程师 | 技术博主'}
          </Text>
        )}
      </VStack>

      <Divider borderColor="gray.300" />

      <Box>
        {editing === 'bio' ? (
          <Input
            ref={inputRef}
            size="sm"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleKeyDown}
            h="auto"
            minH="auto"
            px="2"
            py="1"
            fontSize="sm"
            lineHeight="1"
            sx={{
              '& input': {
                py: '2px',
                px: '4px',
              },
            }}
          />
        ) : (
          <Text
            fontSize="sm"
            color="gray.600"
            lineHeight="1.6"
            onClick={() => startEdit('bio')}
            cursor="text"
            _hover={{ bg: 'gray.100', borderRadius: 'md', p: 1 }}
            transition="all 0.2s"
            px={2}
            py={1}
            display="inline-block"
          >
            {config.bio || '暂无简介'}
          </Text>
        )}
      </Box>
    </VStack>
  );
}
