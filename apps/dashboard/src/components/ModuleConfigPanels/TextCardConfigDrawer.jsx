import React, { useState } from 'react';
import {
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton,
  VStack, HStack, Text, Input, Textarea, Select, Switch, Button, Box,
  Tabs, TabList, TabPanels, Tab, TabPanel, Badge, Divider
} from '@chakra-ui/react';

const TextCardConfigDrawer = ({ isOpen, onClose, config, onChange, onSave }) => {
  const [tempConfig, setTempConfig] = useState(config);

  const updateConfig = (key, value) => {
    const newConfig = { ...tempConfig, [key]: value };
    setTempConfig(newConfig);
    onChange(newConfig);
  };

  const contentType = tempConfig.contentType || 'markdown';

  const renderPreview = () => {
    const content = tempConfig.content || '';
    if (contentType === 'markdown') {
      return (
        <div dangerouslySetInnerHTML={{
          __html: content
            .replace(/^# (.*$)/gim, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
            .replace(/\n/gim, '<br>')
        }} />
      );
    }
    if (contentType === 'code') {
      return (
        <Box bg="gray.100" p={3} borderRadius="md" fontSize="sm" fontFamily="monospace">
          <HStack justify="space-between" mb={2}>
            <Badge>{tempConfig.language || 'javascript'}</Badge>
          </HStack>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{content}</pre>
        </Box>
      );
    }
    return <Text fontSize="sm" whiteSpace="pre-wrap">{content}</Text>;
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="xl" placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>编辑内容卡片</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>
          <VStack spacing={6} align="stretch">
            {/* 基本设置 */}
            <VStack spacing={3} align="stretch">
              <Input
                placeholder="卡片标题"
                value={tempConfig.cardTitle || ''}
                onChange={(e) => updateConfig('cardTitle', e.target.value)}
                fontWeight="bold"
              />
              
              <Select
                value={contentType}
                onChange={(e) => updateConfig('contentType', e.target.value)}
              >
                <option value="manualText">纯文本</option>
                <option value="markdown">Markdown</option>
                <option value="code">代码</option>
                <option value="externalUrl">外部链接</option>
              </Select>
            </VStack>

            <Divider />

            {/* 内容设置 */}
            <VStack spacing={3} align="stretch">
              <Text fontWeight="bold">内容设置</Text>
              
              {contentType === 'externalUrl' ? (
                <VStack spacing={3} align="stretch">
                  <Input
                    placeholder="内容链接 URL"
                    value={tempConfig.content || ''}
                    onChange={(e) => updateConfig('content', e.target.value)}
                  />
                  <Select
                    value={tempConfig.refreshInterval || 3600000}
                    onChange={(e) => updateConfig('refreshInterval', parseInt(e.target.value))}
                  >
                    <option value={300000}>5分钟</option>
                    <option value={1800000}>30分钟</option>
                    <option value={3600000}>1小时</option>
                    <option value={86400000}>1天</option>
                  </Select>
                </VStack>
              ) : (
                <Textarea
                  value={tempConfig.content || ''}
                  onChange={(e) => updateConfig('content', e.target.value)}
                  placeholder={
                    contentType === 'markdown' 
                      ? '# 标题\n\n**粗体** *斜体*'
                      : contentType === 'code'
                      ? 'function hello() {\n  console.log("Hello!");\n}'
                      : '输入文本内容...'
                  }
                  rows={12}
                  fontFamily={contentType === 'code' ? 'monospace' : 'inherit'}
                />
              )}

              {/* 代码特殊设置 */}
              {contentType === 'code' && (
                <HStack spacing={4}>
                  <Select
                    value={tempConfig.language || 'javascript'}
                    onChange={(e) => updateConfig('language', e.target.value)}
                    flex={1}
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                  </Select>
                  <HStack>
                    <Text fontSize="sm">行号</Text>
                    <Switch
                      isChecked={tempConfig.showLineNumbers}
                      onChange={(e) => updateConfig('showLineNumbers', e.target.checked)}
                    />
                  </HStack>
                </HStack>
              )}
            </VStack>

            <Divider />

            {/* 显示设置 */}
            <VStack spacing={3} align="stretch">
              <Text fontWeight="bold">显示设置</Text>
              
              <HStack justify="space-between">
                <Text fontSize="sm">长内容折叠</Text>
                <Switch
                  isChecked={tempConfig.truncateContent}
                  onChange={(e) => updateConfig('truncateContent', e.target.checked)}
                />
              </HStack>
              
              <HStack justify="space-between">
                <Text fontSize="sm">显示边框</Text>
                <Switch
                  isChecked={tempConfig.showBorder}
                  onChange={(e) => updateConfig('showBorder', e.target.checked)}
                />
              </HStack>

              <HStack spacing={4}>
                <Box flex={1}>
                  <Text fontSize="sm" mb={1}>背景色</Text>
                  <Input
                    type="color"
                    value={tempConfig.backgroundColor || '#ffffff'}
                    onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                    h="40px"
                  />
                </Box>
                <Box flex={1}>
                  <Text fontSize="sm" mb={1}>文字色</Text>
                  <Input
                    type="color"
                    value={tempConfig.textColor || '#2d3748'}
                    onChange={(e) => updateConfig('textColor', e.target.value)}
                    h="40px"
                  />
                </Box>
              </HStack>
            </VStack>

            <Divider />

            {/* 预览区域 */}
            <Box>
              <Text fontWeight="bold" mb={3}>实时预览</Text>
              <Box
                p={4}
                borderRadius="md"
                border={tempConfig.showBorder ? '1px solid #e2e8f0' : 'none'}
                bg={tempConfig.backgroundColor || 'white'}
                color={tempConfig.textColor || 'gray.800'}
                minH="100px"
              >
                {tempConfig.cardTitle && (
                  <Text fontWeight="bold" mb={3}>{tempConfig.cardTitle}</Text>
                )}
                {renderPreview()}
              </Box>
            </Box>

            {/* 操作按钮 */}
            <HStack justify="flex-end" pt={4}>
              <Button onClick={onClose}>取消</Button>
              <Button colorScheme="blue" onClick={onSave}>保存</Button>
            </HStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default TextCardConfigDrawer;