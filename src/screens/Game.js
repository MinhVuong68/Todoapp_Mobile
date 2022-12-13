import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { StyleSheet, Text, TouchableOpacity, View } from "react-native"


const Game = ({navigation}) => {
    return (
        <View style={{padding: 10}}>
            <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('Task')}>
                <FontAwesome5
                    name="tasks"
                    color="rgb(0,106,231)"
                    size={40}
                />
                <Text style={styles.title}>Todo list</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('Learn')}>
                <FontAwesome5
                    name="book-reader"
                    color="rgb(0,106,231)"
                    size={40}
                />
                <Text style={styles.title}>Learning Tomato</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'rgb(232,234,237)',
        borderRadius: 10,  
        marginBottom: 10
    },
    title: {
        marginLeft: 30,
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    }
})
export default Game