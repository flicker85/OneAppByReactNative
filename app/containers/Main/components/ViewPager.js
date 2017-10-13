import React, { Component } from 'react';
import { StyleSheet, View, PanResponder, Dimensions, Animated, Easing, Text, InteractionManager } from 'react-native';
import ListByDay from './ListByDay';
import formatDate from '../../../utils/formatDate';

const ScreenWidth = Dimensions.get('window').width;

class ViewPager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevOffsetX: new Animated.Value(0),
      currentOffsetX: new Animated.Value(0),
    };
    this.loading = true;
    this.firstPage = null,
    this.state.prevOffsetX.setOffset(-ScreenWidth);
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const dx = gestureState.dx;
        if(!this.loading && Math.abs(dx) > Math.abs(gestureState.dy)) {
          if(dx < 0) {
            return true;
          } else if(dx > 0 && this.props.date && this.props.date !== this.firstPage) {
            return true;
          }
        }
        return false;
      },
      onPanResponderMove: (evt, gestureState) => {
        return Animated.event([null, {
          dx: gestureState.dx > 0 ? this.state.prevOffsetX : this.state.currentOffsetX
        }])(evt, gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        const dx = gestureState.dx;
        const vx = gestureState.vx;

        if(Math.abs(dx) > ScreenWidth/2 || Math.abs(vx) > 0.8) {
          this.loading = true;
          if(dx < 0) {
            Animated.timing(
              this.state.currentOffsetX,
              {
                toValue: -ScreenWidth,
                duration: 300,
                easing: Easing.linear
              }
            ).start(() => {
              this.loading = true;
              this.getListByDay('next');
            });
          } else if(dx > 0) {
            Animated.timing(
              this.state.prevOffsetX,
              {
                toValue: ScreenWidth,
                duration: 300,
                easing: Easing.linear
              }
            ).start(() => {
              this.loading = true;
              this.getListByDay('prev');
            });
          }
        } else {
          if(dx < 0) {
            Animated.timing(
              this.state.currentOffsetX,
              {
                toValue: 0,
                duration: 300,
                easing: Easing.linear
              }
            ).start();
          } else if(dx > 0) {
            Animated.timing(
              this.state.prevOffsetX,
              {
                toValue: 0,
                duration: 300,
                easing: Easing.linear
              }
            ).start();
          }
        }
      },
    });
  }

  componentDidMount() {
    this.props.fetchListByDay(null, key => {
      this.firstPage = key;
      this.loading = false;
    });
  }

  getListByDay = (type) => {
    const { date, fetchListByDay, navigation } = this.props;
    let d = new Date(date);
    let dateStr = '';
    switch (type) {
      case "next":
        d.setDate(d.getDate() - 1);
        dateStr = formatDate(d);
        navigation.setParams({ title: dateStr.replace(/-/g, ' / ') });
        fetchListByDay(dateStr, () => {
          this.state.currentOffsetX.setValue(0);
          this.loading = false;
          // InteractionManager.runAfterInteractions(() => {
          //   this.state.currentOffsetX.setValue(0);
          //   this.loading = false;
          // });
        });
        break;
      case "prev":
        d.setDate(d.getDate() + 1);
        dateStr = formatDate(d);
        navigation.setParams({ title: dateStr.replace(/-/g, ' / ') });
        fetchListByDay(dateStr, () => {
          this.state.prevOffsetX.setValue(0);
          this.loading = false;
          // InteractionManager.runAfterInteractions(() => {
          //   this.state.prevOffsetX.setValue(0);
          //   this.loading = false;
          // });
        });
        break;
    }
  }

  render() {
    const { date, data } = this.props;
    if(date === null) {
      return (
        <View style={styles.container}>
          <View style={[styles.page, styles.loading]}>
            <Text>Loading</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={styles.container}
          {...this.panResponder.panHandlers}
        >
          <View style={[styles.page, styles.loading]}>
            <Text>Loading...</Text>
          </View>
          <Animated.View
            style={[styles.page, styles.current, {left: this.state.currentOffsetX}]}
          >
            { data ? <ListByDay key={data.id} data={data} /> : <Text>Loading.......</Text> }
          </Animated.View>
          <Animated.View
            style={[styles.page, styles.loading, {left: this.state.prevOffsetX}]}
          >
            <Text>Loading...</Text>
          </Animated.View >
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  current: {
    backgroundColor: '#EEE',
  },
  page: {
    position:'absolute',
    width: ScreenWidth,
    height: '100%',
  },
});

export default ViewPager;