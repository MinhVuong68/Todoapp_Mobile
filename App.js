import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"// import { StatusBar } from "react-native"
import { StatusBar, Text, View } from "react-native"
import UITab from "./src/navigation/UITab"
import Learn from "./src/screens/Learn"
import Login from "./src/screens/Login"

import {AuthContextProvider} from './src/context/Authcontext'
import Register from "./src/screens/Register"
const Stack = createNativeStackNavigator()
const App = () => {
    return(   
    <AuthContextProvider>
        <NavigationContainer>
            <Stack.Navigator
                 initialRouteName="Login"
                 screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name={"Login"} component={Login} />
                <Stack.Screen name={"Register"} component={Register} options={{animation: "slide_from_right"}} />
                <Stack.Screen name={"UITab"} component={UITab} />
                <Stack.Screen name={"Learn"} component={Learn} />
            </Stack.Navigator>
        </NavigationContainer>
        <StatusBar animated={true} backgroundColor="rgb(0,106,231)"/>
    </AuthContextProvider>   
    )
} 

export default App
