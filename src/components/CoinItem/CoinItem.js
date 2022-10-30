//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {FontAwesome} from "@expo/vector-icons";

const CoinItem = ({item, index}) => {
    const price_change_percentage_24h = 0.1;

    return (
        <TouchableOpacity className="flex-row items-center justify-between mx-4 my-2" activeOpacity={0.7}>
            <View className="flex-row items-center">
                <Image source={{ uri: item?.image || 'https://as2.ftcdn.net/v2/jpg/02/88/85/71/1000_F_288857162_l7ZOOsEveQf1d8PMsNC6HMQFeqafLJhx.jpg'}} className="w-10 h-10 object-contain" />
                <View className="items-start ml-3 w-[200px] ">
                    <Text className="text-white text-xl font-semibold -mb-1">{item?.name || 'Loading...'}</Text>
                    <View className="flex-row items-center">
                        <View className="w-5 h-5 bg-gray-600 rounded-md items-center justify-center mr-2">
                            <Text className="text-white font-bold">{index}</Text>
                        </View>
                        <Text className="font-bold uppercase text-gray-400/90 mr-3 tracking-wider">{item?.symbol || 'Loading...'}</Text>
                        <View className="flex-row items-center space-x-2">
                            {price_change_percentage_24h < 0  ? (
                                <FontAwesome className="mt-1" style={{marginTop: 13}} name="sort-down" size={20} color="#FF4B4B" />
                            ) : (
                                <FontAwesome className="mt-0" style={{marginTop: 13}} name="sort-up" size={20} color="#3DFF4F" />
                            )}
                            <Text className="font-bold uppercase text-gray-400/90 tracking-wide">1.02 %</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <Text className="text-xl font-bold text-white">56.998.33</Text>
                <Text className="font-bold text-gray-400/90 text-[15px] mt-1">MCap 1,079 T</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CoinItem;
