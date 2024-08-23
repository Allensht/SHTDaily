import { HomeOutlined, CloudOutlined, ProjectOutlined, ZhihuOutlined, WeiboOutlined, SettingOutlined, FireOutlined, BookOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { ReactComponent as ToutiaoOutLined } from '@/assets/toutiao.svg';
const Home = () => {
  const intl = useIntl();
  return intl.formatMessage({ id: 'home' })
}

const News = () => {
  const intl = useIntl();
  return intl.formatMessage({ id: 'news' })

}
  
const Hot = () => {
  const intl = useIntl();
  return intl.formatMessage({ id: 'hot' })
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

const Settings = () => {
  const intl = useIntl()
  return intl.formatMessage({ id: 'settings' })
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
            path: '/news',
            name: <News />,
            icon: <ProjectOutlined />,
            routes: [
              {
                path: '/news/min',
                name: <Min />,
                icon: <BookOutlined />,
              }
            ]
        },
        {
          path: '/hot',
          name: <Hot />,
          icon: <FireOutlined />,
          routes: [
            {
              path: '/hot/weibo',
              name: <Weibo />,
              icon: <WeiboOutlined />,
            },
            {
              path: '/hot/toutiao',
              name: <Toutiao />,
              icon: <ToutiaoOutLined />,
            },
            {
              path: '/hot/zhihu',
              name: <Zhihu />,
              icon: <ZhihuOutlined />,
            }
          ]
        },
        {
          path: '/settings',
          name: <Settings />,
          icon: <SettingOutlined />,
      } ,
      ]
    } 
}