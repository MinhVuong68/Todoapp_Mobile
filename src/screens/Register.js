import { useContext, useState } from "react"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Alert, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import axiosClient from "../api/axiosClient"
import { AuthContext } from '../context/Authcontext'
const Register = ({navigation}) => {
    const [email,setEmail] = useState('vuongspros@gmail.com')
    const [errEmail,setErrEmail] = useState('')
    const [password,setPassword] = useState('Password1!')
    const [errPassword,setErrPassword] = useState('')
    const [rePassword,setRePassword] = useState('')
    const [errRePassword,setErrRePassword] = useState('')
    const {user,dispatch} = useContext(AuthContext)
    const image = require('../assets/avalogin.png')


   

    const isEmail = (email) => {
        setEmail(email)
       if(email.length===0) {
            setErrEmail('Email không được để trống!')
            return false
       } else {
            var re = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
            if(re.test(email)===false){
                setErrEmail('Email không đúng định dạng!')
                return false
            } 
       }
       setErrEmail('')
       return true
    }

    const isPassword = (password) => {
        setPassword(password)
        if(password.length===0) {
             setErrPassword('Mật khẩu không được để trống!')
             return false
        } else {
             var re = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
             if(re.test(password)===false){
                 setErrPassword('"Mật khẩu phải bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 ký tự')
                 return false
             }
        }
        setErrPassword('')
        return true
     }

     const isRePassword = (rePassword) => {
        setRePassword(rePassword)
        if(rePassword.length===0) {
            setErrRePassword('Mật khẩu không được để trống!')
            return false
        } else {
            if(rePassword!==password) {
                setErrRePassword('Mật khẩu không trùng khớp!')
                return false
            }
        }
        setErrRePassword('')
        return true;
     }

    const handleRegister = async () => {
        const user = {
            email: email,
            password: password
        }
        if(!isEmail(email) || !isRePassword(password) || !isRePassword(rePassword)) return;
        try {
            const res = await axiosClient.post("/v1/api/auth/register",user)
            dispatch({ type: "LOGIN_SUCCESS", payload: res })
            Alert.alert("Thành công", "Đăng kí tài khoản thành công.", [
                {
                  text: "OK",
                  style: "cancel",
                },
            ]);
            navigation.navigate('UITab')
        } catch (error) {
            Alert.alert("Thất bại", "Email này đã tồn tại.", [
                {
                  text: "OK",
                  style: "cancel",
                },
            ]);
        }
    }
    return (
        <SafeAreaView style={{flex: 1}}>
        <View style={styles.introduce}>
            <Image source={image} resizeMode="cover" style={styles.image}/>
            <View style={{height: 36,flexDirection: 'row',justifyContent: 'flex-end',alignContent: 'center',position: 'absolute', left: 10, top: 10}}>
              <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
               <Ionicons
                  name="arrow-back"
                  color='#000'
                  size={35}
               />
            </TouchableOpacity>
         </View>
        </View>
        <View style={styles.form}>
            <View style={styles.formControl}>
                <TextInput 
                    style={styles.ipt}
                    value={email}
                    onChangeText={(text)=> isEmail(text)}
                    placeholder="Email"
                />
                 {!!errEmail && <Text style={{color: 'red'}}>{errEmail}</Text>}
            </View>
            <View style={styles.formControl}>
                <TextInput
                    style={styles.ipt}
                    value={password}
                    onChangeText={(text)=> isPassword(text)}
                    placeholder="Mật khẩu"
                    secureTextEntry={true}
                />
                {!!errPassword && <Text style={{color: 'red'}}>{errPassword}</Text>}
               
             </View>
             <View style={styles.formControl}>
                <TextInput
                    style={styles.ipt}
                    value={rePassword}
                    onChangeText={(text)=> isRePassword(text)}
                    placeholder="Nhập lại mật khẩu"
                    secureTextEntry={true}
                />
                {!!errRePassword && <Text style={{color: 'red'}}>{errRePassword}</Text>}
               
             </View>
            <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                <Text style={{color: '#fff',fontSize: 20,fontWeight: 'bold'}}>Đăng kí</Text>
            </TouchableOpacity>
            
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    introduce: {
        flex: 1, 
        
    },
    image: {
        width: '100%',
        height: '100%'
        
    },
    form: {
        flex: 1,
        marginTop: 30,
        paddingHorizontal: 20
    },
    formControl:{
        marginBottom: 20,
    },
    ipt: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8
    },
    btn: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(221,98,255)',
        marginBottom: 10
    },
    reg: {
        alignItems: 'center'
    }
});

export default Register