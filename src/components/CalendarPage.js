import React, {useState, useEffect} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import DatePicker from "react-datepicker"

import moment from 'moment'

import { fetchEventsInRange, updateEvent, createEvent } from '../services'


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
  const [ dateRange, setDateRange ] = useState({start:null,end:null})
  const [isLoading, setIsLoading] = useState(true);
  const [ newEvt, setNewEvt ] = useState({
    start:0,
    end:0,
    title:'',
  })

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
    // console.log("Calendar")
    // -7 days or now -
    let start = dateRange.start && dateRange.start.toISOString() || moment().startOf('month').subtract(6, 'days').format('YYYY-MM-DD hh:mm');
    let end = dateRange.end && dateRange.end.toISOString() || moment().endOf('month').add(6, 'days').format('YYYY-MM-DD hh:mm');

    fetchEventsInRange(start, end).then(response => {
      // console.log('response.data')
      // console.log(response.data.events)
      if (response.data) {
        let data = convertDates(response.data)
        // let data = response.data
        setData({events:data.events})
      }
      setIsLoading(false)
    }).catch(e => console.log(e))
  }, [isLoading, dateRange])

  const showEvtDia = (e, evt) => {
    // console && console.log(data)
    setDataId(evt.id)
    setIsModalVisible(true)
    // isModalVisible,
    // console && console.log(e, evt)
  }

  const showCreateEvtDia = ({start, end}) => {
    let title = "new..."
    setNewEvt({
      start,
      end,
      title,
    })
    setIsModalCreateVisible(true)
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
    setIsModalCreateVisible(false)
  }

  const handleSaveCreateModal = (dataId) => {
    // console.log(eventById(dataId)
    createEvent(newEvt)
    setIsModalCreateVisible(false)
    // reload
    setIsLoading(true)
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

  const handleInput = (event) => {
    // console.log(data)
    const name = event.target.name
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;

    setNewEvt({
      ...newEvt,
      [name]: value,
    })

    // if name data_
    // setData({
    //   ...data,
    //   [name]: value
    // })
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

      Start:
      <DatePicker
        name="start"
        selected={evt.start}
        onChange={(evt) => handleInputDate(evt, 'start')}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy HH:mm"
      />

      Ende:
      <DatePicker
        name="end"
        selected={evt.end}
        onChange={(evt) => handleInputDate(evt, 'end')}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy HH:mm"
      />

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
      onRangeChange={(evt) => {
          // console.log('onRangeChange')
          // console.log(evt)
          setDateRange({start:evt.start, end:evt.end})
        }
      }
      // onNavigate={(evt) => {
      //     console.log('onNavigate')
      //     console.log(evt)
      //   }
      // }
      // onView={(evt) => {
      //     console.log('onView')
      //     console.log(evt)
      //   }
      // }

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
        <Modal.Title>
          <input type="text" value={newEvt.title} name="title" onChange={handleInput} style={{width:'100%'}} /><br/>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{
      (isModalCreateVisible &&
        <>
          Start:
          <DatePicker
            name="start"
            selected={newEvt.start}
            onChange={handleInputDateStart}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy HH:mm"
          />

          Ende:
          <DatePicker
            name="end"
            selected={newEvt.end}
            onChange={handleInputDateEnd}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy HH:mm"
          />
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
