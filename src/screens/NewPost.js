import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { auth, db } from "../firebase/config";


export default class NewPost extends Component {
    constructor() {
        super()
        this.state = {
            post: "",
            errorMessage: ""
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (!user) {
                this.props.navigation.navigate('Login')
            }
        })
    }

    handlePost(post) {
        db.collection("posts").add({
            email: auth.currentUser.email,
            post: this.state.post,
            createdAt: Date.now(),
            likes:[]
        })
            .then(() => {
                console.log("Se agregó el post exitosamente")
                this.props.navigation.navigate("Home")
            })
            .catch(error => {
                this.setState({ errorMessage: error.message });
                alert(this.state.errorMessage);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Nuevo Posteo</Text>
                <Text style={styles.subtitle}>Completa los siguientes datos:</Text>

                <TextInput
                    style={styles.input}
                    placeholder='En qué estás pensando?'
                    onChangeText={(text) => this.setState({ post: text })}
                    value={this.state.post}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handlePost(this.state.post)}>
                    <Text style={styles.buttonText}>Crear Post</Text>
                </TouchableOpacity>
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 60,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#ffffff',
    },
    button: {
        backgroundColor: "#4F709C",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center",
        width: "auto",
        alignSelf: "center",
    },
    buttonText: {
        color: "#EEEEEE",
        fontWeight: "bold",
        fontSize: 16,
    },
});