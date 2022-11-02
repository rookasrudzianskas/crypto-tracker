//@ts-nocheck
import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {EvilIcons, FontAwesome, Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useWatchlist} from "../../../../contexts/WatchlistContext";

const CoinDetailedHeader = ({coinId, name}) => {
    const navigation = useNavigation();
    const { watchlistCoinIds } = useWatchlist();

    const checkIfCoinIsWatchlisted = () => watchlistCoinIds.some((coinIdValue) => coinIdValue === coinId);


    return (
        <View className="mx-4">
            <View className="flex-row items-center">
                <View className="flex-1 flex-row items-center space-x-2">
                    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
                        <Ionicons name="arrow-back-circle-outline" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-lg font-semibold">{name || 'Loading...'}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                    {checkIfCoinIsWatchlisted ? (
                        <FontAwesome name="star" size={22} color="#FFD700" />
                    ) : (
                        <FontAwesome name="star-o" size={22} color="white" />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CoinDetailedHeader;
