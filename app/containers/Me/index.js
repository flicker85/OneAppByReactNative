import React, { Component } from "react";
import { StyleSheet, WebView, BackHandler } from 'react-native';

class Me extends Component {
  static navigationOptions = {
    header: null
  };

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  render() {
    return (
      <WebView
        scrollEnabled={true}
        source={ {uri: 'https://github.com/flicker85/OneAppByReactNative'} }
        style={styles.container}
        startInLoadingState={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Me;