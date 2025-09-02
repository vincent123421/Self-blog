import React, { useRef } from 'react';
import {
  Box,
  Button,
  IconButton,
  Image,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { LuFileImage, LuX } from 'react-icons/lu';

const ImageUpload = ({
  files = [],
  onFilesChange,
  accept = 'image/*',
  multiple = false,
  maxFiles = 1,
  buttonText = '上传文件',
  buttonProps = {},
  previewSize = '80px',
}) => {
  const inputRef = useRef(null);
  const toast = useToast();

  const handleUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) {
      e.target.value = '';
      return;
    }

    // 验证文件类型
    const invalidFiles = selectedFiles.filter(
      (file) => accept === 'image/*' && !file.type.startsWith('image/')
    );

    if (invalidFiles.length > 0) {
      toast({
        title: '文件类型错误',
        description: '只能上传图片文件',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      e.target.value = '';
      return;
    }

    // 限制文件数量
    const newFiles = multiple
      ? [...files, ...selectedFiles].slice(0, maxFiles)
      : selectedFiles.slice(0, 1);

    onFilesChange?.(newFiles);
    e.target.value = '';
  };

  const removeFile = (fileName) => {
    const updatedFiles = files.filter((file) => file.name !== fileName);
    onFilesChange?.(updatedFiles);
  };

  return (
    <Box>
      <Button
        variant="outline"
        size="sm"
        leftIcon={<LuFileImage />}
        onClick={() => inputRef.current?.click()}
        {...buttonProps}
      >
        {buttonText}
      </Button>

      <input
        type="file"
        ref={inputRef}
        accept={accept}
        multiple={multiple}
        style={{ display: 'none' }}
        onChange={handleUpload}
      />

      {files.length > 0 && (
        <Flex wrap="wrap" gap={3} mt={3}>
          {files.map((file) => (
            <Box
              key={file.name}
              position="relative"
              margin="auto" //居中
              w={previewSize}
              h={previewSize}
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
      )}
    </Box>
  );
};

export default ImageUpload;
