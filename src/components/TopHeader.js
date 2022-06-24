import { Button, Layout } from 'antd';
import { Link } from 'react-router-dom'
import React from 'react'
import "./TopHeader.css"

const { Header } = Layout;

export default function TopHeader(props) {

  const handleClick = () => {
    localStorage.removeItem("token");
  }
  
  return (
    <Header>
      <div className="header-text">Issue tracker 1.0
        <Link to="/login" replace><Button className="headerButton" onClick={handleClick}>Log out</Button></Link>
      </div>
    </Header>
  )
}
