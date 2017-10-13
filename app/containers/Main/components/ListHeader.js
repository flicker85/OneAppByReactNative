import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from 'react-native';

class ListHeader extends Component {
  render() {
    const { style, data } = this.props;
    return (
      <View style={[styles.wrap, style]}>
        <Image style={styles.img} source={{uri: data.img_url}} />
        <View style={{padding: 15, paddingTop: 10}}>
          <Text style={styles.author}>{`${data.title} | ${data.pic_info}`}</Text>
          <Text style={styles.summary}>{data.forward}</Text>
          <Text style={styles.info}>{data.words_info}</Text>
          <View style={styles.footer}>
            <Text style={styles.footerColor}>小记</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  img: {
    height: 200,
    backgroundColor: '#f5f5f5',
  },
  author: {
    color: '#8a8a8a',
    textAlign: 'center',
    marginBottom: 10,
  },
  summary: {
    color: '#333',
    lineHeight: 30,
    marginBottom: 30,
    paddingLeft: 15,
    paddingRight: 15
  },
  info: {
    color: '#8a8a8a',
    textAlign: 'center',
    marginBottom: 30,
  },
  footer: {},
  footerColor: {
    color: '#acacac',
  }
});

export default ListHeader;
