import { useContext, useState } from "react"
import { Alert, Image, ImageBackground, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import axiosClient from "../api/axiosClient"
import { AuthContext } from '../context/Authcontext'
const Login = ({navigation}) => {
    const [email,setEmail] = useState('vuongspros@gmail.com')
    const [errEmail,setErrEmail] = useState('')
    const [password,setPassword] = useState('Password1!')
    const [errPassword,setErrPassword] = useState('')
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
                setErrEmail('Email không đúng định dạng')
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


    const handleLogin = async () => {
        dispatch({ type: "LOGIN_START" });
        const user = {
            email: email,
            password: password
        }
        if(!isEmail(email) || !isPassword(password)) return;
        try {
            const res = await axiosClient.post("/v1/api/auth/login",user)
            dispatch({ type: "LOGIN_SUCCESS", payload: res })
            navigation.navigate('UITab')
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE" });    
            console.log(error.response.data);
            if(error.response.data === "Wrong email" || error.response.data === "Wrong password"){
                Alert.alert("Warning", "Tên tài khoản hoặc mật khẩu không chính xác.", [
                    {
                      text: "OK",
                      style: "cancel",
                    },
                  ]);
            }
        }
    }
    return (
        
        <SafeAreaView style={{flex: 1}}>
        <View style={styles.introduce}>
            <Image source={image} resizeMode="cover" style={styles.image}/>
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
            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                <Text style={{color: '#fff',fontSize: 20,fontWeight: 'bold'}}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reg} onPress={()=>navigation.navigate('Register')}>
                <Text style={{color: 'rgb(221,98,255)'}}>Đăng kí ngay</Text>
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

export default Login