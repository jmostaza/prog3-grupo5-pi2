import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import {auth, db} from '../firebase/config'


export default class Register extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName: '',
            password: '',
            registered: false,
            errorEmail: '',
            errorPassword: '',
            errorUserName: '',
            error:''
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged(user=> {
            if(user){
                this.props.navigation.navigate('HomeMenu') 
            }
        })
    }
    validateEmail(email) {
        return email.includes('@');
    }

    validatePassword(password) {
        return password.length >= 6;
    }

    validateUserName(userName) {
        return userName !== '';
    }

    HandleEmail() {
        const { email } = this.state;

        if(email === '') {
            this.setState({ errorEmail: 'El campo de email no puede estar vacío.' })
            return false;
        } else if(!this.validateEmail(email)) {
            this.setState({ errorEmail: 'Email mal formateado, falta el @' })
            return false;
        } else {
            this.setState({ errorEmail: '' })
            return true;
        }
    
    }
    HandlePassword() {
        const { password } = this.state;

        if(password === '') {
            this.setState({ errorPassword: 'El campo de contraseña no puede estar vacio.' })
            return false;
        } else if(!this.validatePassword(password)) {
            this.setState({ errorPassword: 'La contraseña debe tener una longitud mínima de 6 caracteres' })
            return false;
        } else {
            this.setState({ errorPassword: '' })
            return true;
        }
    }
    isFormValid(){
        const {email, password, userName} = this.state
        return email !== '' && password !== '' && userName !== ''
      }
    onSubmit(){
        const isEmailValid= this.HandleEmail()
        const isPasswordValid= this.HandlePassword()
        if(isEmailValid && isPasswordValid ){
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=> {this.setState({registered: true});
            db.collection('users').add({
                email: this.state.email,
                userName: this.state.userName,
                password: this.state.password,
                createdAt: Date.now()
            })
            
        })
        .then(()=> this.props.navigation.navigate('Login')) 
        .catch((error)=> {
            console.log(error);
            this.setState({error: error.message })
        })
    }
        
    }
  render() {
    return (
      <View style={styles.container}>
       <Text style={styles.title}>REGISTER</Text>
       <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
        <Text style={styles.link}>Ya tengo cuenta</Text>
       </TouchableOpacity>
       <TextInput style={styles.input} 
        keyboardType='email-address'
        placeholder='email'
        onChangeText={text=> this.setState({email: text})}
        value={this.state.email}
       />
       {this.state.errorEmail ? 
            <Text >{this.state.errorEmail}</Text> 
                : null}
        <TextInput style={styles.input} 
        placeholder='user'
        onChangeText={text=> this.setState({userName: text})}
        value={this.state.userName}
       />
       <TextInput style={styles.input} 
        keyboardType='password'
        placeholder='password'
        secureTextEntry={true}
        onChangeText={text=> this.setState({password: text})}
        value={this.state.password}
       />
       {this.state.errorPassword ? 
            <Text >{this.state.errorPassword}</Text> 
                : null}
       <TouchableOpacity style={styles.boton} disabled={!this.isFormValid()} onPress={()=> this.onSubmit()}> 
            <Text style={styles.text} >Registrarme</Text>
       </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      marginTop: 20,
      flex:1
    },
    input: {
      height: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderStyle: "solid",
      borderRadius: 6,
      marginVertical: 10,
    },
    boton: {
      backgroundColor: "#28a745",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#28a745",
    },
    text:{
      color:"white",
      textAlign: "center",
      fontWeight: "bold"
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 20,
      color: '#666',
    },
    link: {
      marginTop: 5,
      color: '#007bff',
      fontSize: 16,
      fontStyle: "italic"
    }
  });