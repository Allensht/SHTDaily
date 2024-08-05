import { useIntl } from '@umijs/max';
import axios from 'axios';
import { useLocalStorageState } from 'ahooks';
import { Button, message, List, Typography, Divider } from 'antd';
import dayjs from 'dayjs'
import { useEffect, useRef } from 'react';
import ShareTool from '@/pages/news/custom/shareTool';

const News = () => {
    const [darktheme, setDarkTheme] = useLocalStorageState('darktheme', {
        listenStorageChange: true,
    })
    const pagBodyRef = useRef<HTMLDivElement>(null)
    const date = dayjs().format('YYYY-MM-DD')
    const [newsDate, setNewsDate] = useLocalStorageState('newsDate', {
        defaultValue: '',
    })
    const intl = useIntl();
    const title = intl.formatMessage({ id: 'min' })
    const loading = intl.formatMessage({ id: 'loading' })
    const error = intl.formatMessage({ id: 'error' })
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
    const getMinNews = async () => {
        try {
            messageApi.open({
                type: 'loading',
                content: loading,
                duration: 0,
            });
            setTimeout(messageApi.destroy, 3000)
            const response = await axios.get(minNewsUrl)
            if (response.status === 200) {
                setMinNews(response.data.data.news)
                setNewsDate(date)
                
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
    if (pathname === '/news/min') {
        if (minNews?.length === 0) {
            messageApi.open({
                type: 'loading',
                content: loading,
                duration: 0,
            });
            setTimeout(messageApi.destroy, 3000)
            getMinNews()
            
        }
    }

    useEffect(() => {
        if (dayjs().isAfter(newsDate, 'day')) {
            getMinNews()
        } 
    }, [])

    return (
        <div style={{ textAlign: 'center', backgroundColor: darktheme ? '#141414' : '#fff'}} ref={pagBodyRef}>
            {contextHolder}
            <List
                header={<h1>{title}<Divider>{notice1}<br />{notice2}</Divider><ShareTool pagBodyRef={pagBodyRef}/>{newsDate}</h1>}
                footer={<Typography.Text mark>{ minNews?.length > 0 ? '' : error }</Typography.Text>}
                bordered
                dataSource={minNews}
                renderItem={(item) => (
                    <List.Item>
                      {item}
                    </List.Item>
                )}
            >
                { minNews?.length > 0 ? null : <Button onClick={getMinNews}>{reload}</Button> }
            </List>
        </div>
    )
}
export default News