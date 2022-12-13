import { useEffect, useState } from "react"
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'


const Learn = (props) => {
    const [colorBackground,setColorBackground] = useState('white')
    const [isStart,setIsStart] = useState(false)
    const [minute,setMinute] = useState(25)
    const [second,setSecond] = useState(59)
    const [first,setFirst] = useState(true)

    useEffect(()=>{
            if(second === 0 && minute===0) {
                clearInterval(timeId)
                complete()
                return;
            } 
            if(second<0 && minute>0){
                setFirst(false)
                setSecond(59)
                setMinute(prevMinute => prevMinute - 1)
            }
        const timeId = setInterval(()=>{
            setSecond(prevSecond => prevSecond - 1)    
        },1000)
        return () => clearInterval(timeId)
    },[isStart,second])

    const handleStart = () => {
        setColorBackground('rgb(0,106,231)')
        setIsStart(true)  
        setSecond(59)
        setMinute(prevMinute => prevMinute - 1)   
    }

    const handleFinish = () => {
        setSecond(59)
        setMinute(25)
        setIsStart(false)
        setColorBackground('white')
        
    }

    const complete = async () => {
        setColorBackground('red')
    }

    

    const styles = StyleSheet.create({
        btnStart: {
            backgroundColor: 'rgb(0,106,231)',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10
        },
        btnStop: {
            backgroundColor: 'red',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10
        },
        times: {
            flexDirection: 'row'
        },
        time: {
            fontSize: 100,
            color: isStart ? '#fff' : '#000'
        }
    })
    return (
        <>
            <View style={{backgroundColor: isStart ? colorBackground: 'white',flex: 1,justifyContent: 'center',alignItems: 'center'}} >
                <View style={styles.times}>
                    <Text style={styles.time}>
                        {isStart ? (minute<10 ? `0${minute}`: minute) : '25'}
                    </Text>
                    <Text style={styles.time}>
                        :
                    </Text>
                    <Text style={styles.time}>
                        {isStart ? (second < 10 ? `0${second}`: second ): '00'}
                    </Text>
                </View>
                {
                    isStart===false ? 
                    (
                        <TouchableOpacity style={styles.btnStart} onPress={handleStart}>
                            <Text style={{color: '#fff',fontWeight: 'bold',fontSize: 25}}>Bắt đầu</Text>
                        </TouchableOpacity>
                    ):(
                        <TouchableOpacity style={styles.btnStop} onPress={handleFinish}>
                            <Text style={{color: '#fff',fontWeight: 'bold',fontSize: 25}}>Kết thúc</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            
            <StatusBar backgroundColor={colorBackground}/>
        </>
       
    )

    
    
}


export default Learn