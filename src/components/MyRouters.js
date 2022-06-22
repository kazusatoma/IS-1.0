import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from '../pages/Sandbox/Home/Home';
import Dashboard from '../pages/Sandbox/Home/Dashboard/Dashboard';
import Projects from '../pages/Sandbox/Home/Projects/Projects';
import ProjectDetails from '../pages/Sandbox/Home/Projects/ProjectDetails/ProjectDetails';
import Issues from '../pages/Sandbox/Home/Issues/Issues';
import Users from '../pages/Sandbox/Home/Users/Users';
import IssueDetails from '../pages/Sandbox/Home/Issues/IssueDetails/IssueDetails';
import UserInfo from '../pages/Sandbox/Home/Users/UserInfo/UserInfo';
import './MyRouter.css'

export default function MyRouters() {
    return (
        <div className="site-layout-content">
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/home/dashboard' element={<Dashboard />} />
                <Route path='/home/projects' element={<Projects />} />
                <Route path='/home/projects/projectsDetails' element={<ProjectDetails />}/>
                <Route path='/home/issue' element={<Issues />}/>
                <Route path='/home/issue/issueDetails' element={<IssueDetails />}/>
                <Route path='/home/users' element={<Users />}/>
                <Route path='/home/users/UserInfo' element={<UserInfo />}/>
                <Route path='/' element={<Navigate to='/home' />} />
            </Routes>
        </div>
    )
}
