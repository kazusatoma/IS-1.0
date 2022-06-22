import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Form, Input, Button, Modal, Table, DatePicker, Space,Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Link} from 'react-router-dom';

export default function Projects() {
  const [form] = Form.useForm();
  const [datasource, setDatasource] = useState([])
  const [visible, setVisible] = useState(false)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
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
    setSearchedColumn('');
  };


  const columns = [
    {
      title: 'Project ID',
      dataIndex: 'id',
      width:'20%',
      ...getColumnSearchProps('project_name'),
      render: (item) => {
        return <Link style={{color: 'black'}} to={"projectsDetails"} state={item}>{item}</Link>
      }
    },
    {
      title: 'Project Name',
      dataIndex: 'project_name',
      width:'20%',
      ...getColumnSearchProps('project_name'),
    },
    {
      title: 'Created by',
      dataIndex: 'created_by',
      ...getColumnSearchProps('created_by'),
    },
    {
      title: 'Modified by',
      dataIndex: 'modified_by',
    },
    {
      title: 'Created on',
      dataIndex: 'created_on',
    },
    {
      title: 'Action',
      render: (item) => {
        return <Button danger onClick={() => handleDelete(item)}>delete</Button>
      }
    }
  ]


  useEffect(() => {
    axios.get(" http://localhost:5000/it_projects").then(
      res => {
        setDatasource(res.data)
      }
    )
  }, [])

  const showModal = () => {
    setVisible(true);
  }

  const onCreate = (values) => {
    var date = new Date();
    axios.post(`http://localhost:5000/it_projects`, {
      "project_name": values.project_name,
      "start_date": values.start_date,
      "target_end_date": "",
      "actual_end_id": "",
      "created_on": date,
      "created_by": "Yunqi li",
      "modified_on": "2014-01-01T23:28:56.782Z",
      "modified_by": "Yunqi Wang"
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
    axios.delete(`http://localhost:5000/it_projects/${item.id}`).then(
      setDatasource(datasource.filter(data => data.id !== item.id))).catch
      (err => {
        console.log(err)
      })
  }



  return (
    <div>
      <Button style={{ margin: 10 }} onClick={showModal}>Add Project</Button>
      <Table style={{ margin: '0px 10px'}} dataSource={datasource} columns={columns} rowKey="id"></Table>
      <Modal
        visible={visible}
        title="Create a new project"
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
        </Form>
      </Modal>
    </div>
  )
}
