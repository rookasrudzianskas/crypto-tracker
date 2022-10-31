//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import cryptoData from "../../../assets/data/cryptocurrencies.json";
import CoinItem from "../../components/CoinItem";

const HomeScreen = () => {
    return (
        <View>
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
