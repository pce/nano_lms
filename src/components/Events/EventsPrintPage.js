import React from 'react';
import { withRouter } from 'react-router-dom'
import { PDFViewer } from '@react-pdf/renderer';
import EventsPdf from './Pdf/Doc';


const fetchData = () => {
  return []
}

// Create Document Component
const EventsPrintPage = (props) => {

  console.log(props)

  const data=props.location.data || fetchData()

  return <PDFViewer style={{width:'100%',height:'100%',minHeight:'600px'}}>
    <EventsPdf data={data} />
  </PDFViewer>
}


export default withRouter(EventsPrintPage)
