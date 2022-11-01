import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import WatchlistScreen from "../screens/WatchlistScreen";


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "grey",
                tabBarStyle: {
                    backgroundColor: "#181818",
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        // Focused is a boolean that tells us if the tab is currently active
                        <Entypo name="home" size={focused ? 30 : 25} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Watchlist"
                component={WatchlistScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        // Focused is a boolean that tells us if the tab is currently active
                        <FontAwesome name="star" size={focused ? 30 : 25} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator;
