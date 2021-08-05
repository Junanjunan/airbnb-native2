import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Explore from "../screens/Main/Explore";
import MapScreen from "../screens/Main/Map";
import Saved from "../screens/Main/Saved";
import Profile from "../screens/Main/Profile";
import colors from "../colors";
import utils from "../utils";
import Room from "../screens/Main/Room";
import BackBtn from "../components/Auth/BackBtn";


const TabsNavigator = createBottomTabNavigator();
// const Main = createMaterialTopTabNavigator();

const Tabs = () => (
    <TabsNavigator.Navigator
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
        <TabsNavigator.Screen name="Explore" component={Explore} />
        <TabsNavigator.Screen name="Saved" component={Saved} />
        <TabsNavigator.Screen name="Map" component={MapScreen} />
        <TabsNavigator.Screen name="Profile" component={Profile} />
    </TabsNavigator.Navigator>
);

const MainNavigator = createStackNavigator();

export default () => (
    <MainNavigator.Navigator 
        mode="modal" 
        screenOptions={{ 
            headerTintColor:"rgba(50, 50, 50, 0.5)", 
            headerBackTitleVisible: false,
            headerBackImage: () => <BackBtn />
            }}>
    {/* <MainNavigator.Navigator> */}
        <MainNavigator.Screen name="tabs" component={Tabs} options={{headerShown: false}} />
        <MainNavigator.Screen name="RoomDetail" component={Room} />
    </MainNavigator.Navigator>
    
);