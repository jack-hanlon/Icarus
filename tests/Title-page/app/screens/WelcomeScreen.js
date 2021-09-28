import React from 'react';
import {Button,TouchableOpacity,Text,View,ImageBackground, StyleSheet,Image} from 'react-native'

function WelcomeScreen(props) {
  return (
    <View style={styles.background}>
    <View style={styles.logoContainer}>
    <Image style={styles.logo} source={require('../assets/icarus.jpg')}/>
    <Text style={styles.logoText}>ICARUS</Text>
    </View>
    <View style={styles.loginButton}><Text style={styles.loginText}>LOGIN</Text></View>
    <View style={styles.registerButton}><Text style={styles.registerText}>REGISTER</Text></View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loginButton: {
    width: '100%',
    height: 70,
    backgroundColor: '#fc5c65'
  },
  registerButton: {
    width: '100%',
    height: 70,
    backgroundColor: '#4ecdc4'
  },
  logo: {
    width: 150,
    height: 150,
    right: 20,

  },
  logoContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center',
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "#fff",
    left: 180,
    top: 20,
  },
  registerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "#000",
    left: 165,
    top: 20,
  }
})

export default WelcomeScreen;
