import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'

export default class Profile extends Component {
  constructor(props) {
    super()
    this.state = {
      postUsuario: [],
      userName: ""
    }
  }
  componentDidMount() {
    db.collection("posts").where('email', '==', auth.currentUser.email).onSnapshot((docs) => {
      let posts = [];
      docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      console.log(posts);
      this.setState({
        postUsuario: posts
      })
    })
    db.collection('users').where('email', '==', auth.currentUser.email).onSnapshot(docs => {
      let users = [];
      docs.forEach((doc) => {
        users.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      console.log('useeer',users[0]);
      this.setState({
        userName : users[0].data.userName
      })
    })

  }
  handleLogOut() {
    auth.signOut().then(this.props.navigation.navigate("Login"));
  }
  deletePost(postId) {
    console.log("Intentando eliminar post con ID:", postId);
    db.collection("posts")
      .doc(postId)
      .delete()
      .then(() => {
        console.log("Post eliminado con éxito");

        this.setState({
          postUsuario: this.state.postUsuario.filter(post => post.id !== postId)
        });
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }
  render() {
    console.log("Estado actual de postUsuario:", this.state.postUsuario);
    return (
      <View style={styles.container}>
         <Text style={styles.title}> Usuario: {this.state.userName}</Text>
        <Text style={styles.title}>Email: {auth.currentUser.email}</Text>
        <Text style={styles.title}> Cantidad de posteos: {this.state.postUsuario.length}</Text>

        <FlatList
          style={styles.flatlist}
          data={this.state.postUsuario}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Text style={styles.flat}>{item.data.post}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => this.deletePost(item.id)}
              >
                <Text style={styles.logoutText}>Eliminar Post</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => this.handleLogOut()}
        >
          <Text style={styles.logoutText}>Desloguearme</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f9fc",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1E293B",
    textAlign: "center",
    
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#666",
  },
  logoutButton: {
    backgroundColor: "#4F709C",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "#4B5563",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  flatlist: {
    width: "100%",
    flex: 1,
  },
  flat: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    color: 'black',
    backgroundColor: "#f0f0f0",
    borderColor: "#dddddd",
    borderWidth: 1,
    marginTop: 5,
  },
});