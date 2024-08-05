import { HomeOutlined, CloudOutlined, ProjectOutlined, TikTokOutlined, BilibiliOutlined, ZhihuOutlined, WeiboOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { ReactComponent as ToutiaoOutLined } from '@/assets/toutiao.svg';
const Home = () => {
  const intl = useIntl();
  return intl.formatMessage({ id: 'home' })
}

const Weather = () => {
  const intl = useIntl();
  return intl.formatMessage({ id: 'weather' })
}

const News = () => {
  const intl = useIntl();
  return intl.formatMessage({ id: 'news' })

}

const Min = () => {
  const intl = useIntl();
  return intl.formatMessage({ id: 'min' })
}

const Weibo = () => {
  const intl = useIntl();
  return intl.formatMessage({ id: 'weibo' })
}

const Toutiao = () => {
  const intl = useIntl();
  return intl.formatMessage({ id: 'toutiao' })
}

const Zhihu = () => {
  const intl = useIntl();
  return intl.formatMessage({ id: 'zhihu' })
}

const Douyin = () => {
  const intl = useIntl();
  return intl.formatMessage({ id: 'douyin' })
}

const Bili = () => {
  const intl = useIntl();
  return intl.formatMessage({ id: 'bili' })
}

export default {
    route: {
      path: '/home',
      routes: [
        {
          path: '/home',
          name: <Home />,
          icon: <HomeOutlined />,
        },
        {
            path: '/weather',
            name: <Weather />,
            icon: <CloudOutlined />,
        },
        {
            path: '/news',
            name: <News />,
            icon: <ProjectOutlined />,
            routes: [
              {
                path: '/news/min',
                name: <Min />,
                icon: <ProjectOutlined />,
              },
              {
                path: '/news/weibo',
                name: <Weibo />,
                icon: <WeiboOutlined />,
              },
              {
                path: '/news/toutiao',
                name: <Toutiao />,
                icon: <ToutiaoOutLined />,
              },
              {
                path: '/news/zhihu',
                name: <Zhihu />,
                icon: <ZhihuOutlined />,
              },
              {
                path: '/news/douyin',
                name: <Douyin />,
                icon: <TikTokOutlined />,
              },
              {
                path: '/news/bili',
                name: <Bili />,
                icon: <BilibiliOutlined />,
              },
            ]
        },
      ]
    } 
}