import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd';

const { Meta } = Card;


export default function Home() {
  return (
    <div className='card'>
        <Link to='issueSummary'>
            <Card
                hoverable
                style={{
                width: 240,
                float:'left',
                marginRight:'50px'
                }}
                cover={<img alt="issueSummary" src="https://n.sinaimg.cn/sinakd20120/0/w1600h1600/20200804/d343-ixeeisa2521352.jpg" />}
            >
                <Meta title="Issue summary"/>
            </Card>
        </Link>
        <Link to='averageDaysResolve'>
            <Card
                hoverable
                style={{
                width: 240,
                float:'left',
                marginRight:'50px'
                }}
                cover={<img alt="averageDaysResolve" src="https://n.sinaimg.cn/sinakd20120/0/w1600h1600/20200804/1579-ixeeisa2521059.jpg" />}
            >
                <Meta title="Average days to resolve"/>
            </Card>
        </Link>
        <Link to='targetResolutionDates'>
            <Card
                hoverable
                style={{
                width: 240,
                float:'left',
                marginRight:'50px'
                }}
                cover={<img alt="targetResolutionDates" src="https://n.sinaimg.cn/sinakd20120/0/w1600h1600/20200804/1ea3-ixeeisa2521911.jpg" />}
            >
                <Meta title="Target resolution dates"/>
            </Card>
        </Link>
    </div>
  )
}