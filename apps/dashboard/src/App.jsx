import { ChakraProvider } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <ChakraProvider>
      <Layout>
        <Outlet />
      </Layout>
    </ChakraProvider>
  );
}

export default App;