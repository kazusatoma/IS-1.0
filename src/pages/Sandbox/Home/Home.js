import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd';
import './Home.css'

const { Meta } = Card;


export default function Home() {
  return (
    <div className='card'>
        <Link to='dashboard'>
            <Card
                hoverable
                style={{
                width: 240,
                float:'left',
                marginRight:'50px'
                }}
                cover={<img alt="dashboard" src="https://n.sinaimg.cn/sinakd20122/600/w1500h1500/20210602/77a1-kquziik5972543.jpg" />}
            >
                <Meta title="Dashboard"/>
            </Card>
        </Link>
        <Link to='projects'>
            <Card
                hoverable
                style={{
                width: 240,
                float:'left',
                marginRight:'50px'
                }}
                cover={<img alt="projects" src="https://n.sinaimg.cn/sinakd20122/600/w1500h1500/20210602/9377-kquziik5962291.jpg" />}
            >
                <Meta title="Projects"/>
            </Card>
        </Link>
        <Link to='issue'>
            <Card
                hoverable
                style={{
                width: 240,
                float:'left',
                marginRight:'50px'
                }}
                cover={<img alt="issue" src="https://n.sinaimg.cn/sinakd20122/600/w1500h1500/20210602/3bb5-kquziik5972475.jpg" />}
            >
                <Meta title="Issues"/>
            </Card>
        </Link>
        <Link to='users'>
            <Card
                hoverable
                style={{
                width: 240,
                float:'left',
                marginRight:'50px'
                }}
                cover={<img alt="users" src="https://n.sinaimg.cn/sinakd20122/600/w1500h1500/20210602/ade1-kquziik5972831.jpg" />}
            >
                <Meta title="Users"/>
            </Card>
        </Link>
        <Link to='reports'>
            <Card
                hoverable
                style={{
                width: 240,
                float:'left',
                marginRight:'50px'
                }}
                cover={<img alt="reports" src="https://n.sinaimg.cn/sinakd20122/600/w1500h1500/20210602/5a3c-kquziik5972915.jpg" />}
            >
                <Meta title="Reports"/>
            </Card>
        </Link>
    </div>
  )
}
