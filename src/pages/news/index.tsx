import { useIntl } from '@umijs/max';
import axios from 'axios';
import { useLocalStorageState } from 'ahooks';
import { Button, message, List, Typography, Divider } from 'antd';
import dayjs from 'dayjs'
import { useEffect, useRef } from 'react';
import ShareTool from '@/pages/custom/shareTool';

const News = () => {
    const [darktheme, setDarkTheme] = useLocalStorageState('darktheme', {
        listenStorageChange: true,
    })
    const pagBodyRef = useRef<HTMLDivElement>(null)
    const date = dayjs().format('YYYY-MM-DD')
    const [newsDate, setNewsDate] = useLocalStorageState('newsDate', {
        defaultValue: '',
    })
    const [tip, setTip] = useLocalStorageState('tip', {
        defaultValue: '',
    })
    const intl = useIntl();
    const title = intl.formatMessage({ id: 'min' })
    const loading = intl.formatMessage({ id: 'loading' })
    const error = intl.formatMessage({ id: 'error' })
    const success = intl.formatMessage({ id: 'success' })
    const reload = intl.formatMessage({ id: 'reload' })
    const notice1 = intl.formatMessage({ id: 'notice1' })
    const notice2 = intl.formatMessage({ id: 'notice2' })
    const minNewsUrl = 'https://60s.viki.moe/60s?v2=1'
    const [messageApi, contextHolder] = message.useMessage();
    const [minNews, setMinNews] = useLocalStorageState('minNews', {
        defaultValue: [],
    })
    const [pathname, setPathname] = useLocalStorageState('pathname', {
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
    const getMinNews = async () => {
        try {
            load()
            const response = await axios.get(minNewsUrl)
            if (response.status === 200) {
                setMinNews(response.data.data.news)
                setNewsDate(date)
                setTip(response.data.data.tip)
                succs()
            } else {
                faild()
            }

        } catch (e) {
            faild()
        }
    }
    if (pathname === '/news/min') {
        if (minNews?.length === 0) {
            getMinNews()
        }
    }

    useEffect(() => {
        if (dayjs().isAfter(newsDate, 'day')) {
            getMinNews()
        }
    }, [])

    return (
        <div style={{ textAlign: 'center', backgroundColor: darktheme ? '#1d1d1d' : '#fff' }} ref={pagBodyRef}>
            {contextHolder}
            <List
                header={<h1>{title}<Divider>{notice1}<br />{notice2}</Divider><ShareTool pagBodyRef={pagBodyRef} />{newsDate}</h1>}
                footer={<Typography.Text mark>{minNews?.length > 0 ? tip : null}</Typography.Text>}
                bordered
                dataSource={minNews}
                renderItem={(item) => (
                    <List.Item>
                        {item}
                    </List.Item>
                )}
            >
                {minNews?.length > 0 ? null : <Button onClick={getMinNews}>{reload}</Button>}
            </List>
        </div>
    )
}
export default News