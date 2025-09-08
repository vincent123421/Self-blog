import React from 'react';
import Markdown from 'react-markdown';

function SingleArticle({ content }) {
  const md = content || `**No content available**`;
  return (
    <div>
      <Markdown>{md}</Markdown>
    </div>
  );
}

export default SingleArticle;
