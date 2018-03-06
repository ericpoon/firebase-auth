import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';
import { ROOT_URL } from '../config/cloud';

class SignInForm extends Component {
  state = { email: '', code: '', loggedIn: false };

  onSubmitPress = async () => {
    const { email, code } = this.state;
    try {
      const { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, { email, code });
      console.log(data.token);

      await firebase.auth().signInWithCustomToken(data.token);
      this.setState({ loggedIn: true });

    } catch (err) {
      console.log(err.message);
      console.log(err.response.data);
    }
  };

  render() {
    if (this.state.loggedIn) {
      return (
        <Text>Logged in successfully!</Text>
      );
    }
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
