import { GithubFilled, InfoCircleFilled, QuestionCircleFilled, SettingOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import avatarSvg from '@/assets/avatar.svg';
import logo from '@/assets/logo.png';
import pageConfig from './pageConfig';
import { Outlet, setLocale, Link, useIntl } from '@umijs/max';
import { useEffect, useState } from 'react';
import 'mac-scrollbar/dist/mac-scrollbar.css';
import { MacScrollbar } from 'mac-scrollbar';
import './index.less';
import { Divider, Col, Row, ConfigProvider, theme, ThemeConfig, Modal, Radio } from 'antd';
import Burger from '@/layouts/custom/burger'
import ThemeTool from '@/layouts/custom/themeTool'
import { useLocalStorageState } from 'ahooks';

export default () => {
  const [darktheme, setDarkTheme] = useLocalStorageState<boolean>('darktheme', { defaultValue: false })
  const [pathname, setPathname] = useLocalStorageState<string>('pathname', { defaultValue: '/home' })
  const [enUS, setEnUS] = useLocalStorageState('enUS', { defaultValue: false })
  const [collapsed, setCollapsed] = useState(true);
  const bgStyle = { background: `radial-gradient(circle at 100%,#121212, #121212 50%, #eee 75%, #121212 75%)`, height: '100vh' }
  const intl = useIntl();
  const settings = intl.formatMessage({ id: 'settings' })
  const language = intl.formatMessage({ id: 'language' })
  const success = intl.formatMessage({ id: 'success' })

  useEffect(() => {
    setLocale(enUS ? 'en-US' : 'zh-CN', false)
  }, [enUS])

  useEffect(() => {
    window.electron.darkTheme(darktheme ? "dark" : "light")
  }, [darktheme])

  const Settings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const set = (value: String) => {
      setConfirmLoading(true);
      setTimeout(() => {
        if (value === 'zh') {
          setEnUS(false)
        } else {
          setEnUS(true)
        }
        setIsModalOpen(false);
        setConfirmLoading(false);
      }, 1000);
    };
    const [radioValue, setRadioValue] = useState('a');
    useEffect(() => {
      if (enUS) {
        setRadioValue('b')
      } else {
        setRadioValue('a')
      }
    }, [enUS])

    return (
      <>
        <button onClick={showModal} className='settingsButton'>
          <SettingOutlined />
        </button>
        <Modal title={settings} confirmLoading={confirmLoading} open={isModalOpen} onOk={set} onCancel={handleCancel} footer={(_, {OkBtn}) => (
          <>
            <OkBtn />
          </>
        )}>
          <div className='languageSettings'>
            <span>{language}</span>
            <br />
            <Radio.Group defaultValue={radioValue} size="large" style={{ marginTop: 10 }}>
              <Radio.Button onClick={ () => { set('zh') } } value='a'>简体中文</Radio.Button>
              <Radio.Button onClick={ () => { set('us') } } value='b'>English</Radio.Button>
            </Radio.Group>
          </div>
        </Modal>
      </>
    )
  }

  const config: ThemeConfig = { //配置主题
    cssVar: true,
    algorithm: darktheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      "colorPrimary": "#4096ff",
      "colorInfo": "#4096ff"
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
    <div
      id="pro-layout"
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
          avatarProps={{
            src: avatarSvg,
            title: 'Allensht',
            size: 'small',
          }}
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
          menu={{ type: 'group', defaultOpenAll: true }}
        >
          <PageContainer
            header={{
              title: null,
              style: { padding: 0 }
            }}
            breadcrumbRender={() => {
              return (
                <>
                  <div className='headerTool'>
                    <Row gutter={16}>
                      <Col className="gutter-row" span={3}>
                        <div className='themeTool no-drag'>
                          <ThemeTool setDarkTheme={setDarkTheme} darkTheme={darktheme}/>
                        </div>
                      </Col>
                      <Col className="gutter-row" span={3}>
                        <div className='settings no-drag'>
                          <Settings />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <Divider style={{ marginTop: 15, padding: 0 }}></Divider>
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
  );
};