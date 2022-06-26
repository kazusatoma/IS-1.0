import React from 'react'
import {  useNavigate } from 'react-router-dom'
import { Button, } from 'antd';
import './Userstatus.css'

export default function UserStatus() {

    const navigate = useNavigate()

    const handleClick = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <span className='userContainer'>
            <span style={{color:"white", margin:10}}>Welcome , {JSON.parse(localStorage.getItem("token")).person_name}</span>
            <Button className="headerButton" onClick={handleClick}>Log out</Button>
        </span>
    )
}
