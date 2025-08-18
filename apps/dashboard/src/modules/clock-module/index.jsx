import React, { useState, useEffect } from 'react';
import { TimeIcon } from '@chakra-ui/icons';
import './styles.css';

function ClockModuleComponent({ config }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="clock-module">
      <div className="clock-header">
        <TimeIcon className="clock-icon" />
        <span className="clock-title">
          {config?.title || '实时时钟'}
        </span>
      </div>
      
      <div className="clock-time-container">
        <div className="clock-time">
          {formatTime(time)}
        </div>
        <div className="clock-date">
          {formatDate(time)}
        </div>
      </div>
      
      {config?.showSeconds !== false && (
        <div className="clock-seconds">
          秒数: {time.getSeconds()}
        </div>
      )}
      
      <div className="clock-description">
        {config?.description || '当前时间'}
      </div>
    </div>
  );
}

export const module = {
  id: 'ClockModule',
  name: '时钟模块',
  component: ClockModuleComponent,
  defaultConfig: { 
    title: '实时时钟',
    description: '当前时间',
    showSeconds: true
  },
  configSchema: { 
    type: 'object', 
    properties: { 
      title: { type: 'string' },
      description: { type: 'string' },
      showSeconds: { type: 'boolean' }
    } 
  },
};

export default module;

