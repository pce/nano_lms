import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  itemDatetime: {
    backgroundColor: '#fff',
    marginRight: '5px',
    padding: '5px',
    width: 150,
    fontSize: 10,
  },
  itemTitle: {
    backgroundColor: '#fff',
    marginRight: '5px',
    padding: '5px',
    flex: 1,
    fontSize: 10,
  },
});

const Schedule = ({ children }) => children

export const Item = ({ title, datetime }) => (
  <View style={styles.item}>
    <Text style={styles.itemDatetime}>{datetime}</Text>
    <Text style={styles.itemTitle}>{title}</Text>
  </View>
);

export default Schedule