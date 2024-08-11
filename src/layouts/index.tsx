import { GithubFilled, InfoCircleFilled, QuestionCircleFilled, SettingOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import avatarSvg from '@/assets/avatar.svg';
import logo from '@/assets/logo.png';
import pageConfig from './pageConfig';
import { Outlet, setLocale, Link } from '@umijs/max';
import { useEffect, useState } from 'react';
import 'mac-scrollbar/dist/mac-scrollbar.css';
import { MacScrollbar } from 'mac-scrollbar';
import './index.less';
import { Divider, ConfigProvider, theme, ThemeConfig } from 'antd';
import Burger from '@/layouts/custom/burger'
import Settings from './custom/settings';
import { useLocalStorageState } from 'ahooks';

export default () => {
  const [darktheme, setDarkTheme] = useLocalStorageState<boolean>('darktheme', { defaultValue: false })
  const [pathname, setPathname] = useLocalStorageState<string>('pathname', { defaultValue: '/home' })
  const [enUS, setEnUS] = useLocalStorageState('enUS', { defaultValue: false })
  const [collapsed, setCollapsed] = useState(true);
  const bgStyle = { background: `radial-gradient(circle at 100%,#121212, #121212 50%, #eee 75%, #121212 75%)`, height: '100vh' }
  useEffect(() => {
    setLocale(enUS ? 'en-US' : 'zh-CN', false)
  }, [enUS])
  useEffect(() => {
    window.electron.darkTheme(darktheme ? "dark" : "light")
  }, [darktheme])
  const config: ThemeConfig = { //配置主题
    cssVar: true,
    algorithm: darktheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      "colorPrimary": "#4096ff",
      "colorInfo": "#4096ff",
      "colorBgLayout": darktheme ? "#121212" : "#fff",
    }
  };
  const ImageLimit = ({ src, width, height }) => {
    return (
      <div style={{ width: width, height: height }}>
        <img src={src} style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </div>
    )
  }

  return (
    <>
        <div className='headerTool drag'>
          <div className='settings no-drag'>
            <Settings setEnUS={setEnUS} setDarkTheme={setDarkTheme} enUS={enUS} darktheme={darktheme} />
          </div>
        </div>
        <Divider style={{ marginTop: 15, padding: 0 }}></Divider>
      <div
        className="pro-layout"
      >
        <ConfigProvider
          theme={config}
        >
          <ProLayout
            contentStyle={darktheme ? bgStyle : {}}
            title="SHTDaily"
            logo={<ImageLimit src={logo} width={70} height={70} />}
            siderWidth={216}
            collapsedButtonRender={false}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            location={{ pathname }}
            {...pageConfig}
            actionsRender={(props) => {
              if (props.isMobile) return [];
              return [
                <InfoCircleFilled key="InfoCircleFilled" />,
                <QuestionCircleFilled key="QuestionCircleFilled" />,
                <GithubFilled key="GithubFilled" />,
              ];
            }}
            menuItemRender={(item, dom) => (
              <Link to={item.path || '/home'} onClick={() => setPathname(item.path || "/home")}>
                {dom}
              </Link>
            )}
            subMenuItemRender={(item, dom) => (
              <Link to={item.path || '/news/min'} onClick={() => setPathname(item.path || "/news/min")}>
                {dom}
              </Link>
            )}
            menu={{ type: 'sub', defaultOpenAll: true }}
          >
            <PageContainer
              header={{
                style: { top: "-30px" }
              }}
              breadcrumbRender={() => {
                return (
                  <>
                    <Burger collapsed={collapsed} setCollapsed={setCollapsed} darkTheme={darktheme}/>
                  </>
                )
              }}
            >
              <MacScrollbar
                className='pagBody'
                style={{ backgroundColor: darktheme ? '#1d1d1d' : '#fff'}}
              >
                <Outlet />
              </MacScrollbar>
            </PageContainer>
          </ProLayout>
        </ConfigProvider>
      </div>
    </>
  );
};