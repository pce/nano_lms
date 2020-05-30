import React, {useState, useEffect} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Datetime from 'react-datetime'
import Spinner from 'react-bootstrap/Spinner'

import moment from 'moment'

import { fetchEvents, updateEvent, createEvent } from '../services'
import 'react-datetime/css/react-datetime.css'
import 'react-big-calendar/lib/sass/styles.scss'
// import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'


const localizer = momentLocalizer(moment)

// const resourceMap = [
//   { resourceId: 1, resourceTitle: 'Großer Raum' },
//   { resourceId: 2, resourceTitle: 'Kleiner Raum' },
//   { resourceId: 3, resourceTitle: 'Raum Oben' },
//   // { resourceId: 4, resourceTitle: 'Raum 4' },
// ]


export const CalendarPage = props => {

  const [ isModalVisible, setIsModalVisible ] = useState(false)
  const [ isModalCreateVisible, setIsModalCreateVisible ] = useState(false)
  const [ dataId, setDataId ] = useState(0)
  const [ data, setData ] = useState({events:[]})
  const [isLoading, setIsLoading] = useState(true);
  const [ newEvt, setNewEvt ] = useState({
    start:0,
    end:0,
    title:'',
  })

  // const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

  const convertDates = (data) => {
    const reviver = (key, value) => {
      let startDate = new Date(key['start'])
      let endDate = new Date(key['end'])
      let start = moment(startDate)
      let end = moment(endDate)
      // add end if same day : startDate.format('Ymd') == endDate.format('Ymd')
      key['title'] = key['title'] + " " + start.format('HH:mm') + "-" + end.format('HH:mm')
      // Calendar expects Date Objects
      key['start'] = startDate
      key['end'] = endDate
      return key;
    }
    data.events = data.events.map((k, v)=>reviver(k, v))
    return data
  }

  useEffect(() => {
    console.log("Calendar")
    fetchEvents().then(response => {
      console.log('response.data')
      console.log(response.data.events)
      if (response.data) {
        let data = convertDates(response.data)
        // let data = response.data
        setData({events:data.events})
      }
      setIsLoading(false)
    }).catch(e => console.log(e))
  }, [])

  const showEvtDia = (e, evt) => {
    console && console.log(data)
    setDataId(evt.id)
    setIsModalVisible(true)
    // isModalVisible,
    console && console.log(e, evt)
  }

  const showCreateEvtDia = ({start, end}) => {
    // console && console.log(evt)
    // setDataId(evt.id)
    let title = "new..."
    setNewEvt({
      start,
      end,
      title,
    })
    setIsModalCreateVisible(true)
    // todo preview?s
    setData({
      events: [
        ...data.events,
        {
          start,
          end,
          title,
        },
      ],
    })
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
    setIsModalCreateVisible(false)
  }

  const handleSaveCreateModal = (dataId) => {
    // console.log(eventById(dataId)
    createEvent(newEvt)
    setIsModalCreateVisible(false)
  }

  const handleInputDateStart = (event) => {
    setNewEvt({
      ...newEvt,
      'start': event,
    })
  }

  const handleInputDateEnd = (event) => {
    setNewEvt({
      ...newEvt,
      'end': event,
    })
  }

  const handleInputDate = (event, name) => {
    // see https://momentjs.com/docs/#/displaying/
    let value = event
    // if (event.format) {
    //   value = event.format();
    // }
    setData({
      ...data,
      [name]: value
    })
    // setIsMutated(true)
  }


  const handleSaveUpdateModal = (dataId) => {
    // console.log(eventById(dataId)
    updateEvent(eventById(dataId))
    setIsModalVisible(false)
  }

  const form = (evt) => {
    // return evt.start
    // console.log(evt.start) evt.start.toString()
    // resourceMap.map()
    return <>
      Start: <Datetime dateFormat="DD.MM.YYYY" value={evt.start}  onChange={(evt) => handleInputDate(evt, 'start')}   />
      End: <Datetime dateFormat="DD.MM.YYYY" value={evt.end}  onChange={(evt) => handleInputDate(evt, 'end')}   />
      {/*
      Raum: <select>
      {resourceMap.map((room) => {
        return (evt.resourceId !== room.resourceId) ?
        <option value={room.resourceId}>{room.resourceTitle}</option>
        :
        <option selected value={room.resourceId}>{room.resourceTitle}</option>


      })
      }</select>
       */}
    </>
  }

  const eventById = (id) => {
    return data.events.find(item => item.id === id)
  }

  return (
    (!isLoading) ?
    // parent container of calendar-month-view requires a min-height
    <div style={{ height: '100%', minHeight: 600, padding:'10px' }}>

    <Calendar
      localizer={localizer}
      events={data.events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      culture='de'
      selectable
      onSelectEvent={(evt, e)=> showEvtDia(e, evt)}
      onSelectSlot={(evt) => showCreateEvtDia(evt)}
      // views={allViews}
      // step={60}
      // showMultiDayTimes
      // defaultDate={new Date()}
      // resources={resourceMap}
      // resourceIdAccessor="resourceId"
      // resourceTitleAccessor="resourceTitle"
    />

    <Modal show={isModalVisible} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{dataId && eventById(dataId).title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{dataId && form(eventById(dataId))}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={() => { handleSaveUpdateModal(dataId) }} >
          Save Changes
        </Button>
      </Modal.Footer>
      </Modal>


      <Modal show={isModalCreateVisible} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{newEvt.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{
      (isModalCreateVisible &&
        <>
          <Datetime dateFormat="DD.MM.YYYY" value={newEvt.start}  onChange={handleInputDateStart}  />
          <Datetime dateFormat="DD.MM.YYYY" value={newEvt.end}  onChange={handleInputDateEnd} />
        </>

      )}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={() => { handleSaveCreateModal() }} >
          Save Changes
        </Button>
      </Modal.Footer>
      </Modal>



    </div>
   : <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  )
}
