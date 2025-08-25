// src/modules/welcome-module/index.jsx
import WelcomeModuleComponent from './WelcomeComponent';

export default {
  id: 'WelcomeModule',
  name: '欢迎卡片',
  component: WelcomeModuleComponent,
  defaultConfig: {
    name: '张三',
    title: '前端工程师 | 技术博主',
    bio: '热爱编程，专注于 React 和 Vue 开发，喜欢分享技术心得。',
    avatarUrl: 'https://avatars.githubusercontent.com/u/12345678',
  },
  configSchema: {
    type: 'object',
    properties: {
      name: { type: 'string', title: '姓名' },
      title: { type: 'string', title: '职位' },
      bio: { type: 'string', title: '简介' },
      avatarUrl: { type: 'string', title: '头像链接', format: 'uri' },
    },
  },
};
