import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Pagination from 'react-bootstrap/Pagination'

import { withRouter, useLocation } from 'react-router-dom'

import { LinkContainer } from "react-router-bootstrap"
import { fetchCourses } from '../../api'


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CoursesIndexPage = (props) => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const query = useQuery();

  // let name = query.get("name")

  useEffect(() => {
    let page = query.get("page") || 1
    fetchCourses(page).then((response) => {
      // console.log(response.data)
      setData(response.data)
      setIsLoading(false)
    })
  }, []);

  const handleAddCourse = () => {
    props.history.push('courses/create')
  }

  const pageChanged = (e) => {
    console.log(e.target)
    // let page = Number(e.target.value)
    // props.history.push(`courses?page=${page}`)
  }

  const listAsCards = () => {
    return data.courses.map((item)=>{
      return (
        <Card style={{marginTop:'4px'}}>
        <Card.Header>{item.title}</Card.Header>
        <Card.Body>
          {/* <Card.Title>{item.title}</Card.Title> */}
          <Card.Text>
            {item.description}
          </Card.Text>
          <LinkContainer to={`/courses/${item.id}`}>
            <Button variant="primary">mehr ...</Button>
          </LinkContainer>
        </Card.Body>
        {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
      </Card>
      )
    })
  }


  if (isLoading) {
    return <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  }

  // todo: prepare pager vars for more than 10 pages (with <Pagination.Ellipsis />)
  // total > 10, from: (total / 2) +5, to: (total / 2) +5,
  const pagerItems = new Array(data.pager.total_pages).fill(1)

  return <Container  style={{marginTop:'2em'}}>
    <Row>
      <Col>
        <h1>Kurse</h1>
        {((sessionStorage.getItem('admin_role')) && (
          <><Button type="button" variant="primary" onClick={() => { handleAddCourse() }}>Add</Button>
          {listAsCards()}
          </>
        )) || (
          listAsCards()
        )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination onClick={pageChanged}>
            <Pagination.First href="courses?page=1"/>
            {((data.pager && data.pager.prev_page) &&
              <Pagination.Prev value="1" href={`courses?page=${data.pager.prev_page}`} />
            )}
            {pagerItems.map((item, key)=>{
              let page = key +1
              return (data.pager.current_page === page) ?
                <Pagination.Item active>{page}</Pagination.Item> :
                <Pagination.Item href={`courses?page=${page}`}>{page}</Pagination.Item>
            })}
            {((data.pager && data.pager.next_page) &&
              <Pagination.Next value="1" href={`courses?page=${data.pager.next_page}`} />
            )}
            <Pagination.Last href={`courses?page=${data.pager.total_pages}`}/>
          </Pagination>
        </Col>
      </Row>
    </Container>
}

export default withRouter(CoursesIndexPage)
