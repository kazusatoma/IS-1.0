import React, { useState, useEffect } from 'react'
import { Tag, Calendar, Card } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import './TargetResolutionDates.css'

export default function TargetResolutionDates() {

  const [myIssues, setIssues] = useState([]);

  useEffect(() => {
    axios.get(" http://localhost:5000/it_issue").then(
      res => {
        setIssues(res.data)
      }
    )
  }, [])

  const getListData = (value) => {
    let listData = [];
    myIssues.map((issue) => {
      if ((moment(issue.target_resolution_date).month()) == value.month() && (moment(issue.target_resolution_date).date() == value.date()) && issue.target_resolution_date !== undefined) {
        listData = [...listData, issue]
      }
    })
    return listData;
  }

  const dateCellRender = (value) => {
    const listData = getListData(value);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Link
              to={'/home/issue/issueDetails'}
              state={item.id}>
              <Tag color={item.color}>{item.id}</Tag>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ padding: "125px 50px" }}>
      <Card bordered>
        <Calendar dateCellRender={dateCellRender} fullscreen />
      </Card>
    </div>
  )
}