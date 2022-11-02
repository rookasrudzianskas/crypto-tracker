//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {useWatchlist} from "../../contexts/WatchlistContext";
import CoinItem from "../../components/CoinItem";

const WatchlistScreen = () => {
    const { watchlistCoinIds } = useWatchlist();
    console.log(watchlistCoinIds);
    return (
        <View className="pt-16">
            <FlatList
                data={watchlistCoinIds}
                renderItem={({item, index}) => <CoinItem marketCoin={item} index={index} />}
            />
        </View>
    );
};

export default WatchlistScreen;
