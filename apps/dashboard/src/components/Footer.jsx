import { Box, Text, Container } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="gray.100" py={4} mt="auto">
      <Container maxW="container.xl">
        <Text textAlign="center" color="gray.600">
          © 2024 Chimera Dashboard. Built with React + Vite + Chakra UI
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;