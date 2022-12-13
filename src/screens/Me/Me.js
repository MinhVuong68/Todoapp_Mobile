import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"


const Me = ({navigation}) => {
    return (
        <View style={styles.wrapper}>
            <View>
                <View style={styles.ava}>
                    <Image
                        source={require('../../assets/WIN_20210725_07_22_52_Pro.jpg')}
                        style={styles.img}
                    />
                </View>
                <View style={styles.info}>
                    <Text style={styles.label}>Họ và tên: Nguyễn Minh Vương</Text>
                    <Text style={styles.label}>Ngày sinh: 06/08/2001</Text>
                    <Text style={styles.label}>Chuyên ngành: Kĩ thuật phần mềm</Text>
                    <Text style={styles.label}>Lập trình viên: Ứng dụng di động với react native</Text>
                </View>
            </View>
            <View style={{justifyContent: "center",alignItems: 'center'}}>
                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Login")}>
                    <Text style={{color: 'white',fontWeight: 'bold',fontSize: 20}}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 20
    },
    ava: {
        marginVertical: 40,
        alignItems: "center"
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 100
    },
    label: {
        color: '#000',
        fontSize: 20
    },
    info: {
        marginBottom: 10
    },
    btn: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0,106,231)',
        marginBottom: 10
    },
})
export default Me