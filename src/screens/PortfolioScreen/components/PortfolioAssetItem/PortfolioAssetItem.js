//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, Pressable} from 'react-native';
import {FontAwesome} from "@expo/vector-icons";

const PortfolioAssetItem = ({ assetItem }) => {
    const {
        currentPrice,
        image,
        name,
        priceChangePercentage,
        quantityBought,
        ticker,
    } = assetItem;

    const normalizePrice = (price) => {
        if (price >= 1000000000) {
            return `${(price / 1000000000).toFixed(2)}B`;
        } else if (price >= 1000000) {
            return `${(price / 1000000).toFixed(2)}M`;
        } else {
            return `${(price / 1000).toFixed(2)}K`;
        }
    }

    const renderHoldings = () => normalizePrice(currentPrice * quantityBought);

    return (
        <Pressable activeOpacity={1} className="bg-[#121212]">
           <View className=" flex-row justify-between">
               <View className="flex-row items-center ml-4">
                   <Image source={{ uri: image || 'https://as2.ftcdn.net/v2/jpg/02/88/85/71/1000_F_288857162_l7ZOOsEveQf1d8PMsNC6HMQFeqafLJhx.jpg'}} className="w-7 h-7 rounded-full" />
                   <View className="flex-col ml-2">
                       <Text className="text-white font-bold text-[17px] mb-1">{name.slice(0, 15) || 'Loading...'}</Text>
                       <Text className="text-gray-400 font-semibold uppercase">{ticker || 'Loading...'}</Text>
                   </View>
               </View>
               <View className="flex-col">
                   <Text className="text-white font-bold text-[17px] mb-[1px]">${currentPrice.toFixed(1) || 0}</Text>
                   <View>
                       <TouchableOpacity className={`flex-row items-center space-x-1`} activeOpacity={0.7}>
                           {priceChangePercentage && priceChangePercentage > 0 ? (
                               <FontAwesome name="caret-up" style={{marginBottom: 2}} size={20} color="#3cbd48" />
                           ) : (
                               <FontAwesome name="caret-down" style={{marginBottom: 2}} size={20} color="#FF4B4B" />
                           )}
                           <Text className={`${priceChangePercentage && priceChangePercentage > 0 ? 'text-[#3cbd48]' : 'text-[#FF4B4B]'} font-semibold`}>{priceChangePercentage?.toFixed(2) || NaN} %</Text>
                       </TouchableOpacity>
                   </View>
               </View>
               <View className="mr-4">
                   <Text className="text-white font-bold text-[17px] text-right">${renderHoldings() || 0}</Text>
                   <Text className="text-gray-500 font-semibold text-[14px] text-right">{quantityBought || NaN} {ticker?.toUpperCase() || 'Loading..'}</Text>
               </View>
           </View>
            <View className="py-3"/>
        </Pressable>
    );
};

export default PortfolioAssetItem;
