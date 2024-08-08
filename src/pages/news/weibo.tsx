import { useIntl } from '@umijs/max';
import axios from 'axios';
import { useLocalStorageState } from 'ahooks';
import { Button, message, Divider, Row, Col } from 'antd';
import NewsList from '@/pages/news/custom/newsList';
import Reload from '@/pages/news/custom/reload';

const Weibo = () => {
    const intl = useIntl();
    const title = intl.formatMessage({ id: 'weibo' })
    const loading = intl.formatMessage({ id: 'loading' })
    const error = intl.formatMessage({ id: 'error' })
    const reload = intl.formatMessage({ id: 'reload' })
    const notice1 = intl.formatMessage({ id: 'notice1' })
    const notice2 = intl.formatMessage({ id: 'notice2' })
    const weiboNewsUrl = 'https://60s.viki.moe/weibo'
    const [messageApi, contextHolder] = message.useMessage();
    const [weiboNews, setWeiboNews] = useLocalStorageState('weiboNews', {
        listenStorageChange: true
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
            { weiboNews?.length > 0 ? <NewsList news={weiboNews}/> : <Button onClick={getWeiboNews}>{reload}</Button> }
        </div>
    )
}
export default Weibo