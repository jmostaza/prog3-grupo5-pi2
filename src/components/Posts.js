import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

export default class Posts extends Component {
  
    
    //logica del like
  
    render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} >Posteado por: {this.props.postInfo.data.email}</Text> 
        <Text style={styles.text}>{this.props.postInfo.data.post}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#303841",
    margin: 5,
    borderRadius:10
  },
  text:{
    color: "#EEEEEE"
  }
});