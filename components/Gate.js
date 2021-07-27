import React from "react";
import { Text, View } from "react-native";

export default () => {
    const isLoggedIn = false;
    return (
        <View style={{ justifyContent: "center", alignItems: "center", flex:1}}>
            {isLoggedIn? <Text>Welcome</Text> : <Text>Login Please</Text>}
        </View>
    );
}