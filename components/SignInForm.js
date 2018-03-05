import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';
import { ROOT_URL } from '../config/cloud';

class SignInForm extends Component {
  state = { email: '', code: '' };

  onSubmitPress = async () => {
    const { email, code } = this.state;
    try {
      let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, { email, code });
      console.log(data.token);

      firebase.auth().signInWithCustomToken(data.token);

    } catch (err) {
      console.log(err.message);
      console.log(err.response.data);
    }
  };

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
      <View>
        <View style={{ marginBottom: 15 }}>
          <FormLabel>Enter Email Address</FormLabel>
          <FormInput
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </View>
        <View style={{ marginBottom: 15 }}>
          <FormLabel>Enter Code</FormLabel>
          <FormInput
            value={this.state.code}
            onChangeText={code => this.setState({ code })}
          />
        </View>
        <Button title={'Submit'} onPress={this.onSubmitPress} />
      </View>
    );
  }
}

export default SignInForm;
