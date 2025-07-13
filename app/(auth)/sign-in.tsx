import { router } from 'expo-router'
import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

export default class SignIn extends Component {
  render() {
    return (
      <View>
        <Text> Sign In </Text>
        <Button title='Sign in' onPress={() => router.push("/(auth)/sign-up")}/>
      </View>
    )
  }
}
