import React from 'react'
import { Button, Form, Input, message, Spin } from 'antd'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { connect } from 'react-redux';
import {service} from '../../utils/http';

function Login(props) {

  const navigate = useNavigate()

  const onFinish = (values) => {
    service.get(`http://localhost:5000/it_people?username=${values.username}&password=${values.password}`).then(
      res => {
        if (res.data.length > 0) {
          localStorage.setItem("token", JSON.stringify(res.data[0]))
          navigate("/home")
          console.log('Success:', values);
        }
        else {
          message.error("Wrong username or password")
        }
      }
    ).catch(
      error => {
        message.error(`${error.message}`);
      }
    )
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (

    <div className='Login_wrapper'>
      <Spin spinning={props.isloading} wrapperClassName='spinWrapper'>
        <div className='formContainer'>
          <div className='loginTitle'>Issue Tracker 1.0</div>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input placeholder='Username' />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Login</Button>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </div >
  )
}

const mapStateToProps = (state) => {
  return state
}


export default connect(mapStateToProps)(Login)