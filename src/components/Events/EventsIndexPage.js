import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import { withRouter } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap"

import { fetchEvents } from '../../api'
import {formatDateRange } from '../../utils'


const EventsIndexPage = (props) => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents().then((response)=>{
      console.log(response.data)
      setData(response.data.events)
      setIsLoading(false)
    })
   }, []);

  const handleAddCourse = () => {
    props.history.push('events/create')
  }

  return (!isLoading) ?
    <Container  style={{marginTop:'2em'}}>
    <Row>
      <Col>
        <h1>Termine</h1>
        {((sessionStorage.getItem('admin_role')) && (<Button type="button" variant="primary" onClick={() => { handleAddCourse() }}>Add</Button>))}
        <Table striped bordered hover size="sm" style={{marginTop:'8px'}}>
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Name</th>
            <th>Datum</th>
            <th>Kurs</th>
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
                {item.course_id}
                </td>
              </tr>
            )
          })
          }
          </tbody>
        </Table>
        </Col>
      </Row>
    </Container>
  : <Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
 </Spinner>
}

export default withRouter(EventsIndexPage)
