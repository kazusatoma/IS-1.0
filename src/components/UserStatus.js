import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, notification } from 'antd';
import './Userstatus.css';
import moment from 'moment';
import axios from 'axios';

export default function UserStatus() {

    const navigate = useNavigate()


    useEffect(() => {
        if (JSON.parse(localStorage.getItem("token")).notification === true) {
            openNotification();
        }
        if (JSON.parse(localStorage.getItem("token")).person_role === "Project lead") {
            let date = new Date();
            axios.get('http://localhost:5000/it_issue').then((res) => {
                res.data.map((item) => {
                    if ((moment(item.target_resolution_date).diff(moment(date)) < 0) && item.status === "OPEN" && item.target_resolution_date !== "" && item.target_resolution_date !== undefined) {
                        notification.open({
                            message: 'An Issue had passed its due date',
                            description:
                                `Issue ID ${item.id}`,
                            onClose: () => {
                                axios.patch(`http://localhost:5000/it_issue/${item.id}`, { "status": "CLOSED" })
                            },

                        });
                    }
                })
            })
        }

    }, [])

    const openNotification = () => {
        notification.open({
            message: 'NEW ISSUE!',
            description:
                'You have been assigned a new issue.',
            onClose: () => {
                axios.patch(`http://localhost:5000/it_people/${JSON.parse(localStorage.getItem("token")).id}`, { "notification": false })
                let temp = { ...JSON.parse(localStorage.getItem("token")), notification: false }
                localStorage.setItem("token", JSON.stringify(temp))
            },
        });
    };

    const handleClick = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <span className='userContainer'>
            <span style={{ color: "white", margin: 10 }}>Welcome , {JSON.parse(localStorage.getItem("token")).person_name}</span>
            <Button className="headerButton" onClick={handleClick}>Log out</Button>
        </span>
    )
}
