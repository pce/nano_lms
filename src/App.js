import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from "react-router-dom";

import EventsIndexPage from './components/Events/EventsIndexPage';
import EventsEditPage from './components/Events/EventsEditPage';
import EventsShowPage from './components/Events/EventsShowPage';
import CoursesIndexPage from './components/Courses/CoursesIndexPage';
import CoursesShowPage  from './components/Courses/CoursesShowPage';
import CoursesEditPage  from './components/Courses/CoursesEditPage';
import { CalendarPage } from './components/CalendarPage';
import { DashboardPage } from './components/DashboardPage';
import UsersIndexPage from './components/Users/UsersIndexPage';
import UsersEditPage from './components/Users/UsersEditPage';
import { LoginPage } from './components/LoginPage';
import { NotFoundPage } from './components/NotFoundPage';
import LayoutAdmin  from './components/LayoutAdmin';
import { signIn, signOut } from './services'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    const token = sessionStorage.getItem('token')
    if (token)
      setIsAuthenticated(true)
      // meFromToken(token)
      // .then((resp) => setIsAuthenticated(resp))
  }, [setIsAuthenticated])

  const doSignIn = (data) => {
    // e.preventDefault()
    signIn(data).then(response => {
      // console.log(response)
      if (response && response.is_success) {
        setIsAuthenticated(true)
        // user.authentication_token
        sessionStorage.setItem('token', response.data.user.authentication_token)
        sessionStorage.setItem('user_role', response.data.user.user_role)
        sessionStorage.setItem('admin_role', response.data.user.admin_role)
        // sessionStorage.setItem('supervisor_role', response.data.supervisor_role)
      }
    }).catch(err => console.log(err))
  }

  const doSignOut = (e) => {
    e.preventDefault()
    console.log("sign out")
    signOut().then(response => {
      // console.log(response)
      setIsAuthenticated(false)
      sessionStorage.removeItem('token')
    }).catch(e => console.log(e))
  }

  return (
    (!isAuthenticated && (
      <div className="login">
       <LoginPage onSubmit={doSignIn} />
     </div>
   )) || (
   <Router>
      <Switch>
       <Route exact path="/">
        <LayoutAdmin doSignOut={doSignOut}>
          <DashboardPage />
        </LayoutAdmin>
       </Route>
       <Route exact path="/events">
        <LayoutAdmin doSignOut={doSignOut}>
          <EventsIndexPage />
        </LayoutAdmin>
       </Route>
       <Route exact path="/events/:id/edit">
        <LayoutAdmin doSignOut={doSignOut}>
          <EventsEditPage />
        </LayoutAdmin>
       </Route>
       <Route exact path="/events/create">
        <LayoutAdmin doSignOut={doSignOut}>
          <EventsEditPage mode='create' />
        </LayoutAdmin>
       </Route>
       <Route exact path="/events/:id">
        <LayoutAdmin doSignOut={doSignOut}>
          <EventsShowPage />
        </LayoutAdmin>
       </Route>
       <Route exact path="/courses">
        <LayoutAdmin doSignOut={doSignOut}>
          <CoursesIndexPage />
        </LayoutAdmin>
       </Route>
       <Route exact path="/courses/:id/edit">
        <LayoutAdmin doSignOut={doSignOut}>
          <CoursesEditPage />
        </LayoutAdmin>
       </Route>
       <Route exact path="/courses/create">
        <LayoutAdmin doSignOut={doSignOut}>
          <CoursesEditPage mode='create' />
        </LayoutAdmin>
       </Route>
       <Route exact path="/courses/:id">
        <LayoutAdmin doSignOut={doSignOut}>
          <CoursesShowPage />
        </LayoutAdmin>
       </Route>
       <Route path="/calendar">
        <LayoutAdmin doSignOut={doSignOut}>
          <CalendarPage />
        </LayoutAdmin>
       </Route>
       <Route exact path="/users/:id/edit">
        <LayoutAdmin doSignOut={doSignOut}>
          <UsersEditPage />
        </LayoutAdmin>
       </Route>
       <Route path="/users/create">
        <LayoutAdmin doSignOut={doSignOut}>
          <UsersEditPage mode='create' />
        </LayoutAdmin>
       </Route>
       <Route path="/users">
        <LayoutAdmin doSignOut={doSignOut}>
          <UsersIndexPage />
        </LayoutAdmin>
       </Route>
       <Route path="/oops" component={NotFoundPage} />
       <Redirect to='/oops' />
    </Switch>
    </Router>)
  );
}

export default App;
