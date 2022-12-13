import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { View,Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign'


const Introduce = (props) => {
    const navigation = useNavigation()
    const handlePressMenu = () => {
        navigation.navigate(props.screen);
    }

    return (
        <View style={styles.introduce}>
         <ImageBackground source={props.img} resizeMode="cover" style={styles.image}/>  
         <Text style={styles.name}>{props.say}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    introduce: {
        flex: 1, 
        height: 500
    },
    image: {
        justifyContent: 'space-between',
        height: 300,
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
        
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
        marginLeft: 15,
        position: 'absolute',
        bottom: 0
    },
});
export default Introduce