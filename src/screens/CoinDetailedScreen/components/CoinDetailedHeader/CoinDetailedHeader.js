//@ts-nocheck
import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {EvilIcons, FontAwesome, Ionicons} from "@expo/vector-icons";

const CoinDetailedHeader = ({name}) => {
    return (
        <View className="mx-4">
            <View className="flex-row items-center">
                <View className="flex-1 flex-row items-center space-x-2">
                    <TouchableOpacity activeOpacity={0.7}>
                        <Ionicons name="arrow-back-circle-outline" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-lg font-semibold">{name || 'Loading...'}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                    <EvilIcons className="" name="user" size={27} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CoinDetailedHeader;
