import '@/pages/settings/index.less'
import React, { useState } from 'react';
import { Card } from 'antd';
import '@/pages/settings/index.less'
import ThemeTool from './mod/themeTool';
import LanguageTool from './mod/languageTool';
import { useLocalStorageState } from 'ahooks';
import { HomeFilled, HomeOutlined } from '@ant-design/icons';

const Settings: React.FC = () => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');
  const tabList = [
    {
      key: 'tab1',
      tab: '主题',
    },
    {
      key: 'tab2',
      tab: '语言',
    },
  ]
  const [darktheme, setDarktTheme] = useLocalStorageState<boolean>('darktheme', {
    defaultValue: false,
  })
  const [enUS, setEnUS] = useLocalStorageState('enUS', { defaultValue: false })
  const changeTheme = () => {
    setDarktTheme(!darktheme)
  }
  const changeLanguageToZh = () => {
    if (!enUS) {
        null
    } else {
      setEnUS(false)
    }
  }
  const changeLanguageToEn = () => {
    if (enUS) {
        null
    } else {
      setEnUS(true)
    }
  }
  const contentList: Record<string, React.ReactNode> = {
    tab1: <ThemeTool changeTheme={changeTheme} darkTheme={darktheme} />,
    tab2: <LanguageTool changeLanguageToZh={changeLanguageToZh} changeLanguageToEn={changeLanguageToEn} enUS={enUS}/>
  }

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  return (
    <>
      <Card
        style={{ width: '100%', height: '100%' }}
        title="全局配置"
        extra={<HomeOutlined />}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
    </>
  );
};

export default Settings