import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Schedule, { Item } from './Schedule';
import {formatDateRange } from '../../../utils'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  section: {
    backgroundColor: '#eef',
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  text: {
    // backgroundColor: '#fff',
  }
});


const fetchData = () => {
  // placeholder for static data or by params in the future
  return []
}


const EventEntries = ({events}) => (
  <View>
    <Schedule>
      {events.map((event, i) => (
        <Item key={i} title={event.title} datetime={formatDateRange(event.start, event.end)}></Item>
      ))}
    </Schedule>
  </View>
);


// Create Document Component
const Doc = (props) => {
  const events = (props.data && props.data.length) ? props.data : fetchData()
  console.log(props.data)
  return <Document>
    <Page size="A4" wrap={true} orientation='portrait' style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>Termine</Text>
        <Text > </Text>
        {/* split 30 items per page*/}
        <EventEntries events={events} />
      </View>
    </Page>
  </Document>
}


export default Doc
