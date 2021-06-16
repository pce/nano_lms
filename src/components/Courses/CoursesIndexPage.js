import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'

import { withRouter, useLocation } from 'react-router-dom'

import { LinkContainer } from "react-router-bootstrap"
import { fetchCourses } from '../../services'


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CoursesIndexPage = (props) => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const query = useQuery();

  const page = query.get("page") || 1

  useEffect(() => {
    // let page = query.get("page") || 1
    fetchCourses(page).then((response) => {
      // console.log(response.data)
      setData(response.data)
      setIsLoading(false)
    })
  }, [page]);

  const handleAddCourse = () => {
    props.history.push('courses/create')
  }

  const pageChanged = (e) => {
    console.log(e.target)
    // let page = Number(e.target.value)
    // props.history.push(`courses?page=${page}`)
  }
 
  if (isLoading) {
    return <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  }

  // todo: prepare pager vars for more than 10 pages (with <Pagination.Ellipsis />)
  // total > 10, from: (total / 2) +5, to: (total / 2) +5,
  const pagerItems = new Array(data.pager.last).fill(1)

  const isAdmin = (sessionStorage.getItem('admin_role') === 'true');

  return <Container  style={{marginTop:'2em'}}>
    <Row>
      <Col>
        <h1>{props.title}</h1>
        {isAdmin && (<Button type="button" variant="primary" onClick={() => { handleAddCourse() }}>Add</Button>)}
        <Table responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
          {data.courses.map((item)=>{
              return <tr>
                <td>
                {item.title}
                </td>
                <td>
                {isAdmin && (
                  <LinkContainer to={`/courses/${item.id}`}>
                    <Button variant="primary">mehr ...</Button>
                  </LinkContainer>
                )}
                </td>
              </tr>
            } )}
            </tbody>
          </Table>

        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination onClick={pageChanged}>
            <Pagination.First href="courses?page=1"/>
            {((data.pager && data.pager.prev) &&
              <Pagination.Prev value="1" href={`courses?page=${data.pager.prev}`} />
            )}
            {pagerItems.map((item, key)=>{
              let page = key +1
              return (data.pager.page === page) ?
                <Pagination.Item active>{page}</Pagination.Item> :
                <Pagination.Item href={`courses?page=${page}`}>{page}</Pagination.Item>
            })}
            {((data.pager && data.pager.next) &&
              <Pagination.Next value="1" href={`courses?page=${data.pager.next}`} />
            )}
            <Pagination.Last href={`courses?page=${data.pager.last}`}/>
          </Pagination>
        </Col>
      </Row>
    </Container>
}

export default withRouter(CoursesIndexPage)
