import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { withRouter } from 'react-router-dom'

import { fetchUser, updateUser, createUser } from '../../services'


function removeByKey(myObj, deleteKey) {
  return Object.keys(myObj)
    .filter(key => key !== deleteKey)
    .reduce((result, current) => {
      result[current] = myObj[current];
      return result;
  }, {});
}


function UsersEditPage(props) {
  const [data, setData] = useState({
    id:0,
    username:'',
    email:''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isMutated, setIsMutated] = useState(false)

  useEffect(() => {
    if (props.mode === 'create') {
      setIsLoading(false)
      return
    }
    fetchUser(props.match.params.id).then((response)=>{
      // console.log(response.data)
      setData(response.data.user)
      setIsLoading(false)
    })
  }, [props.match.params.id, props.mode]);

  const handleSaveUser = (id) => {
    if (props.mode === 'create') {
      const newUserData = removeByKey(data, 'id')
      createUser(newUserData)
      .then((result) => {
        setIsLoading(false)
        props.history.push('/users')
      }).catch((error) => setIsLoading(false));
    } else {
      updateUser(id, data)
      .then((result) => {
        setIsLoading(false)
        props.history.push('/users')
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
    // console.log(data)
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
            <label>email</label><br/>
            <input type="text" value={data.email} name="email" onChange={handleInput} style={{width:'100%'}} /><br/>

            <label>username</label><br/>
            <input type="text" value={data.username} name="username" onChange={handleInput} style={{width:'100%'}} /><br/>

            {((props.mode === 'create') && (
            <>
            <label>password</label><br/>
            <input type="password" value={data.password} name="password" onChange={handleInput} style={{width:'100%'}} /><br/>

            <label>password confirmation</label><br/>
            <input type="password" value={data.password_confirmation} name="password_confirmation" onChange={handleInput} style={{width:'100%'}} /><br/>
            </>
            ))}

            <br/>
            <p>
            <Button disabled={!isMutated} type="button" variant="primary" onClick={() => { handleSaveUser(data.id) }}>Save</Button>&nbsp;
            <Button type="button" variant="normal" onClick={() => { props.history.goBack() }}>Cancel</Button>
            </p>
          </Jumbotron>)}
        </Col>
      </Row>
    </Container>
  )
}

export default withRouter(UsersEditPage)