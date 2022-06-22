import { Descriptions, Button, Modal, DatePicker, Form, Input, Spin } from 'antd';
import React, { useState, useEffect } from 'react'
import { useLocation, Navigate } from 'react-router-dom';
import axios from 'axios'

export default function ProjectDetails() {

  const myProps = useLocation();
  const [myData, setData] = useState(['']);
  const [mySwitch, setSwitch] = useState(false);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/it_projects?id=${myProps.state}`).then(
      res => {
        setData(res.data)
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
      "start_date": values.start_date,
      "target_end_date": values.target_end_date,
      "actual_end_id": "",
      "created_by": "Yunqi li",
      "modified_on": date,
      "modified_by": "Yunqi Wang"
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
      project_name: myData[0].project_name
    })
  }

  return (
    <div>
      {mySwitch ? <Navigate to="/home/projects" /> :
        <div>
          <Descriptions layout="vertical" bordered column={2}>
            <Descriptions.Item label="Project ID">{myData[0] ? myData[0].id : <Spin />}</Descriptions.Item>
            <Descriptions.Item label="Project name">{myData[0] ? myData[0].project_name : <Spin />}</Descriptions.Item>
            <Descriptions.Item label="Actual end ID">{myData[0] ? myData[0].actual_end_id : <Spin />}</Descriptions.Item>
            <Descriptions.Item label="Created on">{myData[0] ? myData[0].created_on : <Spin />}</Descriptions.Item>
            <Descriptions.Item label="Created by">{myData[0] ? myData[0].created_by : <Spin />}</Descriptions.Item>
            <Descriptions.Item label="Modified by">{myData[0] ? myData[0].modified_by : <Spin />}</Descriptions.Item>
            <Descriptions.Item label="Modified on">{myData[0] ? myData[0].modified_on : <Spin />}</Descriptions.Item>
            <Descriptions.Item label="Start date">{myData[0] ? myData[0].start_date : <Spin />}</Descriptions.Item>
            <Descriptions.Item label="Target end date">{myData[0] ? myData[0].target_end_date : <Spin />}</Descriptions.Item>
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
                name="project_name"
                label="Project Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input the title of collection!',
                  },
                ]}
              >

                <Input allowClear />
              </Form.Item>
              <Form.Item
                name="start_date"
                label="Start date"
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                name="target_end_date"
                label="Target end date"
              >
                <DatePicker />
              </Form.Item>
            </Form>
          </Modal>
        </div>}
    </div>
  )
}
