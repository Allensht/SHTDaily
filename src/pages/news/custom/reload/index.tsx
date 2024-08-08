import { ReloadOutlined } from "@ant-design/icons";
import { useIntl } from "@umijs/max";
import { useLocalStorageState } from "ahooks";
import { Flex, message } from "antd";
import axios from "axios";
import '@/pages/news/custom/reload/index.less'
import { useEffect } from "react";

const Reload = () => {
    const intl = useIntl();
    const [messageApi, contextHolder] = message.useMessage()
    const loading = intl.formatMessage({ id: 'loading' })
    const error = intl.formatMessage({ id: 'error' })
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
    const [douyinNews, setDouyinNews] = useLocalStorageState('douyinNews', {
        defaultValue: [],
    })
    const [biliNews, setBiliNews] = useLocalStorageState('biliNews', {
        defaultValue: [],
    })
    const [nowUrl, setNowUrl] = useLocalStorageState('nowUrl', {
        defaultValue: '',
    })
    useEffect(() => {
        setNowUrl(`https://60s.viki.moe/${pathname.slice(6)}`)
    }, [pathname])
    const getNews = async () => {
        try {
            messageApi.open({
                type: 'loading',
                content: loading,
                duration: 0,
            });
            setTimeout(messageApi.destroy, 3000)
            const response = await axios.get(nowUrl)
            if (response.status === 200) {
                if (nowUrl === 'https://60s.viki.moe/weibo') {
                    setWeiboNews(response.data.data)
                } else if (nowUrl === 'https://60s.viki.moe/toutiao') {
                    setToutiaoNews(response.data.data)
                } else if (nowUrl === 'https://60s.viki.moe/zhihu') {
                    setZhihuNews(response.data.data)
                } else if (nowUrl === 'https://60s.viki.moe/douyin') {
                    setDouyinNews(response.data.data)
                } else {
                    setBiliNews(response.data.data)
                }
            } else {
                messageApi.open({
                    type: 'error',
                    content: error,
                });
            }

        } catch (e) {
            messageApi.open({
                type: 'error',
                content: error,
            });
        }
    }

    return (
      <>
        {contextHolder}
        <Flex gap="small" align="flex-start" vertical>
          <Flex gap="small" wrap>
            <button onClick={getNews}>
                <ReloadOutlined />
            </button>
          </Flex>
        </Flex>
      </>
    )
}

export default Reload