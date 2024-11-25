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
                this.props.navigation.navigate('Login') 
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
            this.setState({error: error.message, errorEmail: error.message })
        })
    }
        
    }
  render() {
    return (
      <View style={styles.container}>
       <Text style={styles.title}>Register</Text>
       <Text style={styles.subtitle}>Estas en el register</Text>
       <TextInput style={styles.input} 
        keyboardType='email-address'
        placeholder='email'
        onChangeText={text=> this.setState({email: text})}
        value={this.state.email}
       />
       {this.state.errorEmail ? 
            <Text  style={styles.errorText} >{this.state.errorEmail}</Text> 
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
            <Text style={styles.errorText}>{this.state.errorPassword}</Text> 
                : null}
       
       <TouchableOpacity style={styles.button} disabled={!this.isFormValid()} onPress={()=> this.onSubmit()}> 
            <Text style={styles.buttonText} >Registrarme</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Ya tengo cuenta</Text>
       </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#303841",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#EEEEEE",
        textAlign: "center",
      },
      subtitle: {
        fontSize: 18,
        marginBottom: 30,
        color: "#EEEEEE",
        textAlign: "center",
      },
      input: {
        height: 50,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#4F709C",
        borderRadius: 8,
        marginVertical: 10,
        backgroundColor: "#3A4750",
        fontSize: 16,
        color: "#EEEEEE",
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
    errorText: {
        color: "#B22222",
        fontSize: 15,
        marginBottom: 10,
        fontStyle: "italic",
        fontWeight: "bold"
      },
     
  });