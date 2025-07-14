import CustomInput from '@/components/CustomInput'
import { images } from '@/constants'
import { Slot } from 'expo-router'
import React, { Component } from 'react'
import { Dimensions, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default class _layout extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView className='bg-white h-full' keyboardShouldPersistTaps='handled'>
          <View className='w-full relative' style={{height: Dimensions.get('screen').height / 2.25}}>
                <ImageBackground source={images.loginGraphic} className='size-full rounded-b-lg' resizeMode='stretch'/>
                <Image source={images.logo} className="self-center size-48 absolute -bottom-16 z-10"/>
          </View>

        <Slot/>
        </ScrollView>
        
      </KeyboardAvoidingView>
    )
  }
}
