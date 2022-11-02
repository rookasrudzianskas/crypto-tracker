import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CoinDetailedScreen from '../screens/CoinDetailedScreen';
import BottomTabNavigator from './BottomTabNavigator';
import AddNewAssetScreen from "../screens/AddNewAssetScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="Root"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="CoinDetailedScreen" component={CoinDetailedScreen} />
            <Stack.Screen
                name="AddNewAssetScreen"
                component={AddNewAssetScreen}
                options={{
                    headerShown: true,
                    title: "Add New Asset",
                    headerStyle: {
                        backgroundColor: "#121212",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />
        </Stack.Navigator>
    )
}

export default Navigation;
