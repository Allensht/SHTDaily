import { ReloadOutlined } from "@ant-design/icons";
import { useIntl } from "@umijs/max";
import { useLocalStorageState } from "ahooks";
import { Flex, message } from "antd";
import axios from "axios";
import '@/pages/custom/reload/index.less'
import { useEffect } from "react";

const Reload = () => {
    const [darktheme, setDarktheme] = useLocalStorageState('darktheme', {
        listenStorageChange: true,
    })
    const intl = useIntl();
    const [messageApi, contextHolder] = message.useMessage()
    const loading = intl.formatMessage({ id: 'loading' })
    const error = intl.formatMessage({ id: 'error' })
    const success = intl.formatMessage({ id: 'success' })
    const [pathname, setPathname] = useLocalStorageState('pathname', {
        listenStorageChange: true,
    })
    const [weiboNews, setWeiboNews] = useLocalStorageState('weiboNews', {
        defaultValue: [],
    })
    const [toutiaoNews, setToutiaoNews] = useLocalStorageState('toutiaoNews', {
        defaultValue: [],
    })
    const [zhihuNews, setZhihuNews] = useLocalStorageState('zhihuNews', {
        defaultValue: [],
    })
    const [nowUrl, setNowUrl] = useLocalStorageState('nowUrl', {
        defaultValue: '',
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
    useEffect(() => {
        setNowUrl(`https://60s.viki.moe/${pathname.slice(6)}`)
    }, [pathname])
    const getNews = async () => {
        try {
            load()
            const response = await axios.get(nowUrl)
            if (response.status === 200) {
                succs()
                if (nowUrl === 'https://60s.viki.moe/weibo') {
                    setWeiboNews(response.data.data)
                } else if (nowUrl === 'https://60s.viki.moe/toutiao') {
                    setToutiaoNews(response.data.data)
                } else {
                    setZhihuNews(response.data.data)
                }
            } else {
                faild()
            }
        } catch (e) {
            faild()
        }
    }

    return (
      <>
        {contextHolder}
        <Flex gap="small" align="flex-start" vertical>
          <Flex gap="small" wrap>
            <button onClick={getNews} style={{
                backgroundColor: darktheme ? '#fff' : '#000',
                color: darktheme ? '#000' : '#fff',
            }}>
                <ReloadOutlined />
            </button>
          </Flex>
        </Flex>
      </>
    )
}

export default Reload