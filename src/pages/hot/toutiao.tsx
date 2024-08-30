import { useIntl } from "@umijs/max"
import axios from "axios"
import { useLocalStorageState } from "ahooks"
import { Button, message, Divider, Row, Col } from "antd"
import NewsList from "@/pages/custom/newsList"
import Reload from "@/pages/custom/reload"
import { useEffect } from "react"

const Toutiao = () => {
  const intl = useIntl()
  const title = intl.formatMessage({ id: "toutiao" })
  const loading = intl.formatMessage({ id: "loading" })
  const error = intl.formatMessage({ id: "error" })
  const success = intl.formatMessage({ id: "success" })
  const reload = intl.formatMessage({ id: "reload" })
  const notice1 = intl.formatMessage({ id: "notice1" })
  const notice2 = intl.formatMessage({ id: "notice2" })
  const toutiaoNewsUrl = "https://60s.viki.moe/toutiao"
  const [messageApi, contextHolder] = message.useMessage()
  const [toutiaoNews, setToutiaoNews] = useLocalStorageState("toutiaoNews", {
    listenStorageChange: true,
  })
  const [pathname, setPathname] = useLocalStorageState("pathname", {
    listenStorageChange: true,
  })
  const load = () => {
    messageApi.loading(loading, 0)
  }
  const faild = () => {
    messageApi.error(error, 3)
  }
  const succs = () => {
    messageApi.destroy()
    messageApi.success(success, 3)
  }

  const getToutiaoNews = async () => {
    try {
      load()
      const response = await axios.get(toutiaoNewsUrl)
      if (response.status === 200) {
        setToutiaoNews(response.data.data)
        succs()
      } else {
        faild()
      }
    } catch (e) {
      faild()
    }
  }
  useEffect(() => {
    if (pathname === "/hot/toutiao") {
      getToutiaoNews()
    }
  }, [pathname])

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      {contextHolder}
      <h1>{title}</h1>
      <Divider>
        {notice1}
        <br />
        {notice2}
      </Divider>
      <div style={{ marginLeft: 25, marginBottom: 20 }}>
        <Row gutter={16}>
          <Col className="gutter-row" span={3}>
            <Reload />
          </Col>
        </Row>
      </div>
      {toutiaoNews?.length > 0 ? (
        <NewsList news={toutiaoNews} />
      ) : (
        <Button onClick={getToutiaoNews}>{reload}</Button>
      )}
    </div>
  )
}
export default Toutiao
