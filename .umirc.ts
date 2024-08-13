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
        }
      ]
    },
    {
      path: "/hot",
      component: '@/layouts/index',
      layout: false,
      routes: [
        {
          path: '/hot/weibo',
          component: "@/pages/hot/weibo",
        },
        {
          path: '/hot/toutiao',
          component: "@/pages/hot/toutiao",
        },
        {
          path: '/hot/zhihu',
          component: "@/pages/hot/zhihu",
        }
      ]
    },
    {
      path: '/settings',
      component: '@/pages/settings'
    }
  ],
  history: {type: 'hash'},
  npmClient: 'cnpm',
});
