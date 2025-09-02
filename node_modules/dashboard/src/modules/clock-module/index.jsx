import React, { useState, useEffect } from 'react';
import { Box, Text as ChakraText, VStack, HStack, Icon } from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';

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
    <VStack spacing={3} align="center" justify="center" height="100%">
      <HStack spacing={2}>
        <Icon as={TimeIcon} color="blue.500" boxSize={5} />
        <ChakraText fontSize="lg" fontWeight="bold" color="blue.600">
          {config?.title || '实时时钟'}
        </ChakraText>
      </HStack>
      
      <Box textAlign="center">
        <ChakraText fontSize="2xl" fontWeight="bold" color="gray.800" fontFamily="mono">
          {formatTime(time)}
        </ChakraText>
        <ChakraText fontSize="sm" color="gray.600" mt={1}>
          {formatDate(time)}
        </ChakraText>
      </Box>
      
      {config?.showSeconds !== false && (
        <Box>
          <ChakraText fontSize="xs" color="gray.500">
            秒数: {time.getSeconds()}
          </ChakraText>
        </Box>
      )}
      
      <Box>
        <ChakraText fontSize="xs" color="gray.500">
          {config?.description || '当前时间'}
        </ChakraText>
      </Box>
    </VStack>
  );
}

export const module = {
  id: 'ClockModule',
  name: '时钟模块',
  component: ClockModuleComponent,
  defaultSize: { w: 3, h: 2 },
  minSize: { w: 2, h: 2 },
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
