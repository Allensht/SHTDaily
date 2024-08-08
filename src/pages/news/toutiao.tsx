import { useIntl } from '@umijs/max';
import axios from 'axios';
import { useLocalStorageState } from 'ahooks';
import { Button, message, Divider, Row, Col } from 'antd';
import NewsList from '@/pages/news/custom/newsList';
import Reload from '@/pages/news/custom/reload';

const Toutiao = () => {
    const intl = useIntl();
    const title = intl.formatMessage({ id: 'toutiao' })
    const loading = intl.formatMessage({ id: 'loading' })
    const error = intl.formatMessage({ id: 'error' })
    const reload = intl.formatMessage({ id: 'reload' })
    const notice1 = intl.formatMessage({ id: 'notice1' })
    const notice2 = intl.formatMessage({ id: 'notice2' })
    const toutiaoNewsUrl = 'https://60s.viki.moe/toutiao'
    const [messageApi, contextHolder] = message.useMessage();
    const [toutiaoNews, setToutiaoNews] = useLocalStorageState('toutiaoNews', {
        listenStorageChange: true
    })
    const [pathname, setPathname] = useLocalStorageState('pathname', {
        listenStorageChange: true,
    })
    
    const getToutiaoNews = async () => {
        try {
            messageApi.open({
                type: 'loading',
                content: loading,
                duration: 0,
            });
            setTimeout(messageApi.destroy, 3000)
            const response = await axios.get(toutiaoNewsUrl)
            if (response.status === 200) {
                setToutiaoNews(response.data.data)
            } else {
                messageApi.open({
                    type: 'error',
                    content: '未知错误，请稍后再试',
                });
            }

        } catch (e) {
            messageApi.open({
                type: 'error',
                content: error,
            });
        }
    }
    if (pathname === '/news/toutiao') {
        if (toutiaoNews?.length === 0) {
            messageApi.open({
                type: 'loading',
                content: loading,
                duration: 0,
            });
            setTimeout(messageApi.destroy, 3000)
            getToutiaoNews()
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
            { toutiaoNews?.length > 0 ? <NewsList news={toutiaoNews}/> : <Button onClick={getToutiaoNews}>{reload}</Button> }
        </div>
    )
}
export default Toutiao