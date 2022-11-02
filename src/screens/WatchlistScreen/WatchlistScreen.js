//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import {useWatchlist} from "../../contexts/WatchlistContext";
import CoinItem from "../../components/CoinItem";
import {getWatchlistedCoins} from "../../services/requests";

const WatchlistScreen = () => {
    const { watchlistCoinIds } = useWatchlist();
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const transformCoinIds = () => watchlistCoinIds.join('%2C');

    const fetchWatchlistedCoins = async () => {
        if(loading) return;
        setLoading(true);
        const watchlistedCoinsData = await getWatchlistedCoins(1, transformCoinIds());
        setCoins((existingCoins) => [...existingCoins, ...watchlistedCoinsData]);
        setLoading(false);
    }


    useEffect(() => {
        fetchWatchlistedCoins();
    }, [watchlistCoinIds]);

    if(loading || !coins) {
        return (
            <View className="h-screen justify-center items-center">
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View className="pt-16">
            <FlatList
                style={{height:  '100%'}}
                data={coins}
                renderItem={({item, index}) => <CoinItem marketCoin={item} index={index} />}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={fetchWatchlistedCoins}
                        tintColor="#fff"
                    />
                }
            />
        </View>
    );
};

export default WatchlistScreen;
