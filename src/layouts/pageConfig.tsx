import { HomeOutlined, CloudOutlined, ProjectOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';

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
        },
      ]
    }     
}