import React, { useState, useEffect} from 'react'
import axios from 'axios';
import * as echarts from 'echarts'
import moment from 'moment'

export default function AverageDaysResolve() {

    const [myIssue, setIssues] = useState([]);
    const [myUsers, setUsers] = useState([]);
    const [myUserData, setUserdata] = useState([]);
    const [ResolveData, setResolvedata] = useState([]);

    useEffect(() => {
        axios.get(" http://localhost:5000/it_issue").then(
            res => {
                setIssues(res.data)
            }
        )
        axios.get(`http://localhost:5000/it_people`).then(
            res => {
                setUsers(res.data)
            }
        )
        let temp = [...myUsers]
        temp.forEach(item => item.issues = [])
        myIssue.map((issue) => {
            return temp.map((user) => {
                if (issue.assigned_to === user.id) {
                    return user.issues.push(issue)
                }
                return 0
            })
        })
        setUsers(temp)
    }, [])

    useEffect(() => {
        let myChart = echarts.init(document.getElementById('chart'));

        const generateUserdata = () => {
            let result = []
            myUsers.forEach((user) => result.push(user.person_name))
            setUserdata(result)
        }

        const generateResolveDays = () => {
            let result = []
            myUsers.map((user) => {
                let sum = 0
                let index = 0
                user.issues.map((issue) => {
                    sum = sum + moment(moment(issue.actual_resolution_date).diff(moment(issue.identified_date), 'days'))
                    index++
                })
                if (index !== 0) { result.push(sum / index) }
                else result.push(0)
            })
            setResolvedata(result)
        }

        generateUserdata()
        generateResolveDays()
        myChart.setOption({
            title: {
                text: 'Average Days to Resolve'
            },
            tooltip: {},
            xAxis: {
                data: myUserData
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: ResolveData
                }
            ]
        });
    }, [])

    return (
            <div id='chart' style={{ width: "100%", height: "100%",position:'absolute'}}></div>
    )
}