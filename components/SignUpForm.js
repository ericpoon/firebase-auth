import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-one-time-password-efa31.cloudfunctions.net';

class SignUpForm extends Component {
  state = { email: '' };

  onSubmitPress = async () => { // use async/await (just syntactic sugar, doesn't change how JS runs/works)
    const { email } = this.state;

    try {
      await axios.post(`${ROOT_URL}/createUser`, { email });
      await axios.post(`${ROOT_URL}/requestOneTimePassword`, { email });
    } catch (err) {
      console.log(err.message);
      console.log(err.response.data);
    }
  };

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
        <Button title={'Submit'} onPress={this.onSubmitPress} />
      </View>
    );
  }
}

export default SignUpForm;
