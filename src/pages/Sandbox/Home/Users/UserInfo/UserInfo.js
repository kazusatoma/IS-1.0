import { Descriptions, Button, Modal, Select, Form, Input, Spin } from 'antd';
import React, { useState, useEffect } from 'react'
import { useLocation, Navigate } from 'react-router-dom';
import axios from 'axios'

export default function ProjectDetails() {

    const myProps = useLocation();
    const [myData, setData] = useState(['']);
    const [myProject, setProject] = useState([''])
    const [mySwitch, setSwitch] = useState(false);
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const { Option } = Select;
    const roleList = ["Manager", "Project lead", "Member"]

    useEffect(() => {
        axios.get(`http://localhost:5000/it_people?id=${myProps.state}`).then(
            res => {
                setData(res.data)
            }
        )
        axios.get(`http://localhost:5000/it_projects`).then(
            res => {
                setProject(res.data)
            }
        )
    }, [myProps.state])

    const handleDelete = (item) => {
        setSwitch(!mySwitch)
        axios.delete(`http://localhost:5000/it_people/${myData[0].id}`).then(
            setData(myData.filter(data => data.id !== myData[0].id))).catch
            (err => {
                console.log(err)
            })
    }
    
    const handleClick = () => {
        showModal();
        form.setFieldsValue({
            person_name: myData[0].person_name,
            person_email: myData[0].person_email,
            username: myData[0].username,
            person_role: myData[0].person_role,
            password: myData[0].password,
            assigned_project: myData[0].assigned_project,
        })
    }

    const showModal = () => {
        setVisible(true);
    }

    const onCreate = (values) => {
        var date = new Date();
        axios.patch(`http://localhost:5000/it_people/${myData[0].id}`, {
            "person_name": values.person_name,
            "person_email": values.person_email,
            "person_role": values.person_role,
            "username": values.username,
            "password": values.password,
            "assigned_project": values.assigned_project,
            "created_on": date,
            "created_by": "",
            "modified_on": date,
            "modified_by": ""
        }).then(
            res => {
                setData([res.data])
            }).catch(err => {
                console.log(err)
            })
        setVisible(false);
    };

    const handleOK = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields()
                onCreate(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }

    return (
        <div>
            {mySwitch ? <Navigate to="/home/users" /> :
                <div>
                    <Descriptions layout="vertical" bordered column={2}>
                        <Descriptions.Item label="User's ID">{myData[0] ? myData[0].id : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Name">{myData[0] ? myData[0].person_name : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Email">{myData[0] ? myData[0].person_email : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Role">{myData[0] ? myData[0].person_role : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Username">{myData[0] ? myData[0].username : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Password">{myData[0] ? myData[0].password : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Assigned project">{myData[0] ? myData[0].assigned_project : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Created on">{myData[0] ? myData[0].created_on : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Created by">{myData[0] ? myData[0].created_by : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Modified on">{myData[0] ? myData[0].modified_on : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Modified by">{myData[0] ? myData[0].modified_by : <Spin />}</Descriptions.Item>
                    </Descriptions>
                    <Button style={{ margin: 10 }} onClick={handleClick}>Edit</Button>
                    <Button danger onClick={() => handleDelete()}>delete</Button>
                    <Modal
                        visible={visible}
                        title="Edit this project"
                        okText="Edit"
                        cancelText="Cancel"
                        onCancel={() => {
                            setVisible(false)
                        }}
                        onOk={() => handleOK()}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                        >
                            <Form.Item
                                name="person_name"
                                label="person_name"
                            >
                                <Input allowClear />
                            </Form.Item>

                            <Form.Item
                                name="person_email"
                                label="person_email"
                            >
                                <Input allowClear />
                            </Form.Item>

                            <Form.Item
                                name="person_role"
                                label="person_role"
                            >
                                <Select
                                    style={{
                                        width: 120,
                                    }}
                                >
                                    {roleList.map((role) => {
                                        return <Option key={roleList.indexOf(role)} value={role}>{role}</Option>
                                    })}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="username"
                                label="username"
                            >
                                <Input allowClear/>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="password"
                            >
                                <Input allowClear />
                            </Form.Item>

                            <Form.Item
                                name="assigned_project"
                                label="assigned_project"
                            >
                                <Select
                                    style={{
                                        width: 120,
                                    }}
                                >
                                    {myProject.map((item) => {
                                        return <Option key={myProject.indexOf(item)} value={item.id}>{item.id}</Option>
                                    })}
                                </Select>
                            </Form.Item>

                        </Form>
                    </Modal>
                </div>}
        </div>
    )
}