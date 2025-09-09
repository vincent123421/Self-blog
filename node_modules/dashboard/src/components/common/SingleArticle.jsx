import React from 'react';
import Markdown from 'react-markdown';
import './vscode-markdown.css';

function SingleArticle({ content }) {
  const md = content || `**No content available**`;
  return (
    <div className="vscode-markdown-body">
      <Markdown>{md}</Markdown>
    </div>
  );
}

export default SingleArticle;
