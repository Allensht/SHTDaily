import '@/pages/news/custom/newsList/index.less'
import React, { useEffect, useState } from 'react';
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
    const data = Array.from({ length: news?.length }).map((_, i) => {
        if (nowUrl === 'https://60s.viki.moe/bili') {
            return {
                href: `https://weibo.com/hot/search`,
                title: news[i].keyword,
                avatar: <NumAvatar num={i}/>,
            }
        } else if (nowUrl === 'https://60s.viki.moe/douyin') {
            return {
                href: `https://weibo.com/hot/search`,
                title: news[i].query ? news[i].query : news[i].word,
                avatar: news[i].icon ? news[i].icon : <NumAvatar num={i}/>,
                cover: news[i].cover,
            }
        } else {
            return {
                href: `https://weibo.com/hot/search`,
                title: news[i].query ? news[i].query : news[i].word,
                avatar: news[i].icon ? news[i].icon : <NumAvatar num={i}/>,
            }
        }
    })
    // TODO 添加抖音Cover
    
    return (
        <div className='list' style={{ backgroundColor: darktheme ? '#1d1d1d' : '#fff' }}>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                pageSize: nowUrl === 'https://60s.viki.moe/douyin' ? 1 : 5,
                }}
                dataSource={data}
                renderItem={(item) => (
                <List.Item
                    key={item.title}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                    />
                    {nowUrl === 'https://60s.viki.moe/douyin' ? <img src={item.cover} alt="" style={{ width: '300px', height: '500px' }} /> : null} 
                </List.Item>
                )}
            />
        </div>
    )
}

export default NewsList