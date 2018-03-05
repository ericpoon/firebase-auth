import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import firebase from "firebase";

export default class App extends React.Component {
  componentDidMount() {
    const config = {
      apiKey: 'AIzaSyAHG5esRkxlYSKWq17fvBLEcI0-Q-KCeQY',
      authDomain: 'one-time-password-efa31.firebaseapp.com',
      databaseURL: 'https://one-time-password-efa31.firebaseio.com',
      projectId: 'one-time-password-efa31',
      storageBucket: 'one-time-password-efa31.appspot.com',
      messagingSenderId: '40240200873',
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
