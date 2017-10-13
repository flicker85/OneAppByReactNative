import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from 'react-native';

class Me extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}><Text style={styles.title}>ME</Text></View>
        <View style={styles.content}>
          <Text>this is me view.</Text>
          <Button
          onPress={() => this.props.navigation.navigate('Main')}
        title="to Main"
      />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titleBar: {
    height: 50,
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  content: {
    flex: 1
  },
});

export default Me;