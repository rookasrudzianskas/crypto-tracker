//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import cryptoCurrencyData from "../../../assets/data/crypto.json";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import CoinDetailedHeader from "./components/CoinDetailedHeader";

const CoinDetailedScreen = () => {
    const {image: { small },
        id,
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
            <CoinDetailedHeader
                coinId={id}
                image={small}
                name={name}
                symbol={symbol}
                market_cap_rank={market_cap_rank}
                price_change_percentage_24h={price_change_percentage_24h}
                usd={usd}
            />
        </View>
    );
};

export default CoinDetailedScreen;
