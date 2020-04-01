import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { withRouter } from 'react-router-dom'

import { fetchCourse, updateCourse, createCourse } from '../../api'

function CoursesEditPage(props) {
  const [data, setData] = useState({
    id:0,
    description:'',
    title:''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isMutated, setIsMutated] = useState(false)

  useEffect(() => {
    if (props.mode === 'create') {
      setIsLoading(false)
      return
    }
    fetchCourse(props.match.params.id).then((response)=>{
      console.log(response.data)
      setData(response.data.course)
      setIsLoading(false)
    })
  }, []);

  const handleSaveCourse = (id) => {
    // const course = { prod_name: data.prod_name, prod_desc: data.prod_desc, prod_price: parseInt(data.prod_price) };
    if (props.mode === 'create') {
      createCourse(data)
      .then((result) => {
        setIsLoading(false)
        props.history.push('/courses')
      }).catch((error) => setIsLoading(false));
    } else {
      updateCourse(id, data)
      .then((result) => {
        setIsLoading(false)
        props.history.push('/courses')
      }).catch((error) => setIsLoading(false));
    }
  }

  const handleInput = (event) => {
    const name = event.target.name
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;

    setData({
      ...data,
      [name]: value
    })
    setIsMutated(true)
  }

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
        <label>description</label><br/>
        <textarea style={{height:'10em', width:'100%', border:'none'}} value={data.description} onChange={handleInput} name="description" ></textarea>
        <br/>
        <p>
        <Button disabled={!isMutated} type="button" variant="primary" onClick={() => { handleSaveCourse(data.id) }}>Save</Button>&nbsp;
        <Button type="button" variant="normal" onClick={() => { props.history.goBack() }}>Cancel</Button>
        </p>
      </Jumbotron>)}
      </Col>
    </Row>
  </Container>
 )
}

export default withRouter(CoursesEditPage)