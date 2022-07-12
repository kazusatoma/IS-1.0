import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Select, Table } from 'antd';

export default function IssueSummary() {

    const [datasource, setDatasource] = useState([]);
    const [myProject, setProject] = useState([]);
    const [currentSelectingProject, setCurrentProject] = useState([]);
    const { Option } = Select;
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'priority',
            dataIndex: 'priority',
        },
        {
            title: 'progress',
            dataIndex: 'progress',
        },
        {
            title: 'assigned_to',
            dataIndex: 'assigned_to',
        },

        {
            title: 'issue_description',
            dataIndex: 'issue_description',
        },
        {
            title: 'issue_summary',
            dataIndex: 'issue_summary',
        },
        {
            title: '"created_on"',
            dataIndex: 'created_on',
        },
        {
            title: 'created_by',
            dataIndex: 'created_by',
        },
        {
            title: 'identified_by_person_id',
            dataIndex: 'identified_by_person_id',
        },
        {
            title: 'identified_date',
            dataIndex: 'identified_date',
        },
    ]

    useEffect(() => {
        axios.get(" http://localhost:5000/it_issue").then(
            res => {
                setDatasource(res.data)
                setCurrentProject(res.data)
            }
        )
        axios.get(`http://localhost:5000/it_projects`).then(
            res => {
                setProject(res.data)
            }
        )
    }, [])

    const handleChange = (value) => {
        console.log(value)
        if (value === "All") {
            setCurrentProject(datasource)
        }
        else {
            let temp = []
            datasource.map((item) => {
                if (item.related_project === value) {
                    temp = [...temp, item]
                }
            })
            setCurrentProject(temp)
        }
    }

    return (
        <div>
            <span style={{margin:15}}>project ID</span>
            <Select
                style={{
                    width: 120,
                }}
                onChange={(value) => handleChange(value)}
                defaultValue={"All"}
            >
                <Option value={"All"}>All</Option>
                {myProject.map((item) => {
                    return <Option key={myProject.indexOf(item)} value={item.id}>{item.id}</Option>
                })}
            </Select>
            <Table style={{ margin: '0px 10px' }} dataSource={currentSelectingProject} columns={columns} rowKey="id"></Table>
        </div>
    )
}
