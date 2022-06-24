import { Button, Layout } from 'antd';
import React from 'react'
import "./TopHeader.css"

const { Header } = Layout;

export default function TopHeader() {

  const handleClick = () => {

  }
  
  return (
    <Header>
      <div className="header-text">Issue tracker 1.0
        <Button className='headerButton' onClick={handleClick}>Log out</Button>
      </div>
    </Header>
  )
}
