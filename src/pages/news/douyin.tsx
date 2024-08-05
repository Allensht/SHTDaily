import { useIntl } from '@umijs/max';
import axios from 'axios';
import { useLocalStorageState } from 'ahooks';
import { Button, message, List, Typography } from 'antd';

const Douyin = () => {
    const intl = useIntl();
    const title = intl.formatMessage({ id: 'douyin' })
    const douyinNewsUrl = 'https://60s.viki.moe/douyin'
    const [messageApi, contextHolder] = message.useMessage();
    const [douyinNews, setDouyinNews] = useLocalStorageState('douyinNews', {
        defaultValue: [],
    })
    const [pathname, setPathname] = useLocalStorageState('pathname', {
        listenStorageChange: true,
    })
    
    const getDouyinNews = async () => {
        messageApi.open({
            type: 'loading',
            content: '加载中...',
            duration: 0,
        });
        setTimeout(messageApi.destroy, 5000)
        try {
            const response = await axios.get(douyinNewsUrl)
            if (response.status === 200) {
                setDouyinNews(response.data.data.news)
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
        if (douyinNews.length === 0) {
            messageApi.open({
                type: 'loading',
                content: '加载中...',
                duration: 0,
            });
            setTimeout(messageApi.destroy, 5000)
            getDouyinNews()
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            {contextHolder}
            <List
                header={<h1>{title}</h1>}
                footer={<Typography.Text mark>{ douyinNews.length > 0 ? '本页面所有数据均来自官方，确保稳定与实时' : '未知错误，请稍后再试' }</Typography.Text>}
                bordered
                dataSource={douyinNews}
                renderItem={(item) => (
                    <List.Item>
                      {item}
                    </List.Item>
                )}
            >
                { douyinNews.length > 0 ? null : <Button onClick={getDouyinNews}>点击重试</Button> }
            </List>
        </div>
    )
}
export default Douyin