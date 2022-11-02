//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';

const AddNewAssetScreen = () => {
    return (
        <View className="mx-4">
            <View className="border border-gray-500 border-[2px] rounded py-2 px-2 bg-gray-800/30 mt-7">
                <TextInput autoCapitalize={'none'} className="text-gray-300 bg-transparent" placeholder="Asset Name" />
            </View>
            <View className="h-screen items-center">
                <View className="mt-16">
                    <View className="flex-row items-center justify-center">
                        <TextInput keyboardType={'numeric'} className="text-gray-800 text-[90px]" placeholder={'0'}/>
                        <Text className="text-gray-400 font-bold uppercase tracking-wider -mt-12 ml-3 text-[17px]">BTC</Text>
                    </View>
                    <View className="items-center justify-center">
                        <Text className="text-gray-500 font-bold tracking-wider">47018.00$ per coin</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default AddNewAssetScreen;
