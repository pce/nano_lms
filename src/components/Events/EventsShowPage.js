import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import { LinkContainer } from "react-router-bootstrap"
import { withRouter } from 'react-router-dom'
import { fetchEvent,  deleteEvent } from '../../api'

function EventsShowPage(props) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvent(props.match.params.id).then((response)=>{
      console.log(response.data)
      setData(response.data)
      setIsLoading(false)
    })
  }, []);

 const handleEditEvent = (id) => {
  props.history.push({
   pathname: `/events/${id}/edit`
  });
 };

 const handleDeleteEvent = (id) => {
  // const event = { prod_name: data.prod_name, prod_desc: data.prod_desc, prod_price: parseInt(data.prod_price) };
  deleteEvent(id)
   .then((result) => {
    setIsLoading(false);
    props.history.push('/events')
   }).catch((error) => setIsLoading(false));
 };


 return (
    <Container style={{marginTop:'2em'}}>
      <Row>
        <Col>
   {((isLoading) && (<Spinner animation="border" role="status">
    <span className="sr-only">Loading...</span>
   </Spinner>)) || (
   <Jumbotron>
    <h2>{data.event.title}</h2>
    <p>{data.event.start}</p>
    <p>{data.event.end}</p>

    <p>{data.event.course_id}</p>

    <p>
      <br/>
      <Button type="button" variant="secondary" onClick={() => { props.history.goBack() }}>Cancel</Button>&nbsp;

     <Button type="button" variant="primary" onClick={() => { handleEditEvent(data.event.id) }}>Edit</Button>&nbsp;
     <Button type="button" variant="danger" onClick={() => { if (window.confirm('Delete?')) handleDeleteEvent(data.event.id) }}>Delete</Button>
    </p>
   </Jumbotron>)}
  </Col>
  </Row>
  </Container>
 );
}

export default withRouter(EventsShowPage);