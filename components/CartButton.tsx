import { images } from '@/constants';
import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Image} from 'react-native'

export default class CartButton extends Component {
totalItems = 10;

  render() {
    return (
    <TouchableOpacity className='cart-btn' onPress={()=>{}}>
        <Image source={images.bag} className='size-5' resizeMode='contain'/>

        {this.totalItems > 0 && (
            <View className='cart-badge'>
                <Text className='small-bold text-white'>{this.totalItems}</Text>
            </View>
        )}
    </TouchableOpacity>
    )
  }
}
