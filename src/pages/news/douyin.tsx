import { useIntl } from '@umijs/max';
import axios from 'axios';
import { useLocalStorageState } from 'ahooks';
import { Button, message, List, Typography, Divider, Row, Col } from 'antd';
import { useEffect } from 'react';
import Reload from './custom/reload';
import NewsList from './custom/newsList';

const Douyin = () => {
    const intl = useIntl();
    const title = intl.formatMessage({ id: 'douyin' })
    const loading = intl.formatMessage({ id: 'loading' })
    const error = intl.formatMessage({ id: 'error' })
    const success = intl.formatMessage({ id: 'success' })
    const reload = intl.formatMessage({ id: 'reload' })
    const notice1 = intl.formatMessage({ id: 'notice1' })
    const notice2 = intl.formatMessage({ id: 'notice2' })
    const douyinNewsUrl = 'https://60s.viki.moe/douyin'
    const [messageApi, contextHolder] = message.useMessage();
    const [douyinNews, setDouyinNews] = useLocalStorageState('douyinNews', {
        listenStorageChange: true
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
    
    const getDouyinNews = async () => {
        load()
        try {
            const response = await axios.get(douyinNewsUrl)
            if (response.status === 200) {
                setDouyinNews(response.data.data)
                succs()
            } else {
                faild()
            }

        } catch (e) {
            faild()
        }
    }
    useEffect(() => {
        if (pathname === '/news/douyin') {
            getDouyinNews()
        }
    }, [pathname])

    return (
        <div style={{ textAlign: 'center', padding: 20 }}>
            {contextHolder}
            <h1>{title}</h1>
            <Divider>{notice1}<br />{notice2}</Divider>
            <div style={{ marginLeft: 25, marginBottom: 20 }}>
                <Row gutter={16}>
                    <Col className="gutter-row" span={3}>
                        <Reload />
                    </Col>
                </Row>
            </div>
            { douyinNews?.length > 0 ? <NewsList news={douyinNews}/> : <Button onClick={getDouyinNews}>{reload}</Button> }
        </div>
    )
}
export default Douyin