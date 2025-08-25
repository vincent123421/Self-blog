// src/themes.js
import { extendTheme } from '@chakra-ui/react';

// 🌞 亮色主题
const lightTheme = {
  colors: {
    bg: {
      page: 'gray.50',
      card: 'white',
      header: 'blue.500',
    },
    text: {
      primary: 'gray.800',
      secondary: 'gray.600',
    },
    border: 'gray.200',
  },
  shadows: {
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
};

// 🌙 暗色主题
const darkTheme = {
  colors: {
    bg: {
      page: 'gray.900',
      card: 'gray.800',
      header: 'purple.700',
    },
    text: {
      primary: 'whiteAlpha.900',
      secondary: 'gray.300',
    },
    border: 'gray.700',
  },
  shadows: {
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  },
};

// 🎨 合并主题（Chakra 格式）
const customTheme = extendTheme({
  light: lightTheme,
  dark: darkTheme,
});

export { lightTheme, darkTheme, customTheme };
