//  Ivan Golikov 2018

import React from 'react';
import {Component} from 'react';
import {Alert, NavigatorIOS, StyleSheet, Button, View} from 'react-native';
import {LaunchScene} from './scenes/LaunchScene';

export default class App extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: LaunchScene,
          title: 'Welcome to SwadeshNess',
          passProps: {index: 1},
        }}
        style={{flex: 1}}
      />
    );
  }
}
