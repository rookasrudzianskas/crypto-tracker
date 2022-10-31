//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import cryptoCurrencyData from "../../../assets/data/crypto.json";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import CoinDetailedHeader from "./components/CoinDetailedHeader";
import CoinDetailFooter from "./components/CoinDetailFooter";
import {Dimensions} from 'react-native';
import {ChartDot, ChartPath, ChartPathProvider} from '@rainbow-me/animated-charts';

const CoinDetailedScreen = () => {
    const screenWidth = Dimensions.get('window').width;
    const {image: { small },
        id,
        name,
        symbol,
        prices,
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
            <ChartPathProvider data={{ points: prices.map((price) => ({x: price[0], y: price[1]})), smoothingStrategy: 'bezier' }}>
                <CoinDetailedHeader
                    coinId={id}
                    image={small}
                    name={name}
                    symbol={symbol}
                    market_cap_rank={market_cap_rank}
                    price_change_percentage_24h={price_change_percentage_24h}
                    usd={usd}
                />
                {/*<CoinDetailFooter />*/}
                <View style={{ backgroundColor: 'black' }}>
                        <ChartPath height={screenWidth / 2} stroke="yellow" width={screenWidth} />
                        <ChartDot style={{ backgroundColor: 'blue' }} />
                </View>
                </ChartPathProvider>
        </View>
    );
};

export default CoinDetailedScreen;
