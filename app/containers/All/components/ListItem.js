import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Image, Text, } from 'react-native';
import { withNavigation } from 'react-navigation';

class ListItem extends PureComponent {
  handleClick = () => {
    const { data, navigation } = this.props;
    navigation.navigate('Topic', { id: data.content_id });
  }

  render() {
    const { data } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.handleClick}>
        <View style={styles.wrap}>
          <Image style={styles.image} source={{uri: data.cover}} />
          <Text style={styles.title}>{data.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

var styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#FFF',
    padding: 15,
    marginTop: 10,
  },
  image: {
    backgroundColor: '#f5f5f5',
    height: 200,
  },
  title: {
    color: '#8a8a8a',
    lineHeight: 30,
    marginBottom: 10,
  },
});

export default withNavigation(ListItem);