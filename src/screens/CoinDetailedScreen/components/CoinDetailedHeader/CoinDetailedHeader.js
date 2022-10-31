//@ts-nocheck
import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {FontAwesome, Ionicons} from "@expo/vector-icons";

const CoinDetailedHeader = ({ coinId, name, usd, image, symbol, price_change_percentage_24h, market_cap_rank }) => {
    const times =  ['1h', '24h', '7d', '30d', '1y', 'All'];
    const [selectedTime, setSelectedTime] = useState(times[0]);

    return (
        <View>
            <View className="flex-row items-center space-x-2">
                <TouchableOpacity activeOpacity={0.7}>
                    <Ionicons name="arrow-back-circle-outline" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-lg font-semibold">{name || 'Loading...'}</Text>
            </View>
            <View className="flex-row items-center justify-between">
                <Text className="text-white text-2xl font-semibold">{(usd).toFixed(2) || 0} US$</Text>
                <TouchableOpacity className={`flex-row items-center space-x-1 ${price_change_percentage_24h > 0 ? 'bg-[#3cbd48]' : 'bg-[#FF4B4B]'} px-3 py-2 rounded-md`} activeOpacity={0.7}>
                    {price_change_percentage_24h > 0 ? (
                        <FontAwesome name="caret-up" style={{marginBottom: 2}} size={20} color="white" />
                    ) : (
                        <FontAwesome name="caret-down" style={{marginBottom: 2}} size={20} color="white" />
                    )}
                    <Text className="text-white font-semibold">{price_change_percentage_24h.toFixed(2)} %</Text>
                </TouchableOpacity>
            </View>
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

export default CoinDetailedHeader;
