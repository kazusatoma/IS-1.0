import { Breadcrumb, Layout} from 'antd';
import React from 'react';
import TopHeader from "../../components/TopHeader"
import {useLocation,Link} from "react-router-dom";
import "./Sandbox.css"
import MyRouters from '../../components/MyRouters';

const {Content,Footer} = Layout

const breadcrumbNameMap = {
  '/home':'Home',
  '/home/dashboard': 'Dashboard',
  '/home/projects': 'Projects',
  '/home/projects/projectsDetails': 'Project details',
  '/home/issue':'Issues',
  '/home/issue/issueDetails':'Issue details',
  '/home/users':'Users',
  '/home/users/UserInfo':'User informations'
};

export default function Sandbox() {
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
      <Breadcrumb.Item key="home"/>,
    ].concat(extraBreadcrumbItems);

  return(
    <Layout className="layout">
      <TopHeader/>
      <div className='breadcrumb'>
        <Breadcrumb style={{marginLeft:'10px'}} separator=">">{breadcrumbItems}</Breadcrumb>
      </div>
      <Content style={{ padding: '0 50px' }}>
        <MyRouters/>
      </Content>
      <Footer style={{ textAlign: 'center',height: '125px'}}>Issue tracker 1.0</Footer>
    </Layout>
  )
};