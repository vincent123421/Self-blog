import React from 'react';
import {
  VStack, HStack, Text, Input, Textarea, Select, Switch,
  FormControl, FormLabel, Box, Divider, Badge, Alert, AlertIcon
} from '@chakra-ui/react';

const TextCardConfigPanel = ({ config, onChange }) => {
  const updateConfig = (key, value) => {
    onChange({ ...config, [key]: value });
  };

  const contentType = config.contentType || 'markdown';

  return (
    <VStack spacing={6} align="stretch">
      {/* 基本设置 */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={3} color="blue.600">
          📝 基本设置
        </Text>
        <VStack spacing={3}>
          <FormControl>
            <FormLabel>🏷️ 卡片标题</FormLabel>
            <Input
              value={config.cardTitle || ''}
              onChange={(e) => updateConfig('cardTitle', e.target.value)}
              placeholder="给你的内容起个标题吧"
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>📋 内容类型</FormLabel>
            <Select
              value={contentType}
              onChange={(e) => updateConfig('contentType', e.target.value)}
            >
              <option value="markdown">📖 Markdown 文档</option>
              <option value="code">💻 代码片段</option>
              <option value="manualText">📄 纯文本</option>
              <option value="externalUrl">🌐 外部链接内容</option>
            </Select>
          </FormControl>
        </VStack>
      </Box>

      <Divider />

      {/* 内容设置 */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={3} color="green.600">
          ✍️ 内容设置
        </Text>
        
        {contentType === 'externalUrl' ? (
          <VStack spacing={3}>
            <Alert status="info" borderRadius="md">
              <AlertIcon />
              <Text fontSize="sm">
                输入一个URL，系统会自动获取内容并定期更新
              </Text>
            </Alert>
            
            <FormControl>
              <FormLabel>🔗 内容链接</FormLabel>
              <Input
                value={config.content || ''}
                onChange={(e) => updateConfig('content', e.target.value)}
                placeholder="https://example.com/content.txt"
              />
            </FormControl>
            
            <FormControl>
              <FormLabel>⏱️ 刷新频率</FormLabel>
              <Select
                value={config.refreshInterval || 3600000}
                onChange={(e) => updateConfig('refreshInterval', parseInt(e.target.value))}
              >
                <option value={300000}>🚀 5分钟</option>
                <option value={1800000}>⚡ 30分钟</option>
                <option value={3600000}>⏰ 1小时</option>
                <option value={21600000}>🌅 6小时</option>
                <option value={86400000}>📅 1天</option>
              </Select>
            </FormControl>
          </VStack>
        ) : (
          <FormControl>
            <FormLabel>
              {contentType === 'markdown' && '📖 Markdown 内容'}
              {contentType === 'code' && '💻 代码内容'}
              {contentType === 'manualText' && '📄 文本内容'}
            </FormLabel>
            <Textarea
              value={config.content || ''}
              onChange={(e) => updateConfig('content', e.target.value)}
              placeholder={
                contentType === 'markdown' 
                  ? '# 标题\n\n这里写你的 **Markdown** 内容...'
                  : contentType === 'code'
                  ? 'function hello() {\n  console.log("Hello World!");\n}'
                  : '在这里写你的文本内容...'
              }
              rows={8}
              fontFamily={contentType === 'code' ? 'monospace' : 'inherit'}
            />
          </FormControl>
        )}
      </Box>

      {/* 代码特殊设置 */}
      {contentType === 'code' && (
        <>
          <Divider />
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={3} color="purple.600">
              💻 代码设置
            </Text>
            <VStack spacing={3}>
              <FormControl>
                <FormLabel>🔤 编程语言</FormLabel>
                <Select
                  value={config.language || 'javascript'}
                  onChange={(e) => updateConfig('language', e.target.value)}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="json">JSON</option>
                  <option value="bash">Bash</option>
                </Select>
              </FormControl>
              
              <HStack justify="space-between" w="full">
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">🔢 显示行号</FormLabel>
                  <Switch
                    isChecked={config.showLineNumbers}
                    onChange={(e) => updateConfig('showLineNumbers', e.target.checked)}
                  />
                </FormControl>
                
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">🌙 暗色主题</FormLabel>
                  <Switch
                    isChecked={config.theme === 'dark'}
                    onChange={(e) => updateConfig('theme', e.target.checked ? 'dark' : 'light')}
                  />
                </FormControl>
              </HStack>
            </VStack>
          </Box>
        </>
      )}

      <Divider />

      {/* 显示设置 */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={3} color="orange.600">
          🎨 显示设置
        </Text>
        <VStack spacing={4}>
          <HStack justify="space-between" w="full">
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">📏 长内容折叠</FormLabel>
              <Switch
                isChecked={config.truncateContent}
                onChange={(e) => updateConfig('truncateContent', e.target.checked)}
              />
            </FormControl>
            
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">🖼️ 显示边框</FormLabel>
              <Switch
                isChecked={config.showBorder}
                onChange={(e) => updateConfig('showBorder', e.target.checked)}
              />
            </FormControl>
          </HStack>
          
          <HStack spacing={4} w="full">
            <FormControl>
              <FormLabel fontSize="sm">🎨 背景颜色</FormLabel>
              <Input
                type="color"
                value={config.backgroundColor || '#ffffff'}
                onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                h="40px"
              />
            </FormControl>
            
            <FormControl>
              <FormLabel fontSize="sm">✏️ 文字颜色</FormLabel>
              <Input
                type="color"
                value={config.textColor || '#2d3748'}
                onChange={(e) => updateConfig('textColor', e.target.value)}
                h="40px"
              />
            </FormControl>
          </HStack>
        </VStack>
      </Box>

      {/* 使用提示 */}
      <Alert status="success" borderRadius="md">
        <AlertIcon />
        <Box fontSize="sm">
          <Text fontWeight="bold">💡 小贴士：</Text>
          <Text>
            {contentType === 'markdown' && 'Markdown支持 **粗体**、*斜体*、`代码` 等格式'}
            {contentType === 'code' && '代码会自动高亮显示，支持复制功能'}
            {contentType === 'manualText' && '纯文本模式，保持原始格式显示'}
            {contentType === 'externalUrl' && '外部内容会根据设置的频率自动更新'}
          </Text>
        </Box>
      </Alert>
    </VStack>
  );
};

export default TextCardConfigPanel;