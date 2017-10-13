import React from 'react';
import { StyleSheet, View, Image, Text, } from 'react-native';
import Swiper from 'react-native-swiper';

const Slide = props => {
  return (
    <View style={styles.slide}>
      <Image style={styles.image} source={{uri: props.uri}} />
    </View>
  );
}

export default function({ data }) {
  if(data.length === 0) return <View style={styles.wrapper}></View>;
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      loop={true}
      autoplay={true}
      autoplayTimeout={2}
      dotColor='rgba(255,255,255,.3)'
      activeDotColor='#fff'
    >
      { data.map((item, i) => <Slide uri={item.cover} key={item.id} />) }
    </Swiper>
  );
}

var styles = StyleSheet.create({
  wrapper: {
    height: 200,
    backgroundColor: '#f5f5f5',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    flex: 1,
    backgroundColor: 'transparent'
  },
})