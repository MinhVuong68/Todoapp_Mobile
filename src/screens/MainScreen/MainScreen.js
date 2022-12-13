import { SafeAreaView, StatusBar,TouchableOpacity,View} from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { SwipeListView } from 'react-native-swipe-list-view';
import { AuthContext } from '../../context/Authcontext'

import TaskItem from '../../components/TaskItem/TaskItem';
import TaskInput from '../../components/TaskInput/TaskInput';
import Introduce from '../../components/Introduce';
import axiosClient from '../../api/axiosClient'

import styles from './style';
import {data} from '../../data_sample/data';
const MainScreen = ({navigation}) => {
   const {user,dispatch} = useContext(AuthContext)
   const image = require('../../assets/masthead.png')
   const [owner,setOwner] = useState({})
   const [isAdd,setIsAdd] = useState(false)
   const [tasks,setTasks] = useState([])
   const [task,setTask] = useState('')
   const [listTaskTemp,setListTaskTemp] = useState([])

   useEffect(()=> {
      const getTasks = async () => {
         const tasks = await axiosClient.get(`/v1/api/task/${user._id}`)
         setTasks([...tasks].reverse())
      }
      getTasks()
   },[listTaskTemp.length])

   const handleAddStask = () => {
      setIsAdd(true)
   }
   const handleSaveStask = async () => {
      const currentDate = new Date()
      const date = currentDate.getDate()
      const month = currentDate.getMonth()
      const year = currentDate.getFullYear()
      const currentDateString = `${date}/${month}/${year}`
      try {
         await axiosClient.post('/v1/api/task/',{
            name: task,
            user: user._id,
            date: currentDateString,
            finished: false
         })

        setListTaskTemp(prev=>[...prev,{name: task}])
         setIsAdd(false)
      } catch (error) {
         console.log(error);
      }
   }
   const handleExit = () => {
      setIsAdd(false)
   }
   const renderItem = (data,rowMap) => {
      return (
         <TaskItem data={data}/>
      )
   }

   const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };

   const deleteRow = async (rowMap,rowKey) => {
      try {
         await axiosClient.delete(`/v1/api/task/${rowKey}`)
         closeRow(rowMap, rowKey);
         setTasks(tasks.filter(task=>task._id!==rowKey))

      } catch (error) {
         console.log(error);
      }
      
   }

   const HiddenItemWithActions = (props) => {
      const {onClose,onDelete} = props
      onClose()
      return (
         
         <View style={{height: 36,flexDirection: 'row',justifyContent: 'flex-end',alignContent: 'center'}}>
              <TouchableOpacity style={{width: 75,backgroundColor: 'red',justifyContent: 'center',alignItems: 'center'}} onPress={onDelete}>
               <Entypo
                  name="trash"
                  color='#fff'
                  size={25}
               />
            </TouchableOpacity>
         </View>
      )
   }
   const renderHiddenItem = (data,rowMap) => {
      return(
         <HiddenItemWithActions
            data={data}
            rowMap={rowMap}
            onDelete={()=> deleteRow(rowMap,data.item._id)} 
            onClose={() => closeRow(rowMap, data.item.key)}
         />
      )
   }

   return(
   <>
      <View style={styles.wrapper}>
      <Introduce
         img={image}
         icon="menu-fold"
         say={`Xin chào, ${user.email.split('@')[0]}`}
         navigation={navigation}
         screen="Me"
      />
      <SafeAreaView style={styles.taskW}>
        {isAdd && <TaskInput setTask={setTask}/>}
        <SwipeListView
            data={tasks}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={0}
            rightOpenValue={-75}
        />
         <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
            {isAdd && task.length>0 ? 
            <TouchableOpacity onPress={handleSaveStask}>
               <AntDesign          
                  name="save"
                  size={50}
                  color="rgb(0,106,231)"
                />
            </TouchableOpacity>: 
               !isAdd && <TouchableOpacity onPress={handleAddStask}>
               <AntDesign          
                  name="pluscircle"
                  size={50}
                  color="rgb(0,106,231)"
                />
            </TouchableOpacity>}
            {task.length===0 && isAdd && <TouchableOpacity onPress={handleExit}>
               <FontAwesome         
                  name="remove"
                  size={50}
                  color="red"
                />
            </TouchableOpacity>}
         </View>
    </SafeAreaView>
   </View>
   
   </>
   )
         
    
}

export default MainScreen;