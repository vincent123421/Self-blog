import React, { useState } from 'react';
import {
  Box,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { InlineTextEditor, FileUpload } from '../../components/common';

export default function WelcomeModuleComponent({
  config,
  onConfigChange,
  showSettings = true,
}) {
  const isEditable = showSettings;
  const [files, setFiles] = useState([]);

  const handleConfigChange = (field, value) => {
    onConfigChange?.({ ...config, [field]: value });
  };

  return (
    <VStack
      spacing={4}
      align="stretch"
      height="100%"
      p={4}
      bg="gray.50"
      borderRadius="lg"
    >
      {showSettings && (
        <VStack spacing={4} justify="center">
          <FileUpload
            files={files}
            onFilesChange={setFiles}
            buttonText="上传头像"
            maxFiles={1}
          />
        </VStack>
      )}

      <VStack spacing={1} textAlign="center">
        <InlineTextEditor
          value={config.name}
          onChange={(value) => handleConfigChange('name', value)}
          placeholder="张三"
          disabled={!isEditable}
          textProps={{
            fontSize: 'xl',
            fontWeight: 'bold',
            color: 'gray.800',
            lineHeight: '1.2',
          }}
          inputProps={{
            size: 'sm',
            textAlign: 'center',
            maxW: '200px',
            mx: 'auto',
          }}
        />

        <InlineTextEditor
          value={config.title}
          onChange={(value) => handleConfigChange('title', value)}
          placeholder="前端工程师 | 技术博主"
          disabled={!isEditable}
          textProps={{
            fontSize: 'md',
            color: 'blue.600',
            fontWeight: 'medium',
            lineHeight: '1.2',
          }}
          inputProps={{
            size: 'sm',
            textAlign: 'center',
            maxW: '240px',
            mx: 'auto',
          }}
        />
      </VStack>

      <Divider borderColor="gray.300" />

      <Box>
        <InlineTextEditor
          value={config.bio}
          onChange={(value) => handleConfigChange('bio', value)}
          placeholder="暂无简介"
          disabled={!isEditable}
          multiline
          textProps={{
            fontSize: 'sm',
            color: 'gray.600',
            lineHeight: '1.6',
          }}
          inputProps={{
            size: 'sm',
            rows: 3,
          }}
        />
      </Box>
    </VStack>
  );
}
