import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { Card, Col, Row, Popover, Tag } from 'antd';
import './Dashboard.css';

export default function Dashboard() {

  const [myIssues, setIssues] = useState([]);
  const [currentTime, setCurrentTime] = useState([])

  useEffect(() => {
    axios.get(" http://localhost:5000/it_issue").then(
      res => {
        setIssues(res.data)
        let date = new Date();
        setCurrentTime(date)
      }
    )
  }, [])


  return (
    <div className="site-card-wrapper">
      <Row>

        <Col span={6}>
          <Card title="Over due issues" style={{ height: "100%" }}>
            {myIssues.map((issue) => {
              if ((moment(issue.target_resolution_date).diff(moment(currentTime), 'days') > 0) && (issue.status === "OPEN")) {
                return <Popover
                  title={issue.id}
                  content={issue.issue_description}
                  trigger="hover"
                  key={issue.id}
                >
                  <Link
                    to={'/home/issue/issueDetails'}
                    state={issue.id}>
                    <Tag color={issue.color}>{issue.id}</Tag>
                  </Link>
                </Popover>
              }
            })
            }
          </Card>
        </Col>

        <Col span={6}>
          <Card title="Unassigned issues" style={{ height: "100%" }}>
            {myIssues.map((issue) => {
              if (((issue.assigned_to === "")) && (issue.status === "OPEN")) {
                return <Popover
                  title={issue.id}
                  content={issue.issue_description}
                  trigger="hover"
                  key={issue.id}
                >
                  <Link
                    style={{ color: 'black' }}
                    to={'/home/issue/issueDetails'}
                    state={issue.id}>
                    <Tag color={issue.color}>{issue.id}</Tag>
                  </Link>
                </Popover>
              }
            })
            }
          </Card>
        </Col>

        <Col span={6}>
          <Card title="Rencently opened issues" style={{ height: "100%" }}>
            {myIssues.map((issue) => {
              if ((moment(issue.created_on).diff(moment(currentTime), 'days') >= -7) && (moment(issue.created_on).diff(moment(currentTime), 'days') <= 0) &&(issue.status === "OPEN")) {
                return <Popover
                  title={issue.id}
                  content={issue.issue_description}
                  trigger="hover"
                  key={issue.id}
                >
                  <Link
                    style={{ color: 'black' }}
                    to={'/home/issue/issueDetails'}
                    state={issue.id}>
                    <Tag color={issue.color}>{issue.id}</Tag>
                  </Link>
                </Popover>
              }
            })
            }
          </Card>
        </Col>

        <Col span={6}>
          <Card title="Open issues" style={{ height: "100%" }}>
            {myIssues.map((issue) => {
              if (issue.status === "OPEN")
                return <Popover
                  title={issue.id}
                  content={issue.issue_description}
                  trigger="hover"
                  key={issue.id}
                >
                  <Link
                    style={{ color: 'black' }}
                    to={'/home/issue/issueDetails'}
                    state={issue.id}>
                    <Tag color={issue.color}>{issue.id}</Tag>
                  </Link>
                </Popover>
            })
            }
          </Card>
        </Col>

      </Row>
    </div>
  )
}