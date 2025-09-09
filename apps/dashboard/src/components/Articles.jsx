import React, { useRef, useState } from 'react';
import SingleArticle from './common/SingleArticle';
import { Button, Box, Flex, List, ListItem } from '@chakra-ui/react';
import { LuFileText } from 'react-icons/lu';

function Articles() {
  const [articles, setArticles] = useState([]); // [{name, content}]
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);

  const handleUploadClick = () => {
    if (inputRef.current) inputRef.current.value = '';
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const mdFiles = files.filter((f) => f.name.endsWith('.md'));
    if (mdFiles.length !== files.length) {
      alert('只能上传md格式的文件');
      return;
    }
    // 读取所有md文件内容
    Promise.all(
      mdFiles.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve({ name: file.name, content: event.target.result });
          };
          reader.readAsText(file);
        });
      })
    ).then((results) => {
      setArticles(results);
      setSelectedIdx(0);
    });
  };

  return (
    <Flex h="650px" border="1px solid #eee" borderRadius="md" overflow="hidden">
      {/* 左侧：上传按钮+文章列表 */}
      <Box w="220px" bg="#fafbfc" borderRight="1px solid #eee" p={3}>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<LuFileText />}
          onClick={handleUploadClick}
          mb={4}
          w="full"
        >
          上传markdown文件
        </Button>
        <input
          type="file"
          accept=".md"
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          multiple
        />
        <List spacing={2}>
          {articles.length === 0 && (
            <ListItem color="gray.400" fontSize="md">
              暂无文章
            </ListItem>
          )}
          {articles.map((a, idx) => (
            <ListItem
              key={a.name}
              px={2}
              py={1}
              borderRadius="md"
              bg={selectedIdx === idx ? 'blue.50' : 'transparent'}
              fontWeight={selectedIdx === idx ? 'bold' : 'normal'}
              cursor="pointer"
              _hover={{ bg: 'blue.100' }}
              onClick={() => setSelectedIdx(idx)}
              title={a.name}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {a.name}
            </ListItem>
          ))}
        </List>
      </Box>
      {/* 右侧：文章内容 */}
      <Box flex={1} p={6} overflowY="auto">
        <SingleArticle content={articles[selectedIdx]?.content || ''} />
      </Box>
    </Flex>
  );
}

export default Articles;
