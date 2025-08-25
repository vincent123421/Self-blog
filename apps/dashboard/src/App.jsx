// src/App.jsx
import { ChakraProvider } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import { customTheme } from './themes'; // 👈 引入自定义主题

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Layout>
        <Outlet />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
