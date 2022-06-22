import {Layout} from 'antd';
import React from 'react'
import "./TopHeader.css"

const { Header } = Layout;

export default function TopHeader() {
  return (
    <Header><div className="header-text">Issue tracker 1.0</div></Header>
  )
}
