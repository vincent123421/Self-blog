import React, { useState } from 'react';
import {
  Box,
  Text,
  IconButton,
  HStack,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { loadConfig, saveConfig } from '../core/config-manager';

const ModuleContainer = ({ module, showSettings = true }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [config, setConfig] = useState(() => loadConfig(module.id, module.defaultConfig || {}));
  const [tempConfig, setTempConfig] = useState(config);

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
        <HStack justify="space-between" mb={3}>
          <Text fontWeight="bold" fontSize="md" color="gray.700">
            {module.name}
          </Text>
          {showSettings && (
            <IconButton
              size="sm"
              icon={<SettingsIcon />}
              onClick={handleOpenSettings}
              variant="ghost"
              colorScheme="gray"
              aria-label="模块设置"
            />
          )}
        </HStack>
        
        <Box flex="1" overflow="hidden" minH="0">
          <module.component config={config} showSettings={showSettings} />
        </Box>
      </Box>

      {/* 设置模态框 */}
      <Modal isOpen={isOpen} onClose={handleCancelConfig} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>配置 {module.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              {/* 动态生成配置表单 */}
              {module.defaultConfig && typeof module.defaultConfig === 'object' && (
                Object.entries(module.defaultConfig).map(([key, value]) => (
                  <FormControl key={key}>
                    <FormLabel>{key}</FormLabel>
                    {typeof value === 'boolean' ? (
                      <input
                        type="checkbox"
                        checked={tempConfig[key] || false}
                        onChange={(e) => setTempConfig(prev => ({
                          ...prev,
                          [key]: e.target.checked
                        }))}
                      />
                    ) : typeof value === 'number' ? (
                      <Input
                        type="number"
                        value={tempConfig[key] || ''}
                        onChange={(e) => setTempConfig(prev => ({
                          ...prev,
                          [key]: Number(e.target.value)
                        }))}
                        placeholder={`输入 ${key}`}
                      />
                    ) : typeof value === 'string' && value.length > 100 ? (
                      <Textarea
                        value={tempConfig[key] || ''}
                        onChange={(e) => setTempConfig(prev => ({
                          ...prev,
                          [key]: e.target.value
                        }))}
                        placeholder={`输入 ${key}`}
                      />
                    ) : (
                      <Input
                        value={tempConfig[key] || ''}
                        onChange={(e) => setTempConfig(prev => ({
                          ...prev,
                          [key]: e.target.value
                        }))}
                        placeholder={`输入 ${key}`}
                      />
                    )}
                  </FormControl>
                ))
              )}
              
              <HStack spacing={3} width="100%" justify="flex-end">
                <Button onClick={handleCancelConfig}>取消</Button>
                <Button colorScheme="blue" onClick={handleSaveConfig}>
                  保存
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModuleContainer;
