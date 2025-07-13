import { router } from 'expo-router'
import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'

export default class SignUp extends Component {
  render() {
    return (
      <View>
        <Text> Sign up </Text>
        <Button title='Sign Up' onPress={() => router.push("/(auth)/sign-in")}/>
      </View>
    )
  }
}
