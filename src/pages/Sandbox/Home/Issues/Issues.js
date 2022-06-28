import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Form, Input, Button, Modal, Table, DatePicker, Space, Tag, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';

export default function Issues() {
  const [form] = Form.useForm();
  const [datasource, setDatasource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [myFilter, setMyFilter] = useState([]);
  const [myProject, setProject] = useState([]);
  const [myUsers, setUsers] = useState([]);
  const { Option } = Select;
  const searchInput = useRef(null);
  const colorList = [
    {project: 1,color: "red"},
    {project: 2,color: "orange"},
    {project: 3,color: "yellow"},
    {project: 4,color: "green"},
    {project: 5,color: "azure"},
    {project: 6,color: "blue"},
    {project: 7,color: "purple"},
  ]



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
      title: 'Issue ID',
      dataIndex: 'id',
      width: '18%',
      ...getColumnSearchProps('id'),
      render: (item) => {
        return <Link style={{ color: 'black' }} to={"issueDetails"} state={item}>{item}</Link>
      }
    },
    {
      title: 'Related project',
      dataIndex: 'related_project',
      filters: myFilter,
      onFilter: (value, record) => { return record.related_project === value },
    },
    {
      title: 'Modified date',
      dataIndex: 'modified_on',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        {
          text: 'OPEN',
          value: 'OPEN',
        },
        {
          text: 'CLOSED',
          value: 'CLOSED',
        }
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (item) => {
        return item === 'OPEN' ? <Tag color="green">{item}</Tag> : <Tag color="red">{item}</Tag>
      }
    },
    {
      title: 'Action',
      render: (item) => {
        return <Button danger onClick={() => handleDelete(item)}>delete</Button>
      }
    }
  ]

  useEffect(() => {
    axios.get(" http://localhost:5000/it_issue").then(
      res => {
        setDatasource(res.data)
        let tempList = []
        res.data.map((item) => {
          if (!checkDuplicate(tempList, item)) {
            return tempList.push({
              text: item.related_project,
              value: item.related_project,
            })
          }
        })
        setMyFilter(tempList)
      }
    )
    axios.get(`http://localhost:5000/it_people`).then(
      res => {
        setUsers(res.data)
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
    var mycolor = colorList.filter((item)=>{
      return item.project === values.related_project
    })
    console.log(mycolor)
    axios.post(`http://localhost:5000/it_issue`, {
      "issue_summary": values.issue_summary,
      "issue_description": values.issue_description,
      "identified_by_person_id": values.identified_by_person_id,
      "identified_date": values.identified_date,
      "related_project": values.related_project,
      "assigned_to": values.assigned_to,
      "status": "OPEN",
      "priority": values.priority,
      "target_resolution_date": values.target_resolution_date,
      "progress": values.progress,
      "actual_resolution_date": values.actual_resolution_date,
      "resolution_summary": values.resolution_summary,
      "created_on": date,
      "created_by": "Yunqi Wang",
      "modified_on": date,
      "modified_by": "Yunqi Wang",
      "color" : mycolor[0].color
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
    axios.delete(`http://localhost:5000/it_issue/${item.id}`).then(
      setDatasource(datasource.filter(data => data.id !== item.id))).catch
      (err => {
        console.log(err)
      })
  }

  const checkDuplicate = (array, item) => {
    let flag = false
    array.forEach(element => {
      if (element.text === item.related_project){
        flag = true
      }
    });
    return flag
  }

  const findcolor = (id) => {
    colorList.map((color) => {

    })
  }



  return (
    <div>
      <Button style={{ margin: 10 }} onClick={showModal}>Add issue</Button>
      <Table style={{ margin: '0px 10px' }} dataSource={datasource} columns={columns} rowKey="id"></Table>
      <Modal
        visible={visible}
        title="Create a new issue"
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
            name="issue_summary"
            label="Issue Summary"
          >
            <Input.TextArea allowClear />
          </Form.Item>

          <Form.Item
            name="issue_description"
            label="Issue Description"
          >
            <Input.TextArea allowClear />
          </Form.Item>

          <Form.Item
            name="identified_by_person_id"
            label="identified_by_person_id"
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item
            name="identified_date"
            label="identified_date"
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="related_project"
            label="related_project"
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
            label="assigned_to"
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
            name="priority"
            label="priority"
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item
            name="progress"
            label="progress"
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item
            name="target_resolution_date"
            label="target_resolution_date"
          >
            <DatePicker />
          </Form.Item>


          <Form.Item
            name="actual_resolution_date"
            label="actual_resolution_date"
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="resolution_summary"
            label="resolution_summary"
          >
            <Input.TextArea allowClear />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  )
}
