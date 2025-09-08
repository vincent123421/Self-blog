import React, { useRef, useState } from 'react';
import SingleArticle from './common/SingleArticle';
import { Button } from '@chakra-ui/react';
import { LuFileText } from 'react-icons/lu';

function Articles() {
  const [articles, setArticles] = useState([]);
  const inputRef = useRef(null);

  const handleUploadClick = () => {
    if (inputRef.current) inputRef.current.value = '';
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.endsWith('.md')) {
      alert('只能上传md格式的文件');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setArticles([content]); // 只保留一篇，便于扩展
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <SingleArticle content={articles[0] || ''} />
      <Button
        variant="outline"
        size="sm"
        leftIcon={<LuFileText />}
        onClick={handleUploadClick}
        mb={4}
      >
        上传markdown文件
      </Button>
      <input
        type="file"
        accept=".md"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default Articles;
