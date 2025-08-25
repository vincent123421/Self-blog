import { Box, Flex, Text, Button, Container } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <Box bg="blue.500" color="white" py={4}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold">
            Chimera Dashboard
          </Text>
          <Flex gap={4}>
            <Button
              as={Link}
              to="/"
              variant={location.pathname === '/' ? 'solid' : 'ghost'}
              colorScheme="whiteAlpha"
            >
              Dashboard
            </Button>
            <Button
              as={Link}
              to="/editor"
              variant={location.pathname === '/editor' ? 'solid' : 'ghost'}
              colorScheme="whiteAlpha"
            >
              Editor
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;