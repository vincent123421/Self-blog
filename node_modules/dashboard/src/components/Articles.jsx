import React from 'react';
import Markdown from 'react-markdown';

function Articles() {
  const md = `## Hello, world!
  
  This is a simple paragraph with some **bold** text.`;

  return (
    <div>
      <Markdown>{md}</Markdown>
    </div>
  );
}

export default Articles;
