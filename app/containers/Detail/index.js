import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Text, BackHandler, WebView, Dimensions, Animated, Easing, PixelRatio } from 'react-native';
import { withNavigation } from 'react-navigation';
import { fetchArticle } from './services';

const ScreenHeight = Dimensions.get('window').height;

class Detail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    gesturesEnabled: true,
    headerStyle: {
      position: 'absolute',
      top: (!navigation.state.params.animatedValue ? 0 : navigation.state.params.animatedValue),
      left: 0,
      right: 0,
      overflow: 'hidden',
      elevation: 0,
      borderBottomWidth: 1/PixelRatio.get(),
      borderBottomColor: '#e8e8e8',
      height: 50,
    },
  });

  constructor(props) {
    super(props);
    this._animatedValue = new Animated.Value(0);
    this.lastOffsetY = 0;
    this.initTitle = props.navigation.state.params.title;
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
    fetchArticle(state.params.id, state.params.key).then((data) => {
      this.setState({ data });
    });

    this.props.navigation.setParams({animatedValue: this._animatedValue});
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  onMessage = (e) => {
    this.setState({
      height: parseInt(e.nativeEvent.data)
    })
  }

  handleScroll = (e) => {
    const { navigation } = this.props;
    const y = e.nativeEvent.contentOffset.y > 0 ? e.nativeEvent.contentOffset.y : 0;
    if(y > 150) {
      if(navigation.state.params.title == this.initTitle) {
        // InteractionManager.runAfterInteractions(() => {
        //   navigation.setParams({title: this.state.data.title});
        // });
        navigation.setParams({title: this.state.data.title});
      }
    } else {
      if(navigation.state.params.title != this.initTitle) {
        // InteractionManager.runAfterInteractions(() => {
        //   navigation.setParams({title: this.initTitle});
        // });
        navigation.setParams({title: this.initTitle});
      }
    }

    if(y - this.lastOffsetY > 0 && this.scrollDirection != 'down') {
      this.scrollDirection = 'down';
      Animated.timing(
        this._animatedValue,
        {
          toValue: -50,
          duration: 200,
          easing: Easing.linear
        }
      ).start();
    } else if(y - this.lastOffsetY < 0 && this.scrollDirection != 'up') {
      this.scrollDirection = 'up';
      Animated.timing(
        this._animatedValue,
        {
          toValue: 0,
          duration: 200,
          easing: Easing.linear
        }
      ).start();
    }
    this.lastOffsetY = y;
  }

  render() {
    const { data } = this.state;
    if(!data) return null;
    let jsCode = '__REACT_WEB_VIEW_BRIDGE.postMessage(document.documentElement.scrollHeight);';
    return (
      <ScrollView
        style={styles.container}
        onScroll={this.handleScroll}
      >
        <WebView
          scrollEnabled={false}
          source={ {html: data.html_content} }
          style={ {height: this.state.height} }
          onMessage = { this.onMessage }
          javaScriptEnabled={ true }
          injectedJavaScript = { jsCode }
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
});

export default withNavigation(Detail);