import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Schedule, { Item } from './Schedule';
import {formatDateRange } from '../../../utils'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// TODO by course, month ?

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

  console.log(props.data)
  return <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Termine</Text>
        <Text> </Text>
        <EventEntries events={props.data} />
      </View>

    </Page>
  </Document>
}


export default Doc
