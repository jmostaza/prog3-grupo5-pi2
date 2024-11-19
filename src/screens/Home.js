import { Text, View , TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {auth, db} from '../firebase/config'

export default class Home extends Component {
    constructor(){
        super();
    }

    render() {
    return (
      <View>
        <Text>Bienvenido al Home! </Text>
        <TouchableOpacity
          
          onPress={() => {
            auth
              .signOut()
              .then(() => {
                this.props.navigation.navigate("Login");
              })
              .catch((error) =>
                console.error("Error al cerrar sesión:", error)
              );
          }}
        >
          <Text >Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
