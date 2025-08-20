import React from 'react';
import {
  VStack, HStack, Text, Input, Textarea, Select, Switch,
  FormControl, FormLabel, Box, Button, Divider, Badge,
  SimpleGrid, IconButton
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

const WelcomeConfigPanel = ({ config, onChange }) => {
  const updateConfig = (key, value) => {
    onChange({ ...config, [key]: value });
  };

  const addButton = () => {
    const buttons = JSON.parse(config.callToActionButtons || '[]');
    buttons.push({ label: '新按钮', url: 'https://example.com' });
    updateConfig('callToActionButtons', JSON.stringify(buttons));
  };

  const removeButton = (index) => {
    const buttons = JSON.parse(config.callToActionButtons || '[]');
    buttons.splice(index, 1);
    updateConfig('callToActionButtons', JSON.stringify(buttons));
  };

  const updateButton = (index, field, value) => {
    const buttons = JSON.parse(config.callToActionButtons || '[]');
    buttons[index][field] = value;
    updateConfig('callToActionButtons', JSON.stringify(buttons));
  };

  const buttons = JSON.parse(config.callToActionButtons || '[]');

  return (
    <VStack spacing={6} align="stretch">
      {/* 基本信息 */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={3} color="blue.600">
          👋 基本信息
        </Text>
        <VStack spacing={3}>
          <FormControl>
            <FormLabel>🎭 你的名字</FormLabel>
            <Input
              value={config.name || ''}
              onChange={(e) => updateConfig('name', e.target.value)}
              placeholder="输入你的大名"
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>✨ 个人标语</FormLabel>
            <Textarea
              value={config.slogan || ''}
              onChange={(e) => updateConfig('slogan', e.target.value)}
              placeholder="写点酷的话吧！比如：代码改变世界 🌍"
              rows={2}
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>📸 头像链接</FormLabel>
            <Input
              value={config.avatarUrl || ''}
              onChange={(e) => updateConfig('avatarUrl', e.target.value)}
              placeholder="粘贴头像图片链接"
            />
          </FormControl>
        </VStack>
      </Box>

      <Divider />

      {/* 问候设置 */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={3} color="green.600">
          🌟 问候方式
        </Text>
        <VStack spacing={3}>
          <FormControl>
            <FormLabel>问候模式</FormLabel>
            <Select
              value={config.greetingMode || 'timeBased'}
              onChange={(e) => updateConfig('greetingMode', e.target.value)}
            >
              <option value="timeBased">⏰ 智能时间问候</option>
              <option value="static">💬 固定问候语</option>
              <option value="customList">🎲 随机问候语</option>
            </Select>
          </FormControl>

          {config.greetingMode === 'static' && (
            <FormControl>
              <FormLabel>固定问候语</FormLabel>
              <Input
                value={config.staticGreeting || ''}
                onChange={(e) => updateConfig('staticGreeting', e.target.value)}
                placeholder="比如：欢迎来到我的世界！"
              />
            </FormControl>
          )}

          {config.greetingMode === 'customList' && (
            <FormControl>
              <FormLabel>问候语列表 (用逗号分隔)</FormLabel>
              <Textarea
                value={config.customGreetings || ''}
                onChange={(e) => updateConfig('customGreetings', e.target.value)}
                placeholder="Hello!, 你好!, Bonjour!, ¡Hola!"
                rows={2}
              />
            </FormControl>
          )}
        </VStack>
      </Box>

      <Divider />

      {/* 视觉效果 */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={3} color="purple.600">
          🎨 视觉效果
        </Text>
        <VStack spacing={4}>
          <SimpleGrid columns={2} spacing={4} w="full">
            <FormControl>
              <FormLabel>显示模式</FormLabel>
              <Select
                value={config.displayMode || 'card'}
                onChange={(e) => updateConfig('displayMode', e.target.value)}
              >
                <option value="card">🃏 卡片模式</option>
                <option value="hero">🦸 英雄模式</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>文字对齐</FormLabel>
              <Select
                value={config.alignment || 'center'}
                onChange={(e) => updateConfig('alignment', e.target.value)}
              >
                <option value="left">⬅️ 左对齐</option>
                <option value="center">⬆️ 居中</option>
                <option value="right">➡️ 右对齐</option>
              </Select>
            </FormControl>
          </SimpleGrid>

          <FormControl>
            <FormLabel>背景样式</FormLabel>
            <Select
              value={config.backgroundOptions || 'color'}
              onChange={(e) => updateConfig('backgroundOptions', e.target.value)}
            >
              <option value="color">🎨 纯色背景</option>
              <option value="gradient">🌈 渐变背景</option>
              <option value="pattern">📐 图案背景</option>
            </Select>
          </FormControl>

          {config.backgroundOptions === 'gradient' && (
            <SimpleGrid columns={3} spacing={3} w="full">
              <FormControl>
                <FormLabel fontSize="sm">起始颜色</FormLabel>
                <Input
                  type="color"
                  value={config.gradientStart || '#667eea'}
                  onChange={(e) => updateConfig('gradientStart', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">结束颜色</FormLabel>
                <Input
                  type="color"
                  value={config.gradientEnd || '#764ba2'}
                  onChange={(e) => updateConfig('gradientEnd', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">方向</FormLabel>
                <Select
                  value={config.gradientDirection || '45deg'}
                  onChange={(e) => updateConfig('gradientDirection', e.target.value)}
                >
                  <option value="45deg">↗️ 右上</option>
                  <option value="90deg">⬆️ 向上</option>
                  <option value="135deg">↖️ 左上</option>
                  <option value="180deg">⬅️ 向左</option>
                </Select>
              </FormControl>
            </SimpleGrid>
          )}

          <HStack justify="space-between" w="full">
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">✨ 打字机效果</FormLabel>
              <Switch
                isChecked={config.enableTypewriter}
                onChange={(e) => updateConfig('enableTypewriter', e.target.checked)}
              />
            </FormControl>
            
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">🌟 粒子动画</FormLabel>
              <Switch
                isChecked={config.enableParticles}
                onChange={(e) => updateConfig('enableParticles', e.target.checked)}
              />
            </FormControl>
          </HStack>
        </VStack>
      </Box>

      <Divider />

      {/* 行动按钮 */}
      <Box>
        <HStack justify="space-between" mb={3}>
          <Text fontSize="lg" fontWeight="bold" color="orange.600">
            🚀 行动按钮
          </Text>
          <Button size="sm" leftIcon={<AddIcon />} onClick={addButton}>
            添加按钮
          </Button>
        </HStack>
        
        <VStack spacing={3}>
          {buttons.map((button, index) => (
            <Box key={index} p={3} border="1px" borderColor="gray.200" borderRadius="md" w="full">
              <HStack justify="space-between" mb={2}>
                <Badge colorScheme="blue">按钮 {index + 1}</Badge>
                <IconButton
                  size="xs"
                  icon={<DeleteIcon />}
                  onClick={() => removeButton(index)}
                  colorScheme="red"
                  variant="ghost"
                />
              </HStack>
              <SimpleGrid columns={2} spacing={2}>
                <Input
                  placeholder="按钮文字"
                  value={button.label || ''}
                  onChange={(e) => updateButton(index, 'label', e.target.value)}
                />
                <Input
                  placeholder="链接地址"
                  value={button.url || ''}
                  onChange={(e) => updateButton(index, 'url', e.target.value)}
                />
              </SimpleGrid>
            </Box>
          ))}
          
          {buttons.length === 0 && (
            <Text color="gray.500" textAlign="center" py={4}>
              还没有按钮，点击"添加按钮"来创建第一个吧！
            </Text>
          )}
        </VStack>
      </Box>
    </VStack>
  );
};

export default WelcomeConfigPanel;