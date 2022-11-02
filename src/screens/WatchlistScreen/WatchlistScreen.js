//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useWatchlist} from "../../contexts/WatchlistContext";

const WatchlistScreen = () => {
    const { watchlistCoinIds } = useWatchlist();
    console.log(watchlistCoinIds);
    return (
        <View>
            <Text>
                byrookas 🚀
            </Text>
        </View>
    );
};

export default WatchlistScreen;
