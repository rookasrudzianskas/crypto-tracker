//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import cryptoData from "../../../assets/data/cryptocurrencies.json";
import CoinItem from "../../components/CoinItem";
import {getMarketData} from "../../services/requests";

const HomeScreen = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCoins = async (pageNumber) => {
        if(loading) return;
        setLoading(true);
        const coinsData = await getMarketData(pageNumber);
        setCoins(coinsData);
        setLoading(false);
    }

    const refetchCoins = async () => {
        if (loading) {
            return;
        }
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
                data={cryptoData}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => (
                    <CoinItem marketCoin={item} index={index} />
                )} />
        </View>
    );
};

export default HomeScreen;
