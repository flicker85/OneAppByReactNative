import { AppRegistry } from 'react-native';
import React from 'react';
import OneApp from './app/index';
import configureStore from './app/store';

const store = configureStore();
AppRegistry.registerComponent("OneApp", () => () => <OneApp store={store} />);
