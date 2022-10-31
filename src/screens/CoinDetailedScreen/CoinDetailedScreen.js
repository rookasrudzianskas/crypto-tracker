//@ts-nocheck
import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import cryptoCurrencyData from "../../../assets/data/crypto.json";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import CoinDetailedHeader from "./components/CoinDetailedHeader";
import CoinDetailFooter from "./components/CoinDetailFooter";
import {Dimensions} from 'react-native';
import {ChartDot, ChartPath, ChartPathProvider, ChartYLabel} from '@rainbow-me/animated-charts';

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
    const [usdPrice, setUsdPrice] = useState(usd);
    const chartColor = usd > prices[0][1] ? '#16c784' : '#Ea3943';

    const formatCurrency = (value) => {
        "worklet";
        if (value === "") {
            return `$${usd.toFixed(2)}`;
        }
        return `$${parseFloat(value).toFixed(2)}`;
    }

    return (
        <View className="pt-12">
            <ChartPathProvider
                data={{
                    points: prices.map(([x, y]) => ({ x, y })),
                    smoothingStrategy: "bezier",
                }}
            >
                <CoinDetailedHeader
                    coinId={id}
                    image={small}
                    name={name}
                    symbol={symbol}
                    market_cap_rank={market_cap_rank}
                    price_change_percentage_24h={price_change_percentage_24h}
                    usd={usd}
                />
                <View className="">
                    <ChartYLabel format={formatCurrency} style={styles.currentPrice} />
                </View>
                {/*<CoinDetailFooter />*/}
                <View>
                    <ChartPath
                        strokeWidth={2}
                        height={screenWidth / 2}
                        stroke={chartColor}
                        width={screenWidth}
                    />
                    <ChartDot style={{ backgroundColor: chartColor }} />
                </View>
                </ChartPathProvider>
        </View>
    );
};

export default CoinDetailedScreen;

const styles = StyleSheet.create({
    currentPrice: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 1,
        marginHorizontal: 14,
        marginTop: 10,
    },
});
