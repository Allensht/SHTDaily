import { defineConfig } from '@umijs/max';

export default defineConfig({
  locale: {
    default: 'zh-CN',
    baseSeparator: '-',
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: "@/pages/home",
    },
    {
      path: "/weather",
      component: "@/pages/weather",
    },
    {
      path: "/news",
      component: "@/pages/news",
    }
  ],
  history: {type: 'hash'},
  npmClient: 'cnpm',
});
