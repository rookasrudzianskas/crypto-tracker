//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {FontAwesome} from "@expo/vector-icons";

const PortfolioAssetItem = () => {
    const price_change_percentage_24h = 0.5;
    // 'bg-[#3cbd48]' : 'bg-[#FF4B4B]
    return (
        <TouchableOpacity activeOpacity={0.7} className="mx-4">
           <View className=" flex-row justify-between">
               <View className="flex-row items-center">
                   <Image source={{ uri: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'}} className="w-7 h-7" />
                   <View className="flex-col ml-2">
                       <Text className="text-white font-bold text-[17px] mb-1">Bitcoin</Text>
                       <Text className="text-gray-400 font-semibold ">BTC</Text>
                   </View>
               </View>
               <View className="flex-col">
                   <Text className="text-white font-bold text-[17px] mb-[1px]">$56594</Text>
                   <View>
                       <TouchableOpacity className={`flex-row items-center space-x-1`} activeOpacity={0.7}>
                           {price_change_percentage_24h > 0 ? (
                               <FontAwesome name="caret-up" style={{marginBottom: 2}} size={20} color="#3cbd48" />
                           ) : (
                               <FontAwesome name="caret-down" style={{marginBottom: 2}} size={20} color="#FF4B4B" />
                           )}
                           <Text className={`${price_change_percentage_24h > 0 ? 'text-[#3cbd48]' : 'text-[#FF4B4B]'} font-semibold`}>{price_change_percentage_24h.toFixed(2) || 0} %</Text>
                       </TouchableOpacity>
                   </View>
               </View>
               <View>
                   <Text className="text-white font-bold text-[17px]">${(33404).toFixed(2)}</Text>
                   <Text className="text-gray-500 font-semibold text-[14px] text-right">2 ETH</Text>
               </View>
           </View>
            <View className="border-b border-gray-900 my-3"/>
        </TouchableOpacity>
    );
};

export default PortfolioAssetItem;
