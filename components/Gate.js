import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "../navigation/Auth";
import { logIn, logOut } from "../redux/usersSlice";


export default () => {
    const { isLoggedIn } = useSelector(state => state.usersReducer);
    const dispatch = useDispatch();
    return (
        <NavigationContainer>
            {isLoggedIn? 
            <TouchableOpacity onPress={() => dispatch(logOut())}>
                <Text>Log out</Text>
            </TouchableOpacity>
            // console.log(logOut())
            : 
            <Auth />
            }
        </NavigationContainer>
    );
};

const mapStateToProps = state => {
    console.log(state);
    return {isLoggedIn: false};
};
