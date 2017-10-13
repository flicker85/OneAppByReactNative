import React, { Component } from "react";
import { connect } from 'react-redux';
import { TabNavigator, StackNavigator, addNavigationHelpers } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, PixelRatio } from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

import Main from '../Main';
import All from '../All';
import Me from '../Me';
import Detail from '../Detail';
import Topic from '../Topic';

const TabContainer = TabNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      tabBarLabel: 'ONE',
      tabBarIcon: ({ focused, tintColor }) => {
        return focused ? <Icon name="circle-o" size={ 22 } color={tintColor} /> : <Icon name="circle-thin" size={ 22 } color={tintColor}/>;
      },
    }
  },
  All: {
    screen: All,
    navigationOptions: {
      tabBarLabel: 'ALL',
      tabBarIcon: ({ focused, tintColor }) => {
        return focused ? <Icon name="folder-open" size={ 22 } color={tintColor} /> : <Icon name="folder-o" size={ 22 } color={tintColor}/>;
      },
    }
  },
  Me: {
    screen: Me,
    navigationOptions: {
      tabBarLabel: 'ME',
      tabBarIcon: ({ focused, tintColor }) => {
        return focused ? <Icon name="user" size={ 22 } color={tintColor} /> : <Icon name="user-o" size={ 22 } color={tintColor}/>;
      },
    }
  }
},
{
  lazy: true,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  // initialRouteName: 'All',
  tabBarOptions: {
    activeTintColor: '#333',
    inactiveTintColor: '#333',
    showIcon: true,
    upperCaseLabel: true,
    pressColor: 'transparent',
    tabStyle: {
      padding: 0
    },
    indicatorStyle: {
      opacity: 0,
      height: 0,
    },
    labelStyle: {
      fontWeight: 'bold',
      marginTop: 0,
      marginBottom: 2,
    },
    style: {
      borderTopWidth: 1/PixelRatio.get(),
      borderTopColor: '#ececec',
      backgroundColor: '#fff'
    },
  }
});

export const AppNavigator = StackNavigator({
  Home: {
    screen: TabContainer
  },
  Detail: {
    screen: Detail,
  },
  Topic: {
    screen: Topic,
  }
}, {
  navigationOptions: {
    headerStyle: {
      elevation: 0,
      borderBottomWidth: 1/PixelRatio.get(),
      borderBottomColor: '#e8e8e8',
      height: 50,
    },
  },
  transitionConfig: () => ({
    screenInterpolator: CardStackStyleInterpolator.forHorizontal,
  })
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

export default connect(state => ({ nav: state.nav }))(AppWithNavigationState);