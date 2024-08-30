import {
  GithubFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
} from "@ant-design/icons"
import { PageContainer, ProLayout } from "@ant-design/pro-components"
import logo from "@/assets/logo.png"
import pageConfig from "./pageConfig"
import { Outlet, setLocale, Link } from "@umijs/max"
import { useEffect, useState } from "react"
import "mac-scrollbar/dist/mac-scrollbar.css"
import { MacScrollbar } from "mac-scrollbar"
import "./index.less"
import { ConfigProvider, Divider, theme, ThemeConfig } from "antd"
import Burger from "@/layouts/custom/burger"
import { useLocalStorageState } from "ahooks"

export default () => {
  const [darktheme, setDarkTheme] = useLocalStorageState<boolean>("darktheme", {
    listenStorageChange: true,
  })
  const [pathname, setPathname] = useLocalStorageState<string>("pathname", {
    defaultValue: "/home",
  })
  const [enUS, setEnUS] = useLocalStorageState("enUS", {
    listenStorageChange: true,
  })
  const [collapsed, setCollapsed] = useState(true)
  const bgStyle = {
    background: `radial-gradient(circle at 100%,#121212, #121212 50%, #eee 75%, #121212 75%)`,
    height: "100vh",
  }
  useEffect(() => {
    setLocale(enUS ? "en-US" : "zh-CN", false)
  }, [enUS])
  useEffect(() => {
    if (window.electron && typeof window.electron.darktheme === "function") {
        window.electron.darktheme(darktheme ? "dark" : "light")
    } else {
        console.warn("Electron not detected or darktheme function not available.")
    }
  }, [darktheme])
  const config: ThemeConfig = {
    cssVar: true,
    algorithm: darktheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: "#4096ff",
      colorInfo: "#4096ff",
      colorBgContainer: darktheme ? "#1d1d1d" : "#fff",
    },
  }
  const ImageLimit = ({ src, width, height }) => {
    return (
      <div style={{ width: width, height: height }}>
        <img src={src} style={{ maxWidth: "100%", maxHeight: "100%" }} />
      </div>
    )
  }

  return (
    <>
      {darktheme ? null : <div className="drag" style={{ height: 35 }}></div>}
      <div
        className={darktheme ? "bg" : "bgGrid"}
        style={{
          position: "absolute",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: darktheme ? "#121212" : "#fff",
          zIndex: -1,
        }}
      ></div>
      <div className="pro-layout">
        <ConfigProvider theme={config}>
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
              if (props.isMobile) return []
              return [
                <InfoCircleFilled key="InfoCircleFilled" />,
                <QuestionCircleFilled key="QuestionCircleFilled" />,
                <GithubFilled key="GithubFilled" />,
              ]
            }}
            menuItemRender={(item, dom) => (
              <Link
                to={item.path || "/home"}
                onClick={() => setPathname(item.path || "/home")}
              >
                {dom}
              </Link>
            )}
            subMenuItemRender={(item, dom) => (
              <Link
                to={item.path || "/news/min"}
                onClick={() => setPathname(item.path || "/news/min")}
              >
                {dom}
              </Link>
            )}
            menu={{ type: "group", defaultOpenAll: true }}
          >
            <PageContainer
              header={{
                style: darktheme ? { top: "-20px" } : { top: "-55px" },
              }}
              breadcrumbRender={() => {
                return (
                  <>
                    <Burger
                      collapsed={collapsed}
                      setCollapsed={setCollapsed}
                      darkTheme={darktheme}
                    />
                  </>
                )
              }}
            >
              <MacScrollbar
                className="pagBody"
                style={{
                  backgroundColor: darktheme ? "#1d1d1d" : "#fff",
                  marginTop: darktheme ? "35px" : "0",
                }}
              >
                <Outlet />
              </MacScrollbar>
            </PageContainer>
          </ProLayout>
        </ConfigProvider>
      </div>
    </>
  )
}
