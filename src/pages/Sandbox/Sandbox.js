import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import TopHeader from "../../components/TopHeader"
import { useLocation, Link ,useNavigate  } from "react-router-dom";
import "./Sandbox.css"
import MyRouters from '../../components/MyRouters';

const { Content, Footer } = Layout

const items = [
  {
    label: 'Dashboard',
    key: 'dashboard',
  },
  {
    label: 'Projects',
    key: 'projects',
  },
  {
    label: 'Issue',
    key: 'issue',
  },
  {
    label: 'Users',
    key: 'users',
  },
];

const breadcrumbNameMap = {
  '/home': 'Home',
  '/home/dashboard': 'Dashboard',
  '/home/projects': 'Projects',
  '/home/projects/projectsDetails': 'Project details',
  '/home/issue': 'Issues',
  '/home/issue/issueDetails': 'Issue details',
  '/home/users': 'Users',
  '/home/users/UserInfo': 'User informations'
};

export default function Sandbox() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home" />,
  ].concat(extraBreadcrumbItems);

  const handleClick = (value) => {
    navigate(`/home/${value.key}`)
  }

  return (
    <Layout className="layout">
      <TopHeader />
      <div className='breadcrumb'>
        <Breadcrumb style={{ margin: '10px', float: "left"}} separator=">">{breadcrumbItems}</Breadcrumb>
        <Menu onClick={(value) => handleClick(value)} mode="horizontal" items={items} style={{ float: "right",width:350}} />
      </div>
      <Content style={{ padding: '0 50px' }}>
        <MyRouters />
      </Content>
      <Footer style={{ textAlign: 'center', height: 'auto' }}>Issue tracker 1.0</Footer>
    </Layout>
  )
};