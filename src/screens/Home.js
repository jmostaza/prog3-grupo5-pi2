import { Text, View , TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {auth, db} from '../firebase/config'
import { FlatList } from 'react-native-web';
import Posts from '../components/Posts';


export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    db.collection('posts').orderBy("createdAt", "desc").onSnapshot((docs) => {
      let posts = [];
      docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({posts: posts}, () => console.log(this.state.posts));
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>¡Bienvenido al Home!</Text>
        <Text style={styles.subtitle}>Estás en la página principal.</Text>
        {this.state.posts.length === 0 ? 
        (<Text style={styles.subtitle}>No hay posteos aún</Text>)
        :(<FlatList
        data= {this.state.posts}
        keyExtractor={item => item.id}
        renderItem={({item})=> <Posts postInfo={item}/>}
        />)
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8', 
    justifyContent: 'center', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#303841',
    marginBottom: 10, 
    textAlign: 'center', 
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30, 
    textAlign: 'center', 
    color: '#303841',
  },

});