import { Redirect, Slot } from 'expo-router'
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class _layout extends Component {
  render() {
    const isAuthenticated = false; // Replace with actual authentication logic

    if(!isAuthenticated) {
        return(
            <Redirect
                href="/(auth)/sign-in"/>
        )
    }
    return <Slot/>
  }
}
