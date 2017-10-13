import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Category } from '.././../../constant';
import { withNavigation } from 'react-navigation';

const ScreenWidth = Dimensions.get('window').width;

class ListItem extends Component {
  getType(data) {
    if(data.tag_list.length > 0) {
      return {
        title: data.tag_list[0].title,
        key: 'essay'
      };
    } else {
      return Category[data.category];
    }
  }

  handleClick = () => {
    const { navigation, data } = this.props;
    const { title, key } = this.getType(data);
    navigation.navigate('Detail', { id: data.item_id, title, key });
  }

  render() {
    const { style, date, data } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.handleClick}>
        <View style={[styles.wrap, style]}>
          <Text style={styles.category}>{`- ${this.getType(data).title} -`}</Text>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.author}>{`文 / ${data.author.user_name}`}</Text>
          <Image style={styles.img} source={{uri: data.img_url}} />
          <Text style={styles.summary}>{data.forward}</Text>
          <View style={styles.footer}>
            <Text style={styles.footerColor}>{date}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 10,
  },
  category: {
    color: '#797979',
    textAlign: 'center',
  },
  title: {
    color: '#333',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  author: {
    color: '#8a8a8a',
  },
  img: {
    height: 200,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
  },
  summary: {
    color: '#8a8a8a',
    lineHeight: 30,
    marginBottom: 40,
  },
  footer: {},
  footerColor: {
    color: '#acacac',
  }
});

export default withNavigation(ListItem);
