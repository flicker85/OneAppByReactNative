import React, { Component } from "react";
import { StyleSheet, FlatList } from 'react-native';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import formatDate from '../../../utils/formatDate';

class ListByDay extends Component {
  getDateStr(date) {
    const d = formatDate(date);
    if(formatDate(new Date()) === d) {
      return '今天';
    } else {
      let arr = d.split('-');
      return `${parseInt(arr[1])}月${parseInt(arr[2])}日`;
    }
  }

  render() {
    const { date, content_list: list } = this.props.data;
    const dateStr = this.getDateStr(date);
    return (
      <FlatList
        ref={component => this.flatList = component}
        showsVerticalScrollIndicator={false}
        keyExtractor={ item => item.id }
        ListHeaderComponent={<ListHeader data={list[0]} />}
        data={list}
        renderItem={({item, index}) => index > 0 ? <ListItem date={dateStr} data={item} style={index === list.length - 1 ? { marginBottom: 0 } : {} } /> : null}
      />
    );
  }
}

export default ListByDay;