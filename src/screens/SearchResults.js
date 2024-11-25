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
            <View>
                <View>
                    <TextInput
                        placeholder="Buscar usuario por email"
                        onChangeText={(text) => this.setState({ filtro: text })}
                        value={this.state.filtro}
                    />
                </View>
                {filterUsers.length === 0 && this.state.filtro.length > 0 ?
                    (<Text>No hay un user</Text>) :
                    (<FlatList
                        data={filterUsers}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <Text>{item.data.email}</Text>
                                </View>
                            );
                        }}
                    />)
                }
            </View>
        )
    }
}