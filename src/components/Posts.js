import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { auth, db } from "../firebase/config";
import AntDesign from "@expo/vector-icons/AntDesign";
import firebase from "firebase";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      cantLikes: this.props.postInfo.data.likes.length, //EL ERROR ESTA ACA!!
    };
  }
  componentDidMount() {
    if (this.props.postInfo.data.likes.includes(auth.currentUser.email)) {
      this.setState({
        liked: true,
        cantLikes: this.props.postInfo.data.likes.length,
      });
    }
  }
  like() {
    db.collection("posts")
      .doc(this.props.postInfo.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        this.setState({
          liked: true,
          cantLikes: this.state.cantLikes + 1,
        });
      });
  }
  unLike() {
    db.collection("posts")
      .doc(this.props.postInfo.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then(() => {
        this.setState({
          liked: false,
          cantLikes: this.state.cantLikes - 1,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>{this.props.postInfo.data.post}</Text>
        <Text style={styles.email}>
          Posteado por: {this.props.postInfo.data.email}
        </Text>
        {this.state.liked ? (
          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => this.unLike()}
          >
            <AntDesign name="like1" size={24} color="#007AFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => this.like()}
          >
            <AntDesign name="like2" size={24} color="#A9A9A9" />
          </TouchableOpacity>
        )}
        <Text style={styles.likeCount}>{this.state.cantLikes} Likes</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#303841",
    margin: 5,
    borderRadius: 10,
  },
  message: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "white",
    marginBottom: 5,
  },
  likeButton: {
    padding: 5,
    marginRight: 8,
  },
  likeCount: {
    fontSize: 14,
    color: "white",
  },
});
