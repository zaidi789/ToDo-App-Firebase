import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Nav from './src/Navigation';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/Redux/Store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Nav />
      </PersistGate>
    </Provider>
  );
}
