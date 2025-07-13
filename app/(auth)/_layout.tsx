import { Slot } from 'expo-router'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default class _layout extends Component {
  render() {
    return (
      <SafeAreaView>
        <Text> Auth Layout </Text>
        <Slot/>
      </SafeAreaView>
    )
  }
}
