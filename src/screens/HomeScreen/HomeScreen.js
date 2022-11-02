//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, RefreshControl} from 'react-native';
import CoinItem from "../../components/CoinItem";
import {getMarketData} from "../../services/requests";

const HomeScreen = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCoins = async (pageNumber) => {
        if(loading) return;
        setLoading(true);
        const coinsData = await getMarketData(pageNumber);
        setCoins((existingCoins) => [...existingCoins, ...coinsData]);
        setLoading(false);
    }

    const refetchCoins = async () => {
        if(loading) return;
        setLoading(true);
        const coinsData = await getMarketData()
        setCoins(coinsData)
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins();
    }, []);

    return (
        <View className=" pt-16">
            <FlatList
                data={coins}
                onEndReached={() => fetchCoins(coins.length / 50 + 1)}
                refreshControl={
                    <RefreshControl refreshing={loading} tintColor={'white'} onRefresh={refetchCoins} />
                }
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={_renderitem} />
        </View>
    );
};

const _renderitem = ({item, index}) => <CoinItem marketCoin={item} index={index} />

export default HomeScreen;
