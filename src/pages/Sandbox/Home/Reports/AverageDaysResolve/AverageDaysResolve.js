import React, { useState, useEffect } from 'react'
import axios from 'axios';
import * as echarts from 'echarts'
// import moment from 'moment'

export default function AverageDaysResolve() {

    const [myUsers, setUsers] = useState([]);
    // const [myUserData, setUserdata] = useState([]);
    // const [ResolveData, setResolvedata] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:5000/it_people`).then(
            res => {
                let temp = []
                res.data.map((item) => {
                    temp.push(item.person_name)
                })
                setUsers(temp)
            }
        )
    }, [])

    useEffect(() => {
            let myChart = echarts.init(document.getElementById('chart'));
            // generateUserdata(myUsers)
            // generateResolveDays(myUsers)
            myChart.setOption({
                title: {
                    text: 'Average Days to Resolve'
                },
                tooltip: {},
                xAxis: {
                    data: myUsers
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        data: [59, 21, 38, 100]
                    }
                ]
            })
    }, [myUsers])

    // const generateUserdata = () => {
    //     let result = []
    //     myUsers.forEach((user) => result.push(user.person_name))
    //     setUserdata(result)
    // }

    // const generateResolveDays = () => {
    //     let result = []
    //     myUsers.map((user) => {
    //         let sum = 0
    //         let index = 0
    //         user.issues?.map((issue) => {
    //             sum = sum + moment(moment(issue.actual_resolution_date).diff(moment(issue.identified_date), 'days'))
    //             index++
    //         })
    //         if (index !== 0) { result.push(sum / index) }
    //         else { result.push(0) }
    //     })
    //     setResolvedata(result)
    // }

    return (
        <div id='chart' style={{ width: "80%", height: "80%", position: 'absolute', margin: "10%" }}></div>
    )
}