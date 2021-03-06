import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { withRouter } from 'react-router-dom'

import { fetchEvent, updateEvent, createEvent, fetchCourses } from '../../services'


function EventsEditPage(props) {
  const [data, setData] = useState({
    id:0,
    start:'',
    end:'',
    title:''
  })
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMutated, setIsMutated] = useState(false)

  useEffect(() => {
    if (props.mode === 'create') {
      setIsLoading(false)
      return
    }
    fetchEvent(props.match.params.id).then((response)=>{
      console.log(response.data)

      response.data.event.start = new Date(response.data.event.start)
      response.data.event.end = new Date(response.data.event.end)

      setData(response.data.event)
      setIsLoading(false)
    })
    fetchCourses(null).then((response) => {
      // console.log(response.data)
      setCourses(response.data.courses)
      setIsLoading(false)
    })
  }, [props.match.params.id, props.mode]);

  const handleSaveEvent = (id) => {
    if (props.mode === 'create') {
      createEvent(data)
      .then((result) => {
        setIsLoading(false)
        props.history.push('/events')
      }).catch((error) => setIsLoading(false));
    } else {
      updateEvent(id, data)
      .then((result) => {
        setIsLoading(false)
        props.history.push('/events')
      }).catch((error) => setIsLoading(false));
    }
  }

  const handleInputDateStart = (event) => {
    handleInputDate(event, 'start')
  }

  const handleInputDateEnd = (event) => {
    handleInputDate(event, 'end')
  }

  const handleInputDate = (event, name) => {
    // see https://momentjs.com/docs/#/displaying/
    let value = event
    // if (event.format) {
    //   value = event.format();
    // }
    setData({
      ...data,
      [name]: value
    })
    setIsMutated(true)
  }

  const handleInput = (event) => {
    // console.log(data)
    const name = event.target.name
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;

    setData({
      ...data,
      [name]: value
    })
    setIsMutated(true)
  }

  // console.log('data')
  // console.log(data)

  return (
    <Container style={{marginTop:'2em'}}>
      <Row>
        <Col>
       {((isLoading) && (<Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>)) || (
      <Jumbotron>
        <label>title</label><br/>
        <input type="text" value={data.title} name="title" onChange={handleInput} style={{width:'100%'}} /><br/>

        <label>start</label><br/>

        <DatePicker
          name="end"
          selected={data.start}
          onChange={handleInputDateStart}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy HH:mm"
        />

        <br/>
        <label>end</label>
        <br/>

        <DatePicker
          name="end"
          selected={data.end}
          onChange={handleInputDateEnd}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy HH:mm"
        />

        <br/>
        <label>Kurs</label><br/>
        <select value={data.course_id} onChange={handleInput} name="courseId" >
          <option value={null}>--</option>
          {courses.map((val)=> <option value={val.id}>{val.title}</option>)}
        </select>
        <br/>
        <br/>
        <br/>
        <p>
        <Button disabled={!isMutated} type="button" variant="primary" onClick={() => { handleSaveEvent(data.id) }}>Save</Button>&nbsp;
        <Button type="button" variant="normal" onClick={() => { props.history.goBack() }}>Cancel</Button>
        </p>
      </Jumbotron>)}
      </Col>
    </Row>
  </Container>
 )
}

export default withRouter(EventsEditPage)