import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Explore from "../screens/Main/Explore";
import MapScreen from "../screens/Main/Map";
import Saved from "../screens/Main/Saved";
import Profile from "../screens/Main/Profile";

const Main = createBottomTabNavigator();

export default () => (
    <Main.Navigator>
        <Main.Screen name="Explore" component={Explore} />
        <Main.Screen name="Saved" component={Saved} />
        <Main.Screen name="Map" component={MapScreen} />
        <Main.Screen name="Profile" component={Profile} />
    </Main.Navigator>
);