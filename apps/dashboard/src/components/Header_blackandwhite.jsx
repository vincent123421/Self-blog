// src/components/Header_blackandwhite.jsx
import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header_blackandwhite = () => {
  const { toggleColorMode } = useColorMode();
  const iconColor = useColorModeValue('yellow.400', 'orange.300');
  const bgColor = useColorModeValue('bg.header', 'bg.header');
  const textColor = useColorModeValue('white', 'whiteAlpha.900');

  return (
    <Box
      as="header"
      bg={bgColor}
      color={textColor}
      p={4}
      borderBottom="1px"
      borderColor="border"
    >
      <Flex justify="space-between" align="center" maxW="6xl" mx="auto">
        <Text fontSize="xl" fontWeight="bold">
          我的仪表盘
        </Text>

        <IconButton
          aria-label="切换主题"
          icon={useColorModeValue(<FaMoon size={18} />, <FaSun size={18} />)}
          onClick={toggleColorMode}
          color={iconColor}
          variant="solid"
          size="md"
        />
      </Flex>
    </Box>
  );
};

export default Header_blackandwhite;
