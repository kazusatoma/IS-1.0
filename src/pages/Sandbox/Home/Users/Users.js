import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Form, Input, Button, Modal, Table, Select, Space} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';

export default function Users() {
  const [form] = Form.useForm();
  const [datasource, setDatasource] = useState([]);
  const [myProject, setProject] = useState([''])
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const { Option } = Select;
  const roleList = ["Manager", "Project lead", "Member"]
  const [checkRole , setRole] = useState()
  const [selectingRole, setSelectingRole] = useState(false)
  // const [myFilter,setMyFilter] = useState([]);
  const searchInput = useRef(null);


  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };



  const columns = [
    {
      title: 'User ID',
      dataIndex: 'id',
      width: '18%',
      ...getColumnSearchProps('id'),
      render: (item) => {
        return <Link style={{ color: 'black' }} to={"UserInfo"} state={item}>{item}</Link>
      }
    },
    {
      title: 'Name',
      dataIndex: 'person_name',
      // filters: myFilter,
      // onFilter: (value, record) => {return record.related_project === value},
    },
    {
      title: 'Role',
      dataIndex: 'person_role',
    },
    {
      title: 'Assigned project',
      dataIndex: 'assigned_project',
    },
    {
      title: 'Action',
      render: (item) => {
        return <Button danger onClick={() => handleDelete(item)} disabled={!checkRole}>delete</Button>
      }
    }
  ]

  useEffect(() => {
    axios.get(" http://localhost:5000/it_people").then(
      res => {
        setDatasource(res.data)
        // let tempList = []
        // res.data.map((item) => {
        //   return tempList.push({
        //     text:item.related_project,
        //     value:item.related_project,
        //   })
        // })
        // setMyFilter(tempList)
        setRole(JSON.parse(localStorage.getItem("token")).person_role==="Manager")
      }
    )
    axios.get(`http://localhost:5000/it_projects`).then(
      res => {
        setProject(res.data)
      }
    )
  }, [])

  const showModal = () => {
    setVisible(true);
  }

  const onCreate = (values) => {
    var date = new Date();
    axios.post(`http://localhost:5000/it_people`, {
      "person_name": values.person_name,
      "person_email": values.person_email,
      "person_role": values.person_role,
      "username": values.username,
      "password": values.password,
      "assigned_project": values.assigned_project,
      "created_on": date,
      "created_by": JSON.parse(localStorage.getItem("token")).person_name,
      "modified_on": date,
      "modified_by": JSON.parse(localStorage.getItem("token")).person_name
    }).then(
      res => {
        setDatasource([...datasource, res.data])
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


  const handleDelete = (item) => {
    axios.delete(`http://localhost:5000/it_people/${item.id}`).then(
      setDatasource(datasource.filter(data => data.id !== item.id))).catch
      (err => {
        console.log(err)
      })
  }

  const handleChange = (value) => {
    setSelectingRole(value === "Manager")
    form.setFieldsValue({
      assigned_project: "",
  })
  }


  return (
    <div>
      <Button style={{ margin: 10 }} onClick={showModal} disabled={!checkRole}>Add User</Button>
      <Table style={{ margin: '0px 10px' }} dataSource={datasource} columns={columns} rowKey="id"></Table>
      <Modal
        visible={visible}
        title="Create a new user"
        okText="Create"
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
            <Input />
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
              disabled = {selectingRole}
            >
              {myProject.map((item) => {
                return <Option key={myProject.indexOf(item)} value={item.id}>{item.id}</Option>
              })}
            </Select>
          </Form.Item>

        </Form>
      </Modal>
    </div>
  )
}