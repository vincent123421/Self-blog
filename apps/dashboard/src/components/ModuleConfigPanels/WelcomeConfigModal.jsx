import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  VStack, HStack, Text, Input, Textarea, Select, Switch, Button, Box,
  Avatar, Tabs, TabList, TabPanels, Tab, TabPanel, Collapse, useDisclosure,
  SimpleGrid, IconButton, Badge
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const WelcomeConfigModal = ({ isOpen, onClose, config, onChange, onSave }) => {
  const { isOpen: showMore, onToggle } = useDisclosure();
  const [tempConfig, setTempConfig] = useState(config);

  const updateConfig = (key, value) => {
    const newConfig = { ...tempConfig, [key]: value };
    setTempConfig(newConfig);
    onChange(newConfig);
  };

  const addButton = () => {
    const buttons = JSON.parse(tempConfig.callToActionButtons || '[]');
    buttons.push({ label: '新按钮', url: 'https://example.com' });
    updateConfig('callToActionButtons', JSON.stringify(buttons));
  };

  const removeButton = (index) => {
    const buttons = JSON.parse(tempConfig.callToActionButtons || '[]');
    buttons.splice(index, 1);
    updateConfig('callToActionButtons', JSON.stringify(buttons));
  };

  const updateButton = (index, field, value) => {
    const buttons = JSON.parse(tempConfig.callToActionButtons || '[]');
    buttons[index][field] = value;
    updateConfig('callToActionButtons', JSON.stringify(buttons));
  };

  const buttons = JSON.parse(tempConfig.callToActionButtons || '[]');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent maxH="90vh">
        <ModalHeader>编辑数字名片</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <HStack spacing={8} align="start">
            {/* 左侧配置 */}
            <VStack spacing={6} flex={1} align="stretch">
              {/* 头像预览 */}
              <Box textAlign="center">
                <Avatar
                  size="xl"
                  src={tempConfig.avatarUrl}
                  name={tempConfig.name || 'User'}
                  mb={3}
                />
                <Input
                  placeholder="头像图片链接"
                  value={tempConfig.avatarUrl || ''}
                  onChange={(e) => updateConfig('avatarUrl', e.target.value)}
                />
              </Box>

              {/* 基本信息 */}
              <VStack spacing={3} align="stretch">
                <Input
                  placeholder="你的名字"
                  value={tempConfig.name || ''}
                  onChange={(e) => updateConfig('name', e.target.value)}
                  fontSize="lg"
                  fontWeight="bold"
                />
                <Textarea
                  placeholder="个人标语"
                  value={tempConfig.slogan || ''}
                  onChange={(e) => updateConfig('slogan', e.target.value)}
                  rows={2}
                />
                <HStack>
                  <Text fontSize="sm">打字机效果</Text>
                  <Switch
                    isChecked={tempConfig.enableTypewriter}
                    onChange={(e) => updateConfig('enableTypewriter', e.target.checked)}
                  />
                </HStack>
              </VStack>

              {/* 问候设置 */}
              <VStack spacing={3} align="stretch">
                <Select
                  value={tempConfig.greetingMode || 'timeBased'}
                  onChange={(e) => updateConfig('greetingMode', e.target.value)}
                >
                  <option value="static">固定问候</option>
                  <option value="timeBased">智能时间问候</option>
                  <option value="customList">自定义问候列表</option>
                </Select>

                {tempConfig.greetingMode === 'static' && (
                  <Input
                    placeholder="固定问候语"
                    value={tempConfig.staticGreeting || ''}
                    onChange={(e) => updateConfig('staticGreeting', e.target.value)}
                  />
                )}

                {tempConfig.greetingMode === 'customList' && (
                  <Textarea
                    placeholder="问候语列表，用逗号分隔"
                    value={tempConfig.customGreetings || ''}
                    onChange={(e) => updateConfig('customGreetings', e.target.value)}
                    rows={2}
                  />
                )}
              </VStack>

              {/* 更多设置 */}
              <Button
                leftIcon={showMore ? <ChevronUpIcon /> : <ChevronDownIcon />}
                onClick={onToggle}
                variant="ghost"
                size="sm"
              >
                更多设置
              </Button>

              <Collapse in={showMore}>
                <VStack spacing={4} align="stretch">
                  {/* 背景与主题 */}
                  <Box>
                    <Text fontWeight="bold" mb={3}>背景与主题</Text>
                    <Tabs size="sm">
                      <TabList>
                        <Tab>纯色</Tab>
                        <Tab>渐变</Tab>
                        <Tab>图案</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel p={3}>
                          <Input
                            type="color"
                            value={tempConfig.backgroundColor || '#f7fafc'}
                            onChange={(e) => {
                              updateConfig('backgroundOptions', 'color');
                              updateConfig('backgroundColor', e.target.value);
                            }}
                          />
                        </TabPanel>
                        <TabPanel p={3}>
                          <SimpleGrid columns={2} spacing={2}>
                            <Input
                              type="color"
                              value={tempConfig.gradientStart || '#667eea'}
                              onChange={(e) => {
                                updateConfig('backgroundOptions', 'gradient');
                                updateConfig('gradientStart', e.target.value);
                              }}
                            />
                            <Input
                              type="color"
                              value={tempConfig.gradientEnd || '#764ba2'}
                              onChange={(e) => updateConfig('gradientEnd', e.target.value)}
                            />
                          </SimpleGrid>
                        </TabPanel>
                        <TabPanel p={3}>
                          <Button
                            size="sm"
                            onClick={() => updateConfig('backgroundOptions', 'pattern')}
                          >
                            使用图案背景
                          </Button>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Box>

                  {/* 行动按钮 */}
                  <Box>
                    <HStack justify="space-between" mb={3}>
                      <Text fontWeight="bold">行动按钮</Text>
                      <Button size="sm" leftIcon={<AddIcon />} onClick={addButton}>
                        添加
                      </Button>
                    </HStack>
                    <VStack spacing={2}>
                      {buttons.map((button, index) => (
                        <HStack key={index} w="full" spacing={2}>
                          <Input
                            placeholder="按钮文字"
                            value={button.label || ''}
                            onChange={(e) => updateButton(index, 'label', e.target.value)}
                            size="sm"
                          />
                          <Input
                            placeholder="链接"
                            value={button.url || ''}
                            onChange={(e) => updateButton(index, 'url', e.target.value)}
                            size="sm"
                          />
                          <IconButton
                            size="sm"
                            icon={<DeleteIcon />}
                            onClick={() => removeButton(index)}
                            colorScheme="red"
                            variant="ghost"
                          />
                        </HStack>
                      ))}
                    </VStack>
                  </Box>
                </VStack>
              </Collapse>

              <HStack justify="flex-end" pt={4}>
                <Button onClick={onClose}>取消</Button>
                <Button colorScheme="blue" onClick={onSave}>保存</Button>
              </HStack>
            </VStack>

            {/* 右侧预览 */}
            <Box flex={1} p={4} border="1px" borderColor="gray.200" borderRadius="md">
              <Text fontSize="sm" color="gray.500" mb={3}>实时预览</Text>
              <Box
                p={4}
                borderRadius="md"
                textAlign="center"
                style={{
                  background: tempConfig.backgroundOptions === 'gradient' 
                    ? `linear-gradient(45deg, ${tempConfig.gradientStart}, ${tempConfig.gradientEnd})`
                    : tempConfig.backgroundColor || '#f7fafc'
                }}
              >
                <Avatar
                  size="lg"
                  src={tempConfig.avatarUrl}
                  name={tempConfig.name || 'User'}
                  mb={3}
                />
                <Text fontWeight="bold" fontSize="lg">
                  {tempConfig.name || '你的名字'}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {tempConfig.slogan || '个人标语'}
                </Text>
                {buttons.length > 0 && (
                  <HStack justify="center" mt={3} spacing={2}>
                    {buttons.slice(0, 2).map((button, index) => (
                      <Badge key={index} colorScheme="blue" fontSize="xs">
                        {button.label}
                      </Badge>
                    ))}
                  </HStack>
                )}
              </Box>
            </Box>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WelcomeConfigModal;