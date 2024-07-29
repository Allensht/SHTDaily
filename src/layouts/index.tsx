import { GithubFilled, InfoCircleFilled, QuestionCircleFilled, DownOutlined, UserOutlined, SunOutlined, MoonFilled, TranslationOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import avatarSvg from '@/assets/avatar.svg';
import bgLogo from '@/assets/bgLogo.svg';
import pageConfig from './pageConfig';
import bg1 from '@/assets/bg1.png';
import bg2 from '@/assets/bg2.png';
import bg3 from '@/assets/bg3.png';
import { Outlet, history, useIntl, setLocale } from '@umijs/max';
import { useEffect, useState } from 'react';
import 'mac-scrollbar/dist/mac-scrollbar.css';
import { MacScrollbar } from 'mac-scrollbar';
import './index.less';
import { Divider, Col, Row, Flex, Radio, ConfigProvider, theme, ThemeConfig } from 'antd';
import React from 'react';

export default () => {
    const [darktheme, setDarkTheme] = useState(false)
    const [pathname, setPathname] = useState('/home')
    const [enUS, setEnUS] = useState(false)
    const [themeRadioValue, setThemeRadioValue] = useState('a')
    const [languageRadioValue, setLanguageRadioValue] = useState('a')
    const intl = useIntl();
    const themeChangeHandle = () => {
      setDarkTheme(!darktheme);
      setThemeRadioValue(themeRadioValue === 'a' ? 'b' : 'a')
    }
    const languageChangeHandle = () => {
      setEnUS(!enUS);
      setLanguageRadioValue(languageRadioValue === 'a' ? 'b' : 'a')
    }
    useEffect(() => {
      setLocale(enUS ? 'en-US' : 'zh-CN', false)
    }, [enUS])
    const ThemeTool: React.FC = () => (
      <Flex vertical gap="middle">
        <Radio.Group defaultValue="a" size="small" buttonStyle="solid" value={themeRadioValue} onChange={() => themeChangeHandle()}>
          <Radio.Button value="a">{intl.formatMessage({ id: 'light' })}</Radio.Button>
          <Radio.Button value="b">{intl.formatMessage({ id: 'dark' })}</Radio.Button>
        </Radio.Group>
      </Flex>
    );
      
    const LanguageTool: React.FC = () => (
      <Flex vertical gap="middle">
        <Radio.Group defaultValue="a" size="small" buttonStyle="solid" value={languageRadioValue} onChange={() => languageChangeHandle()}>
          <Radio.Button value="a">简体中文</Radio.Button>
          <Radio.Button value="b">English(US)</Radio.Button>
        </Radio.Group>
      </Flex>
    );
    const config: ThemeConfig = { //配置主题
      cssVar: true,
      algorithm: darktheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        "colorPrimary": "#00b5ff",
        "colorInfo": "#00b5ff"
      },
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
        style={{
          height: '100vh',
        }}
      >
        <ConfigProvider
          theme={config}
        >
          <ProLayout
            title="SHTDaily"
            logo={<ImageLimit src={bgLogo} width={100} height={100} />}
            siderWidth={216}
            bgLayoutImgList={[
              {
                src: bg1,
                left: 85,
                bottom: 100,
                height: '303px',
              },
              {
                src: bg2,
                bottom: -68,
                right: -45,
                height: '303px',
              },
              {
                src: bg3,
                bottom: 0,
                left: 0,
                width: '331px',
              },
            ]}
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
              <div
                onClick={() => {
                  setPathname(item.path || '/home')
                  history.push(item.path || '/home')
                }}
              >
                {dom}
              </div>
            )}
          >
            <PageContainer
              header={{
                title: null,
              }}
              breadcrumbRender={() => {
                return (
                  <>
                      <div className='headerTool'>
                        <Row gutter={16}>
                          <Col className="gutter-row" span={4}>
                            <div className='themeTool no-drag'>
                              <ThemeTool />
                            </div>
                          </Col>
                          <Col className="gutter-row" span={4}>
                            <div className='languageTool no-drag'>
                              <LanguageTool />
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <Divider>{ enUS ? 'SHTDaily | Your Daily Assistant' : 'SHTDaily | 你的日常助手'}</Divider>
                  </>
                )
              }}
            >
              <MacScrollbar
                className='pagBody'
                minThumbSize={10}
                trackStyle={() => {
                  return {
                    background: 'transparent',
                    borderLeft: 'none'
                  }
                }}
              >
                  <Outlet />
              </MacScrollbar>
            </PageContainer>
          </ProLayout>
        </ConfigProvider>
      </div>
    );
};