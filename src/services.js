import axios from "axios";

const API_URL = process.env.REACT_APP_API_HOST

const getToken = () => {
  return sessionStorage.getItem('token')
}

//#region session

/**
 * sign_in
   curl -XPOST -v -H 'Content-Type: application/json' http://localhost:3000/api/v1/sign_in -d '{"sign_in": {"email": "email@example.com", "password": "admin1"}}'
 *
 */
export async function signIn(signInData) {
  const url = `${API_URL}/sign_in`
  return await axios.post(url, {
      sign_in: signInData
  }).then(response => response.data)
  .catch (e => {
    console.log(`request failed: ${e}`);
  })
}

export async function signOut() {
  const url = `${API_URL}/sign_out`
  return await axios.post(url).then(response => response.data)
  .catch (e => {
    console.log(`request failed: ${e}`);
  })
}

//#endregion

//#region users

export async function fetchUsers() {
  const url = `${API_URL}/users`
  return await axios.get(url,  {
    headers: {
      'AUTH-TOKEN': getToken()
    }
  }).then(response => response.data)
  .catch (e => {
    console.log(`request failed: ${e}`);
  })
}

export async function fetchUser(id) {
  const url = `${API_URL}/users/${id}`
  return await axios.get(url, {
    headers: {
      'AUTH-TOKEN': getToken()
    }
  }).then(response => response.data)
  .catch (e => {
    console.log(`request failed: ${e}`);
  })
}

export async function createUser(data) {
  const url = `${API_URL}/users`
  return await axios.post(url, {
    user: data
  }, {
    headers: {
      'AUTH-TOKEN': getToken()
    }
  }).then(response => response.data)
  .catch (e => {
    console.log(`request failed: ${e}`);
  })
}

export async function updateUser(id, data) {
  const url = `${API_URL}/users/${id}`
  return await axios.put(url, {
      user: data
  }, {
    headers: {
      'AUTH-TOKEN': getToken()
    }
  }).then(response => response.data)
  .catch (e => {
    console.log(`request failed: ${e}`);
  })
}
//#endregion

//#region courses

export async function fetchCourses(page=1) {
  let url = `${API_URL}/courses?`
  if (null !== page) {
    url += `page=${page}`
  }
  return await axios.get(url, {
    headers: {
      'AUTH-TOKEN': getToken()
    }
  }).then(response => response.data)
  .catch (e => {
    console.log(`request failed: ${e}`);
  })
}

export async function fetchCourse(id) {
  const url = `${API_URL}/courses/${id}`
  return await axios.get(url,  {
    headers: {
      'AUTH-TOKEN': getToken()
    }
  }).then(response => response.data)
  .catch (e => {
    console.log(`request failed: ${e}`);
  })
}

export async function deleteCourse(id) {
  const url = `${API_URL}/courses/${id}`
  return await axios.delete(url, {
    headers: {
      'AUTH-TOKEN': getToken()
    }
  }).then(response => response.data)
    .catch (e => {
      console.log(`request failed: ${e}`);
    })
}

export async function updateCourse(id, data) {
  const url = `${API_URL}/courses/${id}`
  return await axios.put(url, {
      course: data
  }, {
    headers: {
      'AUTH-TOKEN': getToken()
    }
  }).then(response => response.data)
  .catch (e => {
    console.log(`request failed: ${e}`);
  })
}

export async function createCourse(data) {
  // const course = data.data
  console.log(data)
  const url = `${API_URL}/courses`
  return await axios.post(url, {
    course:{title: data.title, description: data.description, },
  }, {
    headers: {
      'AUTH-TOKEN': getToken()
    }
  }).then(response => response.data)
  .catch (e => {
    console.log(`request failed: ${e}`);
  })
}


//#endregion

//#region events

export async function fetchEvent(id) {
  const url = `${API_URL}/events/${id}`
  return await axios.get(url,  {
    headers: {
      'AUTH-TOKEN': getToken()
    }
  }).then(response => response.data)
  .catch (e => {
    console.log(`request failed: ${e}`);
  })
}

export const fetchEvents = async () => {
  let data = {}
  const result = await axios.get(`${API_URL}/events`, {
    headers: {
      'AUTH-TOKEN': getToken()
    }
  })
  .then(response => {
    console.log('response:')
    console.log(response)
    data = response.data
    return data
  }).catch(error => console.log(error))
  return result
}

export async function createEvent(data) {
  // console.log(data)
  const url = `${API_URL}/events`
  // moment or not ...
  if (typeof data.start.format === 'function') {
    data.start = data.start.format()
  }
  if (typeof data.end.format === 'function') {
    data.end = data.end.format()
  }

  return await axios.post(url, {
      start: data.start,
      end: data.end,
      title: data.title,
      courses_id: (typeof data.coursesId !== 'undefined') ? Number(data.coursesId) : null,
  }, {
    headers: {
      'AUTH-TOKEN': getToken(),
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }).then(response => response.data)
  .catch (e => {
    console.log(`request failed: ${e}`);
  })
}

export const updateEvent = async (id, data) => {
  const url = `${API_URL}/events/${id}`
  return await axios.put(url, {
    event:{
      start: data.start,
      end: data.end,
      title: data.title,
      course_id: (typeof data.courseId !== 'undefined') ? Number(data.courseId) : null,
    },
  }, {
    headers: {
      'AUTH-TOKEN': getToken(),
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }).then(response => response.data)
  .catch (e => {
    console.log(`request failed: ${e}`);
  })

}

export async function deleteEvent(id) {
  const url = `${API_URL}/events/${id}`
  return await axios.delete(url, {
    headers: {
      'AUTH-TOKEN': getToken()
    }
  }).then(response => response.data)
    .catch (e => {
      console.log(`request failed: ${e}`);
    })
}

//#endregion
