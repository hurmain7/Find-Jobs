import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appnavigators } from './screens/navigators'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';

class App extends React.Component {
render() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Appnavigators />
      </PersistGate>
    </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
});

export default App;
