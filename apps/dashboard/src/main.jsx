// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { ColorModeScript } from '@chakra-ui/react'; // 👈 必须引入
import App from './App.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Editor from './pages/Editor.jsx';
import Articles from './components/Articles.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/articles" element={<Articles />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 🔥 必须：让 Chakra 知道初始主题 */}
    <ColorModeScript initialColorMode="light" />
    <RouterProvider router={router} />
  </StrictMode>
);
