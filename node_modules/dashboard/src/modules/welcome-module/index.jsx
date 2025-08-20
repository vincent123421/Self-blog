import React, { useState, useEffect } from 'react';
import { Avatar, VStack, Text, Box, Button, HStack } from '@chakra-ui/react';
import './styles.css';

function WelcomeModuleComponent({ config }) {
  const [greeting, setGreeting] = useState('');
  const [typewriterText, setTypewriterText] = useState('');

  // 获取动态问候语
  const getGreeting = () => {
    const mode = config?.greetingMode || 'static';
    
    if (mode === 'static') {
      return config?.staticGreeting || 'Welcome!';
    }
    
    if (mode === 'timeBased') {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good Morning!';
      if (hour < 18) return 'Good Afternoon!';
      return 'Good Evening!';
    }
    
    if (mode === 'customList' && config?.customGreetings?.length) {
      const greetings = config.customGreetings.split(',').map(g => g.trim());
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    return 'Welcome!';
  };

  // 打字机效果
  useEffect(() => {
    const text = config?.slogan || '';
    if (!text || !config?.enableTypewriter) {
      setTypewriterText(text);
      return;
    }

    let index = 0;
    const timer = setInterval(() => {
      setTypewriterText(text.slice(0, index));
      index++;
      if (index > text.length) clearInterval(timer);
    }, 100);

    return () => clearInterval(timer);
  }, [config?.slogan, config?.enableTypewriter]);

  useEffect(() => {
    setGreeting(getGreeting());
    const interval = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(interval);
  }, [config?.greetingMode, config?.staticGreeting, config?.customGreetings]);

  // 背景样式
  const getBackgroundStyle = () => {
    const bg = config?.backgroundOptions || 'color';
    const style = {};
    
    if (bg === 'gradient') {
      style.background = `linear-gradient(${config?.gradientDirection || '45deg'}, ${config?.gradientStart || '#667eea'}, ${config?.gradientEnd || '#764ba2'})`;
    } else if (bg === 'pattern') {
      style.backgroundImage = 'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 20 0 L 0 0 0 20" fill="none" stroke="%23e2e8f0" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)" /%3E%3C/svg%3E")';
    } else {
      style.backgroundColor = config?.backgroundColor || '#f7fafc';
    }
    
    return style;
  };

  const displayMode = config?.displayMode || 'card';
  const alignment = config?.alignment || 'center';
  const textColor = config?.textColor || 'gray.800';
  const buttons = config?.callToActionButtons ? JSON.parse(config.callToActionButtons || '[]') : [];

  return (
    <Box 
      className={`welcome-module ${displayMode}`}
      textAlign={alignment}
      p={displayMode === 'hero' ? 8 : 4}
      style={getBackgroundStyle()}
      color={textColor}
      position="relative"
      overflow="hidden"
    >
      {config?.enableParticles && (
        <Box className="particles" position="absolute" top={0} left={0} right={0} bottom={0} />
      )}
      
      <VStack spacing={displayMode === 'hero' ? 6 : 3} position="relative" zIndex={1}>
        <Avatar
          size={displayMode === 'hero' ? '2xl' : 'xl'}
          src={config?.avatarUrl}
          name={config?.name || 'User'}
          bg="blue.500"
        />
        
        <VStack spacing={2}>
          <Text fontSize={displayMode === 'hero' ? '3xl' : 'xl'} fontWeight="bold">
            {greeting}
          </Text>
          
          <Text fontSize={displayMode === 'hero' ? '2xl' : 'lg'} fontWeight="bold">
            {config?.name || 'Your Name'}
          </Text>
          
          <Text 
            fontSize={displayMode === 'hero' ? 'lg' : 'md'} 
            color={textColor === 'white' ? 'gray.200' : 'gray.600'}
            whiteSpace="pre-line"
            minH="1.5em"
          >
            {typewriterText}
            {config?.enableTypewriter && typewriterText !== config?.slogan && '|'}
          </Text>
        </VStack>
        
        {buttons.length > 0 && (
          <HStack spacing={3} flexWrap="wrap" justify="center">
            {buttons.map((button, index) => (
              <Button
                key={index}
                size={displayMode === 'hero' ? 'lg' : 'md'}
                colorScheme={config?.buttonColor || 'blue'}
                onClick={() => window.open(button.url, '_blank')}
              >
                {button.label}
              </Button>
            ))}
          </HStack>
        )}
      </VStack>
    </Box>
  );
}

export const module = {
  id: 'WelcomeModule',
  name: '数字名片模块',
  component: WelcomeModuleComponent,
  defaultConfig: {
    displayMode: 'card',
    avatarUrl: '',
    name: 'Your Name',
    slogan: 'Welcome to my digital space!',
    greetingMode: 'timeBased',
    staticGreeting: 'Welcome!',
    customGreetings: 'Hello!, Hi there!, Welcome!',
    backgroundOptions: 'color',
    backgroundColor: '#f7fafc',
    gradientStart: '#667eea',
    gradientEnd: '#764ba2',
    gradientDirection: '45deg',
    enableParticles: false,
    callToActionButtons: '[]',
    alignment: 'center',
    textColor: 'gray.800',
    buttonColor: 'blue',
    enableTypewriter: false
  },
  configSchema: {
    type: 'object',
    properties: {
      displayMode: { type: 'string' },
      avatarUrl: { type: 'string' },
      name: { type: 'string' },
      slogan: { type: 'string' },
      greetingMode: { type: 'string' },
      staticGreeting: { type: 'string' },
      customGreetings: { type: 'string' },
      backgroundOptions: { type: 'string' },
      backgroundColor: { type: 'string' },
      gradientStart: { type: 'string' },
      gradientEnd: { type: 'string' },
      gradientDirection: { type: 'string' },
      enableParticles: { type: 'boolean' },
      callToActionButtons: { type: 'string' },
      alignment: { type: 'string' },
      textColor: { type: 'string' },
      buttonColor: { type: 'string' },
      enableTypewriter: { type: 'boolean' }
    }
  }
};

export default module;