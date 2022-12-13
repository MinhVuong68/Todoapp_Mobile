import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Game from "../screens/Game"
import MainScreen from "../screens/MainScreen/MainScreen"
import Me from "../screens/Me/Me"

const Tab = createBottomTabNavigator()
const UITab = (props) => {
    const screenOptions = ({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInActiveTintColor:'#ccc',
        tabBarActiveBackgroundColor: 'rgb(0,106,231)',
        tabBarInactiveBackgroundColor: 'rgb(0,106,231)',
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({focused,color,size}) => {
            let screenName = route.name
            let iconName = "gamepad"
            if(screenName == "Task") {
                iconName = "tasks"
            } else if (screenName==='Me'){
                iconName = "user"
            }
            return <FontAwesome
                name={iconName}
                size={25}
                color={focused ? 'white' : '#666'}
            />
        }
    })  
    return(
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name={"Task"} component={MainScreen}/>
            <Tab.Screen name={"Game"} component={Game}/>
            <Tab.Screen name="Me" component={Me}/>
            
        </Tab.Navigator>
    )
}

export default UITab