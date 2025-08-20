import React, { useState, useEffect } from 'react';
import { Box, Text, Button, HStack, Badge, Spinner } from '@chakra-ui/react';
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import './styles.css';

// 代码高亮组件
function CodeBlock({ code, language, showLineNumbers, theme }) {
  const lines = code.split('\n');
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Box className={`code-block ${theme}`} position="relative">
      <HStack justify="space-between" p={2} bg="gray.100" fontSize="sm">
        <Badge colorScheme="blue">{language}</Badge>
        <Button size="xs" leftIcon={<CopyIcon />} onClick={copyToClipboard}>
          复制
        </Button>
      </HStack>
      <Box className="code-content" p={3} overflowX="auto">
        {showLineNumbers ? (
          <table className="code-table">
            <tbody>
              {lines.map((line, index) => (
                <tr key={index}>
                  <td className="line-number">{index + 1}</td>
                  <td className="line-content">
                    <code>{line}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <pre><code>{code}</code></pre>
        )}
      </Box>
    </Box>
  );
}

// Markdown 渲染器
function MarkdownRenderer({ content }) {
  const renderMarkdown = (text) => {
    return text
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/`([^`]+)`/gim, '<code class="inline-code">$1</code>')
      .replace(/\n/gim, '<br>');
  };

  return (
    <div 
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
}

function TextCardModuleComponent({ config }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState(null);

  const contentType = config?.contentType || 'markdown';
  const shouldTruncate = config?.truncateContent && content.length > 300;
  const displayContent = shouldTruncate && !isExpanded ? content.slice(0, 300) + '...' : content;

  // 获取外部内容
  const fetchExternalContent = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch content');
      const text = await response.text();
      setContent(text);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
      setContent('Failed to load external content');
    } finally {
      setLoading(false);
    }
  };

  // 内容更新逻辑
  useEffect(() => {
    if (contentType === 'externalUrl' && config?.content) {
      fetchExternalContent(config.content);
      
      // 设置定时刷新
      const interval = config?.refreshInterval || 3600000; // 默认1小时
      const timer = setInterval(() => {
        fetchExternalContent(config.content);
      }, interval);
      
      return () => clearInterval(timer);
    } else {
      setContent(config?.content || '# Hello World');
    }
  }, [config?.content, contentType, config?.refreshInterval]);

  const cardStyle = {
    backgroundColor: config?.backgroundColor || 'white',
    color: config?.textColor || 'gray.800',
    border: config?.showBorder ? '1px solid #e2e8f0' : 'none'
  };

  return (
    <Box className="text-card-module" p={4} style={cardStyle}>
      {config?.cardTitle && (
        <HStack justify="space-between" mb={3}>
          <Text fontSize="lg" fontWeight="bold">
            {config.cardTitle}
          </Text>
          {contentType === 'externalUrl' && (
            <HStack spacing={2}>
              {lastUpdated && (
                <Text fontSize="xs" color="gray.500">
                  {lastUpdated.toLocaleTimeString()}
                </Text>
              )}
              <ExternalLinkIcon w={3} h={3} color="gray.400" />
            </HStack>
          )}
        </HStack>
      )}
      
      {loading && (
        <HStack justify="center" p={4}>
          <Spinner size="sm" />
          <Text fontSize="sm">Loading content...</Text>
        </HStack>
      )}
      
      {error && (
        <Text color="red.500" fontSize="sm" p={2} bg="red.50" borderRadius="md">
          Error: {error}
        </Text>
      )}
      
      {!loading && !error && (
        <>
          {contentType === 'code' ? (
            <CodeBlock 
              code={displayContent}
              language={config?.language || 'javascript'}
              showLineNumbers={config?.showLineNumbers}
              theme={config?.theme || 'light'}
            />
          ) : contentType === 'markdown' ? (
            <MarkdownRenderer content={displayContent} />
          ) : (
            <Text whiteSpace="pre-wrap" fontSize="sm">
              {displayContent}
            </Text>
          )}
          
          {shouldTruncate && (
            <Button 
              size="sm" 
              variant="link" 
              mt={2}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? '收起' : '查看更多'}
            </Button>
          )}
        </>
      )}
    </Box>
  );
}

export const module = {
  id: 'TextCardModule',
  name: '智能内容卡片',
  component: TextCardModuleComponent,
  defaultConfig: {
    cardTitle: 'Content Card',
    contentType: 'markdown',
    content: '# Hello World\n\nThis is a **smart content card** that supports:\n\n- Markdown rendering\n- Code highlighting\n- External content loading\n- And much more!',
    language: 'javascript',
    showLineNumbers: true,
    refreshInterval: 3600000,
    truncateContent: false,
    theme: 'light',
    showBorder: true,
    backgroundColor: 'white',
    textColor: 'gray.800'
  },
  configSchema: {
    type: 'object',
    properties: {
      cardTitle: { type: 'string' },
      contentType: { type: 'string' },
      content: { type: 'string' },
      language: { type: 'string' },
      showLineNumbers: { type: 'boolean' },
      refreshInterval: { type: 'number' },
      truncateContent: { type: 'boolean' },
      theme: { type: 'string' },
      showBorder: { type: 'boolean' },
      backgroundColor: { type: 'string' },
      textColor: { type: 'string' }
    }
  }
};

export default module;