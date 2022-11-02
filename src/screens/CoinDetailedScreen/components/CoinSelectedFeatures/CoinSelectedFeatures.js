//@ts-nocheck
import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

const CoinSelectedFeatures = ({ image, market_cap_rank }) => {
    const times =  ['1h', '24h', '7d', '30d', '1y', 'All'];
    const [selectedTime, setSelectedTime] = useState(times[0]);

    return (
        <View className="mt-2">
            <View className="flex-row items-center space-x-1">
                <Ionicons name="swap-vertical-outline" size={17} color="gray" />
                <Text className="text-white tracking-wider">{(market_cap_rank).toFixed(2)}</Text>
                <Image source={{uri: image }} className="h-4 w-4 rounded-full" />
            </View>
        </View>
    );
};

export default CoinSelectedFeatures;
