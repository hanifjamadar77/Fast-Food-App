import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import seed from "@/lib/seed";

const Search = () => {
  return(
    <SafeAreaView>
      <Text>Search</Text>

      <Button title='Seed' onPress={() => seed().catch((error) => console.log('Failed to seed the database.', error))} />
    </SafeAreaView>
  )
}

export default Search
