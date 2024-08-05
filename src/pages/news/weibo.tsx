import { useIntl } from '@umijs/max';
import axios from 'axios';
import { useLocalStorageState } from 'ahooks';
import { Button, message, List, Typography, Divider, Carousel } from 'antd';
import ShareTool from '@/pages/news/custom/shareTool';
import React, { useRef } from 'react';
import NewsCarousel from '@/pages/news/custom/newsCarousel';

const Weibo = () => {
    const intl = useIntl();
    const pagBodyRef = useRef<HTMLDivElement>(null)
    const title = intl.formatMessage({ id: 'weibo' })
    const loading = intl.formatMessage({ id: 'loading' })
    const error = intl.formatMessage({ id: 'error' })
    const reload = intl.formatMessage({ id: 'reload' })
    const notice1 = intl.formatMessage({ id: 'notice1' })
    const notice2 = intl.formatMessage({ id: 'notice2' })
    const weiboNewsUrl = 'https://60s.viki.moe/weibo'
    const [messageApi, contextHolder] = message.useMessage();
    const [weiboNews, setWeiboNews] = useLocalStorageState('weiboNews', {
        defaultValue: [],
    })
    const [pathname, setPathname] = useLocalStorageState('pathname', {
        listenStorageChange: true,
    })
    
    const getWeiboNews = async () => {
        try {
            messageApi.open({
                type: 'loading',
                content: loading,
                duration: 0,
            });
            setTimeout(messageApi.destroy, 3000)
            const response = await axios.get(weiboNewsUrl)
            if (response.status === 200) {
                setWeiboNews(response.data.data)
                
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
    if (pathname === '/news/weibo') {
        if (weiboNews?.length === 0) {
            messageApi.open({
                type: 'loading',
                content: loading,
                duration: 0,
            });
            setTimeout(messageApi.destroy, 3000)
            getWeiboNews()
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            {contextHolder}
            <List
                header={<h1>{title}<Divider>{notice1}<br />{notice2}</Divider><ShareTool pagBodyRef={pagBodyRef}/></h1>}
                footer={<Typography.Text mark>{ weiboNews?.length > 0 ? '' : error }</Typography.Text>}
                bordered
            >
                { weiboNews?.length > 0 ? <NewsCarousel weiboNews={weiboNews}/> : <Button onClick={getWeiboNews}>{reload}</Button> }
            </List>
        </div>
    )
}
export default Weibo