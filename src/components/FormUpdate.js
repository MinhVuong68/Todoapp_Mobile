import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'


const FormUpdate = (props) => {
    console.log(props.user.fullname);
    const [fullname,setFullname] = useState(props.user.fullname)
    const [address,setAddress] = useState('')
    const [birthday,setBirthday] = useState('')
  
    const handleUpdateMe = async () => {
        try {
            await axiosClient.put(`/v1/api/user/${props.user._id}`,{
                fullname: fullname,
                birthday: birthday,
                address: address
            })
            props.setModalIsOpen(false)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Modal
            isVisible={props.modalIsOpen}
            onBackButtonPress={()=>props.setModalIsOpen(false)}
        >
            <View style={styles.contentW}>
                <View style={styles.form}>
                    <TouchableOpacity style={{alignItems: 'center',marginBottom: 20}}>
                        <Image
                            style={styles.ava}
                            source={require('../assets/WIN_20210725_07_22_52_Pro.jpg')}
                            resizeMode='cover'
                        />
                    </TouchableOpacity>
                    <View style={{marginBottom: 10}}>
                        <Text>Họ và tên:</Text>
                        <TextInput 
                            style={styles.ipt}
                            onChangeText={setFullname}
                            value={fullname}
                        />
                    </View>
                    <View style={{marginBottom: 10}}>
                        <Text>Địa chỉ:</Text>
                        <TextInput
                            style={styles.ipt}
                            onChangeText={setAddress}
                            value={address}
                        />
                    </View>
                    <View style={{marginBottom: 10}}>
                        <Text>Ngày sinh:</Text>
                        <TextInput
                            style={styles.ipt}
                            onChangeText={setBirthday}
                            value={birthday}
                        />
                    </View>
                    <TouchableOpacity style={styles.btnUpdate} onPress={handleUpdateMe}>
                        <Text style={{color: '#fff',fontWeight: 'bold'}}>Cập nhật</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    contentW: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        width: '90%',
        padding: 20,
        backgroundColor: '#fff'
    },
    ava: {
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: 50
    },
    ipt: {
        borderColor: '#ccc',
        borderWidth: 1
    },
    btnUpdate: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'rgb(108,38,134)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FormUpdate