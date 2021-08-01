import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/Auth/SignIn";
import SignUp from "../screens/Auth/SignUp";
import Welcome from "../screens/Auth/Welcome";
import BackBtn from "../components/Auth/BackBtn";


const Auth = createStackNavigator();



export default () => 
    <Auth.Navigator headerMode="float" screenOptions={{
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerBackImage: () => <BackBtn />
    }}>
        <Auth.Screen name="Welcome" component={Welcome} options={{
            headerTitleStyle:{
                color: 'white'
            }
        }} />
        <Auth.Screen name="SignUp" component={SignUp} options={{title: "Sign Up"}}/>
        <Auth.Screen name="SignIn" component={SignIn} options={{title: "Sign In"}}/>
    </Auth.Navigator>