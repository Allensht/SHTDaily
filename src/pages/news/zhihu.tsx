import { useIntl } from '@umijs/max';
import axios from 'axios';
import { useLocalStorageState } from 'ahooks';
import { Button, message, List, Typography, Divider, Row } from 'antd';
import Reload from './custom/reload';

const Zhihu = () => {
    const intl = useIntl();
    const title = intl.formatMessage({ id: 'zhihu' })
    const loading = intl.formatMessage({ id: 'loading' })
    const error = intl.formatMessage({ id: 'error' })
    const reload = intl.formatMessage({ id: 'reload' })
    const notice1 = intl.formatMessage({ id: 'notice1' })
    const notice2 = intl.formatMessage({ id: 'notice2' })
    const zhihuNewsUrl = 'https://60s.viki.moe/zhihu'
    const [messageApi, contextHolder] = message.useMessage();
    const [zhihuNews, setZhihuNews] = useLocalStorageState('zhihuNews', {
        listenStorageChange: true
    })
    const [pathname, setPathname] = useLocalStorageState('pathname', {
        listenStorageChange: true,
    })
    
    const getZhihuNews = async () => {
        messageApi.open({
            type: 'loading',
            content: loading,
            duration: 0,
        });
        setTimeout(messageApi.destroy, 3000)
        try {
            const response = await axios.get(zhihuNewsUrl)
            if (response.status === 200) {
                setZhihuNews(response.data.data)
            } else {
                messageApi.open({
                    type: 'error',
                    content: '未知错误，请稍后再试',
                });
            }

        } catch (e) {
            messageApi.open({
                type: 'error',
                content: '未知错误，请稍后再试',
            });
        }
    }
    if (pathname === '/news/zhihu') {
        if (zhihuNews?.length === 0) {
            messageApi.open({
                type: 'loading',
                content: loading,
                duration: 0,
            });
            setTimeout(messageApi.destroy, 3000)
            getZhihuNews()
        }
    }

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
            { zhihuNews?.length > 0 ? <NewsList news={zhihuNews}/> : <Button onClick={getZhihuNews}>{reload}</Button> }
        </div>
    )
}
export default Zhihu