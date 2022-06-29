import { Tag, Descriptions, Button, Modal, DatePicker, Form, Input, Spin, Select, } from 'antd';
import React, { useState, useEffect } from 'react'
import { useLocation, Navigate } from 'react-router-dom';
import moment from 'moment'
import axios from 'axios'

export default function IssueDetails() {
    const myProps = useLocation();
    const [myData, setData] = useState(['']);
    const [myProject, setProject] = useState([]);
    const [myUsers, setUsers] = useState([]);
    const [mySwitch, setSwitch] = useState(false);
    const [form] = Form.useForm();
    const { Option } = Select;
    const [visible, setVisible] = useState(false);
    const [Role, setRole] = useState();
    const colorList = [
        { project: 1, color: "red" },
        { project: 2, color: "orange" },
        { project: 3, color: "yellow" },
        { project: 4, color: "green" },
        { project: 5, color: "azure" },
        { project: 6, color: "blue" },
        { project: 7, color: "purple" },
    ]

    useEffect(() => {
        axios.get(`http://localhost:5000/it_issue?id=${myProps.state}`).then(
            res => {
                setData(res.data)
                setRole(JSON.parse(localStorage.getItem("token")).person_role)
            }
        )
        axios.get(`http://localhost:5000/it_projects`).then(
            res => {
                setProject(res.data)
            }
        )
        axios.get(`http://localhost:5000/it_people`).then(
            res => {
                setUsers(res.data)
            }
        )
    }, [myProps.state])

    const handleDelete = (item) => {
        setSwitch(!mySwitch)
        axios.delete(`http://localhost:5000/it_issue/${myData[0].id}`).then(
            setData(myData.filter(data => data.id !== myData[0].id))).catch
            (err => {
                console.log(err)
            })
    }

    const showModal = () => {
        setVisible(true);
    }

    const onCreate = (values) => {
        var date = new Date();
        var mycolor = colorList.filter((item) => {
            return item.project === values.related_project
        })
        axios.patch(`http://localhost:5000/it_issue/${myData[0].id}`, {
            "issue_summary": values.issue_summary,
            "issue_description": values.issue_description,
            "identified_by_person_id": values.identified_by_person_id,
            "identified_date": values.identified_date,
            "related_project": values.related_project,
            "assigned_to": values.assigned_to,
            "status": values.status,
            "priority": values.priority,
            "target_resolution_date": values.target_resolution_date,
            "progress": values.progress,
            "actual_resolution_date": values.actual_resolution_date,
            "resolution_summary": values.resolution_summary,
            "modified_on": date,
            "modified_by": JSON.parse(localStorage.getItem("token")).person_name,
            "color": mycolor[0].color
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
                form.resetFields();
                onCreate(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }

    const handleClick = () => {
        showModal();
        form.setFieldsValue({
            project_name: myData[0].project_name,
            issue_summary: myData[0].issue_summary,
            issue_description: myData[0].issue_description,
            identified_by_person_id: myData[0].identified_by_person_id,
            identified_date: moment((myData[0].identified_date)),
            target_resolution_date: moment((myData[0].target_resolution_date)),
            actual_resolution_date: moment((myData[0].actual_resolution_date)),
            related_project: myData[0].related_project,
            assigned_to: myData[0].assigned_to,
            priority: myData[0].assigned_to,
            progress: myData[0].progress,
            resolution_summary: myData[0].resolution_summary,
            status: myData[0].status
        })
    }


    return (
        <div>
            {mySwitch ? <Navigate to="/home/issue" /> :
                <div>
                    <Descriptions layout="vertical" bordered column={2}>
                        <Descriptions.Item label="Issue ID">{myData[0] ? myData[0].id : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Issue summary" span={1}>{myData[0] ? myData[0].issue_summary : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Issue description">{myData[0] ? myData[0].issue_description : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Identified by person id">{myData[0] ? myData[0].identified_by_person_id : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Identified date">{myData[0] ? myData[0].identified_date : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Related project">{myData[0] ? myData[0].related_project : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Assigned to ">{myData[0] ? myData[0].assigned_to : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Progress">{myData[0] ? myData[0].progress : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Priority">{myData[0] ? myData[0].priority : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Target resolution date">{myData[0] ? myData[0].target_resolution_date : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Actual resolution date">{myData[0] ? myData[0].actual_resolution_date : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Resolution summary">{myData[0] ? myData[0].resolution_summary : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Created on">{myData[0] ? myData[0].created_on : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Created by">{myData[0] ? myData[0].created_by : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Modified on">{myData[0] ? myData[0].modified_on : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Modified by">{myData[0] ? myData[0].modified_by : <Spin />}</Descriptions.Item>
                        <Descriptions.Item label="Status">
                            {myData[0].status === 'OPEN' ? <Tag color="green">{myData[0].status}</Tag> : <Tag color="red">{myData[0].status}</Tag>}
                        </Descriptions.Item>
                    </Descriptions>
                    <Button style={{ margin: 10 }} onClick={handleClick} disabled={!((Role === "Project lead") || (myData[0].assigned_to === JSON.parse(localStorage.getItem("token")).id))}>Edit</Button>
                    <Button danger onClick={() => handleDelete()} disabled={!((Role === "Project lead") || (myData[0].assigned_to === JSON.parse(localStorage.getItem("token")).id))}>delete</Button>

                    <Modal
                        visible={visible}
                        title="Edit this issue"
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
                                name="identified_by_person_id"
                                label="Identified by person ID"
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
                                >
                                    {myUsers.map((item) => {
                                        return <Option key={myUsers.indexOf(item)} value={item.id}>{item.id}</Option>
                                    })}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="identified_date"
                                label="Identified date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                name="related_project"
                                label="Related project"
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
                                >
                                    {myProject.map((item) => {
                                        return <Option key={myProject.indexOf(item)} value={item.id}>{item.id}</Option>
                                    })}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="assigned_to"
                                label="Assigned to"
                            >
                                <Select
                                    style={{
                                        width: 120,
                                    }}
                                >
                                    {myUsers.map((item) => {
                                        return <Option key={myUsers.indexOf(item)} value={item.id}>{item.id}</Option>
                                    })}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="issue_summary"
                                label="Issue Summary"
                            >
                                <Input.TextArea showCount allowClear />
                            </Form.Item>

                            <Form.Item
                                name="issue_description"
                                label="Issue Description"
                            >
                                <Input.TextArea showCount allowClear />
                            </Form.Item>

                            <Form.Item
                                name="priority"
                                label="Priority"
                            >
                                <Input allowClear />
                            </Form.Item>

                            <Form.Item
                                name="progress"
                                label="Progress"
                            >
                                <Input allowClear />
                            </Form.Item>

                            <Form.Item
                                name="target_resolution_date"
                                label="Target resolution date"
                            >
                                <DatePicker />
                            </Form.Item>


                            <Form.Item
                                name="actual_resolution_date"
                                label="Actual resolution date"
                            >
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                name="resolution_summary"
                                label="Resolution summary"
                            >
                                <Input allowClear />
                            </Form.Item>

                            <Form.Item
                                name="status"
                                label="Status"
                            >
                                <Select
                                    style={{
                                        width: 120,
                                    }}
                                >
                                    <Option value="OPEN">OPEN</Option>
                                    <Option value="CLOSED">CLOSED</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>}
        </div>
    )
}
