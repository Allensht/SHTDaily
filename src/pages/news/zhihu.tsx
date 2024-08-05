import { useIntl } from '@umijs/max';
import axios from 'axios';
import { useLocalStorageState } from 'ahooks';
import { Button, message, List, Typography } from 'antd';

const Zhihu = () => {
    const intl = useIntl();
    const title = intl.formatMessage({ id: 'zhihu' })
    const zhihuNewsUrl = 'https://60s.viki.moe/zhihu'
    const [messageApi, contextHolder] = message.useMessage();
    const [zhihuNews, setZhihuNews] = useLocalStorageState('zhihuNews', {
        defaultValue: [],
    })
    const [pathname, setPathname] = useLocalStorageState('pathname', {
        listenStorageChange: true,
    })
    
    const getZhihuNews = async () => {
        messageApi.open({
            type: 'loading',
            content: '加载中...',
            duration: 0,
        });
        setTimeout(messageApi.destroy, 5000)
        try {
            const response = await axios.get(zhihuNewsUrl)
            if (response.status === 200) {
                setZhihuNews(response.data.data.news)
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
        if (zhihuNews.length === 0) {
            getZhihuNews()
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            {contextHolder}
            <List
                header={<h1>{title}</h1>}
                footer={<Typography.Text mark>{ zhihuNews.length > 0 ? '本页面所有数据均来自官方，确保稳定与实时' : '未知错误，请稍后再试' }</Typography.Text>}
                bordered
                dataSource={zhihuNews}
                renderItem={(item) => (
                    <List.Item>
                      {item}
                    </List.Item>
                )}
            >
                { zhihuNews.length > 0 ? null : <Button onClick={getZhihuNews}>点击重试</Button> }
            </List>
        </div>
    )
}
export default Zhihu