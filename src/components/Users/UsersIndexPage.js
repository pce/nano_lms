import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { withRouter } from 'react-router-dom'

import { fetchUsers } from '../../services'

const UsersIndexPage = (props) => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then((response)=>{
      // console.log(response)
      // console.log(response.data)
      setData(response.data.users)
      setIsLoading(false)
    })
   }, []);

  const handleAddUser = () => {
    props.history.push('users/create')
  }

  const handleEditUser = (id) => {
    props.history.push(`users/${id}/edit`)
  }

  const isAdmin = (sessionStorage.getItem('admin_role') === 'true');

  return <Container style={{marginTop:'2em'}}>
      <Row>
        <Col>
   {((isLoading) && (<Spinner animation="border" role="status">
    <span className="sr-only">Loading...</span>
   </Spinner>)) || (
   <>
    <h1>Benutzer</h1>
    {isAdmin &&
     <Button type="button" variant="primary" onClick={() => { handleAddUser() }}>Add</Button>
    }
    <Table responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>E-Mail</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {data.map((item)=>{
        return <tr>
          <td>
          {item.id}
          </td>
          <td>
          {item.email}  {item.first_name} {item.last_name}
          </td>
          <td>
          {isAdmin && (<Button type="button" variant="primary" onClick={() => { handleEditUser(item.id) }}>Edit</Button>)}
          </td>
        </tr>
      } )}
      </tbody>
    </Table>
   </>)}
  </Col>
  </Row>
  </Container>

}


export default withRouter(UsersIndexPage)
