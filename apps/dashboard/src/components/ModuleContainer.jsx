import React, { useState } from 'react';
import {
  Box,
  Text as ChakraText,
  IconButton,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { loadConfig, saveConfig } from '../core/config-manager';
import { DynamicForm } from './common';

const ModuleContainer = ({ module, showSettings = true }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [config, setConfig] = useState(() => loadConfig(module.id, module.defaultConfig || {}));
  const [tempConfig, setTempConfig] = useState(config);

  // 处理内联编辑配置变更
  const handleConfigChange = (newConfig) => {
    setConfig(newConfig);
    saveConfig(module.id, newConfig);
  };

  // 处理配置保存
  const handleSaveConfig = () => {
    setConfig(tempConfig);
    saveConfig(module.id, tempConfig);
    onClose();
  };

  // 处理配置取消
  const handleCancelConfig = () => {
    setTempConfig(config);
    onClose();
  };

  // 打开设置时，将当前配置复制到临时配置
  const handleOpenSettings = () => {
    setTempConfig(config);
    onOpen();
  };

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        bg="white"
        boxShadow="sm"
        height="100%"
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        <HStack justify="space-between" mb={3} className="drag-handle" cursor={showSettings ? "move" : "default"}>
          <ChakraText fontWeight="bold" fontSize="md" color="gray.700">
            {module.name}
          </ChakraText>
          {showSettings && (
            <IconButton
              size="sm"
              icon={<SettingsIcon />}
              onClick={handleOpenSettings}
              variant="ghost"
              colorScheme="gray"
              aria-label="模块设置"
              className="no-drag"
            />
          )}
        </HStack>
        
        <Box flex="1" overflow="hidden" minH="0">
          <module.component 
            config={config} 
            onConfigChange={handleConfigChange}
            showSettings={showSettings} 
          />
        </Box>
      </Box>

      {/* 设置模态框 */}
      <Modal isOpen={isOpen} onClose={handleCancelConfig} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>配置 {module.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <DynamicForm
              config={module.defaultConfig || {}}
              values={tempConfig}
              onChange={setTempConfig}
              onSave={handleSaveConfig}
              onCancel={handleCancelConfig}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModuleContainer;
