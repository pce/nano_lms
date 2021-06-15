import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"
import { withRouter } from 'react-router-dom'
// import { LinkContainer } from "react-router-bootstrap"
import '../assets/sass/main.sass';

const LayoutAdmin = (props) => {

  const isAdmin = (sessionStorage.getItem('admin_role') === 'true');

  return (<>
    <Navbar sticky="top" bg="light">
      {/* <Navbar.Brand href="/">::</Navbar.Brand> */}
      <Nav className="mr-auto" variant="pills" >
        <Nav.Item>
          <Link to="/courses"> Courses </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/calendar"> Calendar </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/events"> Termine </Link>
        </Nav.Item>
        {isAdmin && (
        <Nav.Item>
          <Link to="/users"> Users</Link>
        </Nav.Item>
        )}
      </Nav>

      {/* <Nav.Item onClick={props.doSignOut}>Logout</Nav.Item> */}
      <Button onClick={(e) => props.doSignOut(e)} variant="outline-primary">Logout</Button>
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form> */}
    </Navbar>

    {props.children}

  </>)
}

export default withRouter(LayoutAdmin);