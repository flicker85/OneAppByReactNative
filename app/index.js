import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppWithNavigationState from './containers/App';
import SplashScreen from 'react-native-splash-screen'

export default class extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={ this.props.store }>
        <AppWithNavigationState />
      </Provider>
    );
  }
}