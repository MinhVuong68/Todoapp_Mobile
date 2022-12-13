import { useState } from "react";
import { View,Text } from "react-native"
import CheckBox from '@react-native-community/checkbox';
import styles from './style';

const TaskItem = (props) => {
    const {data} = props
    const [isSelected, setSelection] = useState(false);
    return (
        <View style={styles.checkboxContainer}>
            <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
                tintColors={{ true: 'rgb(0,106,231)', false: '#000' }}
            />
            <Text style={{
                margin: 8,
                color: isSelected ? '#666' : '#000',
                textDecorationLine: isSelected ? 'line-through': 'none',
                textDecorationStyle: 'solid'
            }}>{data.item.name}</Text> 
        </View>
    )
}

export default TaskItem