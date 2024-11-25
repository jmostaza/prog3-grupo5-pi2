import { Text, View, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class SearchResults extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            filtro: "",
        }
    }
    componentDidMount() {
        db.collection("users").onSnapshot((docs) => {
            let usuarios = [];
            docs.forEach((doc) => {
                usuarios.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            this.setState({
                users: usuarios,
            })
        });
    }
    

    render() {
        const filterUsers = this.state.users.filter(user => user.data.email.includes(this.state.filtro))

        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Buscar usuario por email"
                        onChangeText={(text) => this.setState({ filtro: text })}
                        value={this.state.filtro}
                        style={styles.input}
                    />
                </View>
                {filterUsers.length === 0 && this.state.filtro.length > 0 ?
                    (<Text style={styles.noResultsText}>No hay un user</Text>) :
                    (<FlatList
                        style={styles.container}
                        data={filterUsers}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.userContainer}>
                                    <Text style={styles.email}>{item.data.email}</Text>
                                </View>
                            );
                        }}
                    />)
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f4f4f4', 
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: '#fff', 
    },
    noResultsText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#999',
    },
    userContainer: {
        backgroundColor: '#4B5563', 
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    email: {
        fontSize: 16,
        color: '#fff', 
    }
});
