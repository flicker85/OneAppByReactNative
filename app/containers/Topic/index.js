import React, { Component } from "react";
import { StyleSheet, WebView, BackHandler } from 'react-native';
import { withNavigation } from 'react-navigation';
import { fetchTopic } from './services';

class Topic extends Component {
  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    headerStyle: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      overflow: 'hidden',
      elevation: 0,
      height: 50,
      backgroundColor: 'transparent',
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    const {state} = this.props.navigation;
    fetchTopic(state.params.id).then((data) => {
      this.setState({ data });
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  render() {
    const { data } = this.state;
    if(!data) return null;
    return (
      <WebView
        scrollEnabled={true}
        source={ {html: data.html_content} }
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 50,
    backgroundColor: '#fff',
  },
});

export default withNavigation(Topic);