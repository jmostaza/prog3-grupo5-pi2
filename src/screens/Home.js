import { Text, View , TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'

export default class Home extends Component {
    constructor(){
        super();
    }

    render() {
    return (
      <View>
        <Text>Bienvenido al Home! </Text>
      </View>
    )
  }
}