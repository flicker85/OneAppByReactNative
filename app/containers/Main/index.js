import React, { Component } from "react";
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewPager from './components/ViewPager';
import { FETCH_MAIN_LIST, CHANGE_KEY } from './redux/constants';


class Main extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params ? navigation.state.params.title : '今天',
    // tabBarVisible: false,
  })

  fetchListByDay = (date, callback) => {
    if(date) {
      const { dispatch, oneList: { list } } = this.props;
      const data = list[date];
      if(data) {
        dispatch({ type: CHANGE_KEY, date, callback });
      } else {
        dispatch({ type: FETCH_MAIN_LIST, date, callback });
      }
    } else {
      this.props.dispatch({ type: FETCH_MAIN_LIST, callback });
    }
  }

  render() {
    const { key, list } = this.props.oneList; 
    return (
      <ViewPager
        date={key}
        data={list[key]}
        fetchListByDay={this.fetchListByDay}
        navigation={this.props.navigation}
      />
    );
  }

}

export default connect(state => ({ oneList: state.oneList }))(Main);