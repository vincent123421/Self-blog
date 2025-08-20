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
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { loadConfig, saveConfig } from '../core/config-manager';
import WelcomeConfigModal from './ModuleConfigPanels/WelcomeConfigModal';
import TextCardConfigDrawer from './ModuleConfigPanels/TextCardConfigDrawer';

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
              sx={{ '&:active': { transform: 'none' } }}
            />
          )}
        </HStack>
        
        <Box flex="1" overflow="hidden">
          <module.component config={config} />
        </Box>
      </Box>

      {/* WelcomeModule 使用模态框 */}
      {module.id === 'WelcomeModule' && (
        <WelcomeConfigModal
          isOpen={isOpen}
          onClose={handleCancelConfig}
          config={tempConfig}
          onChange={setTempConfig}
          onSave={handleSaveConfig}
        />
      )}
      
      {/* TextCardModule 使用抽屉 */}
      {module.id === 'TextCardModule' && (
        <TextCardConfigDrawer
          isOpen={isOpen}
          onClose={handleCancelConfig}
          config={tempConfig}
          onChange={setTempConfig}
          onSave={handleSaveConfig}
        />
      )}
      
      {/* 其他模块使用通用模态框 */}
      {!['WelcomeModule', 'TextCardModule'].includes(module.id) && (
        <Modal isOpen={isOpen} onClose={handleCancelConfig} size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>配置 {module.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={4}>
                {module.defaultConfig && typeof module.defaultConfig === 'object' && (
                  Object.entries(module.defaultConfig).map(([key, value]) => (
                    <Box key={key} w="full">
                      <Text mb={2} fontWeight="medium">{key}</Text>
                      {typeof value === 'boolean' ? (
                        <input
                          type="checkbox"
                          checked={tempConfig[key] || false}
                          onChange={(e) => setTempConfig(prev => ({
                            ...prev,
                            [key]: e.target.checked
                          }))}
                        />
                      ) : (
                        <input
                          type="text"
                          value={tempConfig[key] || ''}
                          onChange={(e) => setTempConfig(prev => ({
                            ...prev,
                            [key]: e.target.value
                          }))}
                          style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                        />
                      )}
                    </Box>
                  ))
                )}
                
                <HStack spacing={3} width="100%" justify="flex-end" pt={4}>
                  <Button onClick={handleCancelConfig}>取消</Button>
                  <Button colorScheme="blue" onClick={handleSaveConfig}>保存</Button>
                </HStack>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ModuleContainer;
