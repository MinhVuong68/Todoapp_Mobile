import { Text, TouchableOpacity, View } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo'

const ButtonSocial = (props) => {
    return (
        <TouchableOpacity style={{
            backgroundColor: 'rgb(0,106,231)',
            height: 50,
            width: '85%',
            borderRadius: 30,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20
        }}>
            <Entypo        
                  name={props.icon}
                  size={30}
                  color="#fff"
            />
            <Text style={{marginLeft: 5,color: 'white'}}>{props.name}</Text>
        </TouchableOpacity>
    )
    
}

export default ButtonSocial