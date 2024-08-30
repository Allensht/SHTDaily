import "@/pages/settings/index.less"
import React, { useState } from "react"
import "@/pages/settings/index.less"
import ThemeTool from "./mod/themeTool"
import LanguageTool from "./mod/languageTool"
import { useLocalStorageState } from "ahooks"
import { HomeOutlined } from "@ant-design/icons"
import { Card, List, Divider } from "antd"

const Settings: React.FC = () => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>("tab1")
  const tabList = [
    {
      key: "tab1",
      tab: "主题",
    },
    {
      key: "tab2",
      tab: "语言",
    },
  ]
  const [darktheme, setDarktTheme] = useLocalStorageState<boolean>(
    "darktheme",
    {
      defaultValue: false,
    },
  )
  const [enUS, setEnUS] = useLocalStorageState("enUS", { defaultValue: false })
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
  const BgOption1 = () => {
    return <div className="bg1" style={{ height: "100px" }}></div>
  }
  const BgOption2 = () => {
    return <div className="bg2" style={{ height: "100px" }}></div>
  }
  const BgOption3 = () => {
    return <div className="bg3" style={{ height: "100px" }}></div>
  }
  const BgStyle: React.FC = () => {
    const data = [<BgOption1 />, <BgOption2 />, <BgOption3 />]
    return (
      <>
        <List
          header={null}
          footer={null}
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </>
    )
  }
  const TabOne = () => {
    return (
      <>
        <Divider
          orientation="left"
          style={{
            borderColor: "#4096ff",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          深浅模式
        </Divider>
        <ThemeTool changeTheme={changeTheme} darkTheme={darktheme} />
        <Divider
          orientation="left"
          style={{
            borderColor: "#4096ff",
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "15px",
          }}
        >
          背景样式
        </Divider>
        <BgStyle />
      </>
    )
  }
  const contentList: Record<string, React.ReactNode> = {
    tab1: <TabOne />,
    tab2: (
      <LanguageTool
        changeLanguageToZh={changeLanguageToZh}
        changeLanguageToEn={changeLanguageToEn}
        enUS={enUS}
      />
    ),
  }

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key)
  }

  return (
    <>
      <Card
        style={{ width: "100%", height: "100%" }}
        title="全局配置"
        extra={<HomeOutlined />}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
    </>
  )
}

export default Settings
