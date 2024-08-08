import '@/pages/news/custom/newsList/index.less'
import React from 'react';
import { Avatar, List } from 'antd';
import { useLocalStorageState } from 'ahooks';
import NumAvatar from '@/assets/avatar';

const NewsList: React.FC = ({news}) => {
    const [darktheme, setDarkTheme] = useLocalStorageState('darktheme', {
        listenStorageChange: true,
    })
    const [nowUrl, setNowUrl] = useLocalStorageState('nowUrl', {
        listenStorageChange: true,
    })
    const data = Array.from({ length: 50 }).map((_, i) => ({
        href: `https://weibo.com/hot/search`,
        title: news[i].word,
        avatar: news[i].icon ? news[i].icon : <NumAvatar num={i}/>,
    }));

    return (
        <div className='list' style={{ backgroundColor: darktheme ? '#1d1d1d' : '#fff' }}>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                pageSize: 5,
                }}
                dataSource={data}
                renderItem={(item) => (
                <List.Item
                    key={item.title}
                >
                    <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                    />
                </List.Item>
                )}
            />
        </div>
    )
}

export default NewsList