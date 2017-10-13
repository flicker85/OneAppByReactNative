import React, { Component } from "react";
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, FlatList, View, } from 'react-native';
import Swiper from './components/Swiper';
import List from './components/List';
import { INIT, FETCH_TOPICS } from './redux/constants';


class All extends Component {
  static navigationOptions = {
    title: 'ONE IS ALL'
  };

  componentDidMount() {
    this.props.dispatch({ type: INIT });
  }

  refresh = (callback) => {
    this.props.dispatch({ type: INIT, callback });
  }

  appendTopics = (id) => {
    this.props.dispatch({ type: FETCH_TOPICS, id });
  }

  render() {
    const { swiper, topics } = this.props.all;
    return (
      <List
        style={styles.container}
        swiper={swiper}
        topics={topics}
        appendTopics={this.appendTopics}
        refresh={this.refresh}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
})

export default connect(state => ({ all: state.all }))(All);