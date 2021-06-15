import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import { withRouter } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router-dom"

import { fetchEvents, fetchCourses } from '../../services'
import {formatDateRange } from '../../utils'


const EventsIndexPage = (props) => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderDir, setOrderDir] = useState(true)
  const [orderBy, setOrderBy] = useState('start')
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [courseIds, setCourseIds] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetchCourses(null).then((response) => {
      // console.log(response.data)
      setCourses(response.data.courses)
    })
  }, []);


  useEffect(() => {
    setIsLoading(true)
    fetchEvents(orderBy, orderDir, courseIds).then((response)=>{
      // console.log(response.data)
      setData(response.data.events)
      setIsLoading(false)
    })
  }, [orderBy, orderDir, courseIds]);

  const handleSort = (col) => {
    setOrderDir(!orderDir)
    setOrderBy(col)
  }

  const handleAddCourse = () => {
    props.history.push('events/create')
  }

  const handleSelectCourses = (e) => {
    let newVal = e.target.value
    let _courseIds = [...courseIds]
    if (_courseIds.indexOf(newVal) === -1) {
      _courseIds.push(newVal)
    } else {
      if (_courseIds.length === 1) {
        _courseIds = []
      } else {
        _courseIds.splice(_courseIds.indexOf(newVal), 1)
      }
    }
    // setFilterQueue -> onApply:
    setCourseIds(_courseIds)
  }

  const isAdmin = (sessionStorage.getItem('admin_role') === 'true');

  return (!isLoading) ?
    <Container  style={{marginTop:'2em'}}>
    <Row>
      <Col>
        <h1>Termine</h1>
        <Row>
          <Col>
            {(isAdmin && (<Button type="button" variant="primary" onClick={() => { handleAddCourse() }}>Add</Button>))}
          </Col>
          <Col>
            <Button type="button" variant="secondary" onClick={() => { setIsFilterVisible(!isFilterVisible) }} style={{float:'right'}}>Filter </Button>
          </Col>
        </Row>

        {isFilterVisible && (
          <Row style={{backgroundColor:'#eff', padding:'10px'}}>
          <Col>
          <label>Kurs</label><br/>
          <select size='7' multiple value={courseIds} onChange={handleSelectCourses} name="courseIds" >
            <option value="nil">--</option>
            {courses.map((val) => <option value={val.id}  >{val.title}</option>)}
          </select>
          </Col>
        </Row>
        )}

        <Table striped bordered hover size="sm" style={{marginTop:'8px'}}>
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th onClick={() => handleSort('title')}  >{orderBy==='title' && (orderDir?'▲':'▼')}  Name  </th>
            <th onClick={() => handleSort('start')}  >{orderBy==='start' && (orderDir?'▲':'▼')}  Datum </th>
            <th onClick={() => handleSort('course_id')} >{orderBy==='course_id' && (orderDir?'▲':'▼')}  Kurs</th>
          </tr>
        </thead>
        <tbody>
        {data.map((item)=>{
          const dateOfEvent = String(formatDateRange(item.start, item.end))
          console.log(dateOfEvent)
            return (
              <tr style={{cursor:"pointer"}}>
                <td>
                  <LinkContainer to={`/events/${item.id}`}>
                    <h2 key={item.id}  >{item.title}</h2>
                  </LinkContainer>
                </td>
                <td>
                {dateOfEvent}
                </td>
                <td>
                {item.course && item.course.title}
                </td>
              </tr>
            )
          })
          }
          </tbody>
        </Table>
        </Col>
      </Row>
      <Link to={{
        pathname: "/pdf/events",
        data: data,
        }}
      > PDF </Link>
    </Container>
  : <Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
 </Spinner>
}

export default withRouter(EventsIndexPage)
