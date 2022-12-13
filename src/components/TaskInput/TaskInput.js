import CheckBox from "@react-native-community/checkbox"
import { useEffect, useState } from "react"
import { SafeAreaView, TextInput } from "react-native"
import styles from "./style"

const TaskInput = (props) => {
    const [text, onChangeText] = useState('');
    useEffect(()=> {
        props.setTask(text)
    },[text.length])
    return (
        <SafeAreaView style={styles.inputW}>
            <CheckBox tintColors={{ true: 'rgb(0,106,231)', false: '#000' }}/>
            <TextInput
                style={styles.ipt}
                placeholder='Task'
                placeholderTextColor="#ccc"  
                autoFocus={true}
                value={text}
                onChangeText={onChangeText}
            />
        </SafeAreaView>
    )
}

export default TaskInput