import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Nav from './src/Navigation';
import {store} from './src/Redux/Store';
import {Provider} from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <Nav />
    </Provider>
  );
}

const styles = StyleSheet.create({});
