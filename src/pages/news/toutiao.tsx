import { useIntl } from '@umijs/max';
import axios from 'axios';
import { useLocalStorageState } from 'ahooks';
import { Button, message, List, Typography } from 'antd';

const Toutiao = () => {
    const intl = useIntl();
    const title = intl.formatMessage({ id: 'weibo' })
    const toutiaoNewsUrl = 'https://60s.viki.moe/toutiao'
    const [messageApi, contextHolder] = message.useMessage();
    const [toutiaoNews, setToutiaoNews] = useLocalStorageState('toutiaoNews', {
        defaultValue: [],
    })
    const [pathname, setPathname] = useLocalStorageState('pathname', {
        listenStorageChange: true,
    })
    
    const getToutiaoNews = async () => {
        messageApi.open({
            type: 'loading',
            content: '加载中...',
            duration: 0,
        });
        setTimeout(messageApi.destroy, 5000)
        try {
            const response = await axios.get(toutiaoNewsUrl)
            if (response.status === 200) {
                setToutiaoNews(response.data.data.news)
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
    if (pathname === '/news/toutiao') {
        if (toutiaoNews.length === 0) {
            messageApi.open({
                type: 'loading',
                content: '加载中...',
                duration: 0,
            });
            setTimeout(messageApi.destroy, 5000)
            getToutiaoNews()
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            {contextHolder}
            <List
                header={<h1>{title}</h1>}
                footer={<Typography.Text mark>{ toutiaoNews.length > 0 ? '本页面所有数据均来自官方，确保稳定与实时' : '未知错误，请稍后再试' }</Typography.Text>}
                bordered
                dataSource={toutiaoNews}
                renderItem={(item) => (
                    <List.Item>
                      {item}
                    </List.Item>
                )}
            >
                { toutiaoNews.length > 0 ? null : <Button onClick={getToutiaoNews}>点击重试</Button> }
            </List>
        </div>
    )
}
export default Toutiao