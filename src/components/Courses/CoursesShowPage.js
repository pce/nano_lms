import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { withRouter } from 'react-router-dom'
import { fetchCourse,  deleteCourse } from '../../services'

function CoursesShowPage(props) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCourse(props.match.params.id).then((response)=>{
      // console.log(response.data)
      setData(response.data)
      setIsLoading(false)
    })
  }, [props.match.params.id]);

 const handleEditCourse = (id) => {
  props.history.push({
   pathname: `/courses/${id}/edit`
  });
 };

 const handleDeleteCourse = (id) => {
  deleteCourse(id)
   .then((result) => {
    setIsLoading(false);
    props.history.push('/courses')
   }).catch((error) => setIsLoading(false));
 };


 const listEvents = () => {
  return data.events.map((item)=>{
    return (
      <Card style={{marginTop:'4px'}}>
        <Card.Header>{item.title}</Card.Header>
        <Card.Body>
          {/* <Card.Title>{item.title}</Card.Title> */}
          <Card.Text>
            {item.start} - {item.end}
          </Card.Text>
          {/* <LinkContainer to={`/events/${item.id}`}>
            <Button variant="primary">mehr ...</Button>
          </LinkContainer> */}
        </Card.Body>
        {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
      </Card>
      )
    })
  }


 return (
    <Container style={{marginTop:'2em'}}>
      <Row>
        <Col>
   {((isLoading) && (<Spinner animation="border" role="status">
    <span className="sr-only">Loading...</span>
   </Spinner>)) || (
   <Jumbotron>
    <h2>{data.course.title}</h2>
    <p>{data.course.description}</p>

    {listEvents()}

    <p>
      <br/>
     <Button type="button" variant="secondary" onClick={() => { props.history.goBack() }}>Cancel</Button>&nbsp;
     <Button type="button" variant="primary" onClick={() => { handleEditCourse(data.course.id) }}>Edit</Button>&nbsp;
     <Button type="button" variant="danger" onClick={() => { if (window.confirm('Delete?')) handleDeleteCourse(data.course.id) }}>Delete</Button>
    </p>
   </Jumbotron>)}
  </Col>
  </Row>
  </Container>
 );
}

export default withRouter(CoursesShowPage);