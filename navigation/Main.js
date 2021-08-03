import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Explore from "../screens/Main/Explore";
import MapScreen from "../screens/Main/Map";
import Saved from "../screens/Main/Saved";
import Profile from "../screens/Main/Profile";
import colors from "../colors";
import utils from "../utils";


const Main = createBottomTabNavigator();
// const Main = createMaterialTopTabNavigator();

export default () => (
    <Main.Navigator
        screenOptions={({route}) =>({
            tabBarActiveTintColor: colors.red,
            tabBarIcon: ({focused}) => {
                const isAndroid = utils.isAndroid();
                let iconName = `${isAndroid ? "md-" : "ios-"}`;
                if (route.name === "Explore") {
                    iconName += "search";
                    } else if (route.name === "Saved") {
                        iconName += "heart";
                    } else if (route.name === "Map") {
                        iconName += "map";
                    } else if (route.name === "Profile") {
                        iconName += "person";
                    }
                return <Ionicons name={iconName} size={20} color={focused ? colors.red : "gray"} />
            }
        })
        }
    >
        <Main.Screen name="Explore" component={Explore} />
        <Main.Screen name="Saved" component={Saved} />
        <Main.Screen name="Map" component={MapScreen} />
        <Main.Screen name="Profile" component={Profile} />
    </Main.Navigator>
);