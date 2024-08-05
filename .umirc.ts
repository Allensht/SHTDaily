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
      component: '@/layouts/index',
      layout: false,
      routes: [
        {
          path: '/news/min',
          component: "@/pages/news/index",
        },
        {
          path: '/news/weibo',
          component: "@/pages/news/weibo",
        },
        {
          path: '/news/toutiao',
          component: "@/pages/news/toutiao",
        },
        {
          path: '/news/zhihu',
          component: "@/pages/news/zhihu",
        },
        {
          path: '/news/douyin',
          component: "@/pages/news/douyin",
        },
        {
          path: '/news/bili',
          component: "@/pages/news/bili",
        },
      ]
    }
  ],
  history: {type: 'hash'},
  npmClient: 'cnpm',
});
