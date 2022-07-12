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
    const [checkRole, setRole] = useState()
    const [selectingRole, setSelectingRole] = useState()

    useEffect(() => {
        axios.get(`http://localhost:5000/it_people?id=${myProps.state}`).then(
            res => {
                setData(res.data)
                setRole(JSON.parse(localStorage.getItem("token")).person_role === "Manager")
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
        setSelectingRole(myData[0].person_role === "Manager"?true:false)
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
            "modified_on": date,
            "modified_by": JSON.parse(localStorage.getItem("token")).person_name
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

    const handleChange = (value) => {
        setSelectingRole(value === "Manager")
        if (value === "Manager") {
            form.setFieldsValue({
                assigned_project: "",
            })
        }
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
                    <Button style={{ margin: 10 }} onClick={handleClick} disabled={!checkRole}>Edit</Button>
                    <Button danger onClick={() => handleDelete()} disabled={!checkRole}>delete</Button>
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
                                rules={[
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>

                            <Form.Item
                                name="person_email"
                                label="person_email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>

                            <Form.Item
                                name="person_role"
                                label="person_role"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ]}
                            >
                                <Select
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={(value) => handleChange(value)}
                                >
                                    {roleList.map((role) => {
                                        return <Option key={roleList.indexOf(role)} value={role}>{role}</Option>
                                    })}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="username"
                                label="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>

                            <Form.Item
                                name="assigned_project"
                                label="assigned_project"
                                rules={[
                                    {
                                        required: !selectingRole,
                                        message: 'Required',
                                    },
                                ]}
                            >
                                <Select
                                    style={{
                                        width: 120,
                                    }}
                                    disabled={selectingRole}
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