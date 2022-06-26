import { Layout } from 'antd';
import React from 'react'
import UserStatus from './UserStatus';
import "./TopHeader.css"

const { Header } = Layout;

export default function TopHeader(props) {
  return (
    <Header>
      <span className="header-text">Issue tracker 1.0</span>
      <UserStatus/>
    </Header>
  )
}
