//@ts-nocheck
import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

const CoinSelectedFeatures = ({ image, market_cap_rank }) => {
    const times =  ['1h', '24h', '7d', '30d', '1y', 'All'];
    const [selectedTime, setSelectedTime] = useState(times[0]);

    return (
        <View className="mx-4">
            <View className="flex-row items-center space-x-1 mt-1">
                <Ionicons name="swap-vertical-outline" size={17} color="gray" />
                <Text className="text-white tracking-wider">{(market_cap_rank).toFixed(2)}</Text>
                <Image source={{uri: image }} className="h-4 w-4" />
            </View>
            <View className="flex-row py-1 px-2 rounded-lg bg-gray-700/60 justify-between space-x-2 mt-5">
                {times.map((time, index) => (
                    <TouchableOpacity onPress={() => setSelectedTime(time)} className={`${selectedTime === time && ' bg-gray-900/80 rounded-lg'} py-2 flex-1 items-center justify-center`} key={index} activeOpacity={0.7}>
                        <Text className={` ${selectedTime === time ? 'text-white' : 'text-gray-400'} font-bold`}>{time}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default CoinSelectedFeatures;
