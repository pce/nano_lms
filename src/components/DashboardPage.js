import React, { useState, useEffect } from 'react';
import { fetchCourses } from '../api'

export const DashboardPage = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchCourses().then((response)=>{
      console.log(response.data)
      setData(response.data.courses)
      setIsLoading(false)
    })
   }, []);

  return (!isLoading) ? <div style={{background:'#fff', marginTop:'2em'}}>
    <h1>Dashboard</h1>
    <p>Hallo!</p>
  </div>
  : <p>Loading...</p>

}