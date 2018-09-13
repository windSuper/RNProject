/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import APP from './app/container/APP.js';

export default class TBetRN extends Component {
  render() {
    return (
      <APP/>
    );
  }
}


AppRegistry.registerComponent('TBetRN', () => TBetRN);
