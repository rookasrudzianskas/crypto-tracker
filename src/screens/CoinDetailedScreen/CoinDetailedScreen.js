//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import cryptoCurrencyData from "../../../assets/data/crypto.json";
import {FontAwesome, Ionicons} from "@expo/vector-icons";

const CoinDetailedScreen = () => {
    const {image: { small },
        name,
        symbol,
        market_data: {
            market_cap_rank,
            price_change_percentage_24h,
            current_price: {
                usd,
            }
        }
    } = cryptoCurrencyData;

    return (
        <View className="pt-12 mx-4">
            <View>
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
                <Image source={{uri: small }} className="h-4 w-4" />
            </View>
        </View>
    );
};

export default CoinDetailedScreen;
