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
                cover={<img alt="dashboard" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
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
                cover={<img alt="projects" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
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
                cover={<img alt="issue" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
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
                cover={<img alt="users" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <Meta title="Users"/>
            </Card>
        </Link>
    </div>
  )
}
