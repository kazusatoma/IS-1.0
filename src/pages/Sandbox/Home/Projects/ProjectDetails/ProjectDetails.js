import { Descriptions, Button, Modal, DatePicker, Form, Input, Spin } from 'antd';
import React, { useState, useEffect } from 'react'
import { useLocation, Navigate } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment'

export default function ProjectDetails() {

  const myProps = useLocation();
  const [myData, setData] = useState(['']);
  const [mySwitch, setSwitch] = useState(false);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [checkRole, setRole] = useState();

  useEffect(() => {
    axios.get(`http://localhost:5000/it_projects?id=${myProps.state}`).then(
      res => {
        setData(res.data)
        setRole(JSON.parse(localStorage.getItem("token")).person_role === "Manager")
      }
    )
  }, [myProps.state])

  const handleDelete = (item) => {
    setSwitch(!mySwitch)
    axios.delete(`http://localhost:5000/it_projects/${myData[0].id}`).then(
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
    axios.patch(`http://localhost:5000/it_projects/${myData[0].id}`, {
      "project_name": values.project_name,
      "start_date": moment(values.start_date),
      "target_end_date": moment(values.target_end_date),
      "actual_end_date": moment(values.actual_end_date),
      "modified_on": moment(date),
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
      start_date:moment(myData[0].start_date),
      target_end_date:moment(myData[0].target_end_date),
      actual_end_date:moment(myData[0].actual_end_date)
    })
  }

  return (
    <div>
      {mySwitch ? <Navigate to="/home/projects" /> :
        <div>
          <Descriptions layout="vertical" bordered column={2}>
            <Descriptions.Item label="Project ID">{myData[0] ? myData[0].id : <Spin />}</Descriptions.Item>
            <Descriptions.Item label="Project name">{myData[0] ? myData[0].project_name : <Spin />}</Descriptions.Item>
            <Descriptions.Item label="Created on">{myData[0] ? myData[0].created_on : <Spin />}</Descriptions.Item>
            <Descriptions.Item label="Created by">{myData[0] ? myData[0].created_by : <Spin />}</Descriptions.Item>
            <Descriptions.Item label="Start date">{myData[0] ? myData[0].start_date : <Spin />}</Descriptions.Item>
            <Descriptions.Item label="Target end date">{myData[0] ? myData[0].target_end_date : <Spin />}</Descriptions.Item>
            <Descriptions.Item label="Actual end date">{myData[0] ? myData[0].actual_end_date : <Spin />}</Descriptions.Item>
            <Descriptions.Item label="Modified by">{myData[0] ? myData[0].modified_by : <Spin />}</Descriptions.Item>
            <Descriptions.Item label="Modified on">{myData[0] ? myData[0].modified_on : <Spin />}</Descriptions.Item>
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
                name="project_name"
                label="Project Name"
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
                name="start_date"
                label="Start date"
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
                name="target_end_date"
                label="Target end date"
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
                name="actual_end_date"
                label="Actual end date"
              >
                <DatePicker />
              </Form.Item>
            </Form>
          </Modal>
        </div>}
    </div>
  )
}
