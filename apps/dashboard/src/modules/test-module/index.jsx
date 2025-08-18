import React from 'react';
import './styles.css';

function TestModuleComponent({ config }) {
  const progress = config?.progress || 65;
  
  return (
    <div className="test-module">
      <div className="test-module-header">
        <div className="test-module-title">
          {config?.title || '测试模块'}
        </div>
        <div className="test-module-description">
          {config?.description || '这是一个可拖拽和缩放的测试模块'}
        </div>
      </div>
      
      <div className="test-module-section">
        <div className="test-module-section-title">
          自定义消息:
        </div>
        <div className="test-module-message">
          {config?.message || 'Hello from Test Module!'}
        </div>
      </div>
      
      <div className="test-module-section">
        <div className="test-module-section-title">
          进度示例:
        </div>
        <div className="test-module-progress">
          <div 
            className="test-module-progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="test-module-progress-text">
          {progress}% 完成
        </div>
      </div>
      
      <div className="test-module-section">
        <div className="test-module-section-title">
          标签示例:
        </div>
        <div className="test-module-tags">
          <span className="test-module-tag green">React</span>
          <span className="test-module-tag blue">Grid</span>
          <span className="test-module-tag purple">Layout</span>
        </div>
      </div>
    </div>
  );
}

export const module = {
  id: 'TestModule',
  name: '测试模块',
  component: TestModuleComponent,
  defaultConfig: { 
    title: '测试模块',
    description: '这是一个可拖拽和缩放的测试模块',
    message: 'Hello from Test Module!',
    progress: 65
  },
  configSchema: { 
    type: 'object', 
    properties: { 
      title: { type: 'string' },
      description: { type: 'string' },
      message: { type: 'string' },
      progress: { type: 'number' }
    } 
  },
};

export default module;