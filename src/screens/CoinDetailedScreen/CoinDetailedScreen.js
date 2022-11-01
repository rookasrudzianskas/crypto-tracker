//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, TextInput, ActivityIndicator} from 'react-native';
import cryptoCurrencyData from "../../../assets/data/crypto.json";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import CoinDetailedHeader from "./components/CoinDetailedHeader";
import CoinDetailFooter from "./components/CoinDetailFooter";
import {Dimensions} from 'react-native';
import {ChartDot, ChartPath, ChartPathProvider, ChartYLabel} from '@rainbow-me/animated-charts';
import 'react-native-gesture-handler';
import CoinSelectedFeatures from "./components/CoinSelectedFeatures";
import {useRoute} from "@react-navigation/native";
import {getCoinMarketChart, getDetailedCoinData} from "../../services/requests";

const CoinDetailedScreen = () => {
    const [coin, setCoin] = useState(null);
    const [coinMarketData, setCoinMarketData] = useState(null);

    const screenWidth = Dimensions.get('window').width;
    const [loading, setLoading] = useState(false);
    const [coinValue, setCoinValue] = useState('1');
    const [usdValue, setUsdValue] = useState("0.00");

    const nf = Intl.NumberFormat();
    const route = useRoute();
    const { coinId } = route.params;

    useEffect(() => {
        (async () => {
            setLoading(true);
            const fetchedCoinData = await getDetailedCoinData(coinId);
            const fetchedCoinMarketData = await getCoinMarketChart(coinId);
            setCoin(fetchedCoinData);
            setCoinMarketData(fetchedCoinMarketData);
            setUsdValue(fetchedCoinData.market_data.current_price.usd);
            setLoading(false);
        })();
    }, []);

    if(loading || !coin || !coinMarketData) {
        return (
            <View className="h-screen justify-center items-center">
                <ActivityIndicator />
            </View>
        );
    }


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
    } = coin || {};

    const { prices } = coinMarketData;
    const chartColor = usd > prices[0][1] ? '#16c784' : '#Ea3943';

        const formatCurrency = (value) => {
        "worklet";
        if (value === "") {
            return `$${usd.toFixed(2)}`;
        }
        return `$${parseFloat(value).toFixed(2)}`;
    }

    const changeCoinValue = (value) => {
        setCoinValue(value);
        const floatValue = parseFloat(value.replace(',', '.')) || 0;
        setUsdValue((floatValue * usd).toString());
    }

    const changeUsdValue = (value) => {
        setUsdValue(value);
        const floatValue = parseFloat(value.replace(',', '.')) || 0;
        setCoinValue((floatValue / usd).toString())
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

                <View className="flex-row items-center justify-between mx-4">
                    <ChartYLabel format={formatCurrency} style={styles.currentPrice} />
                    <TouchableOpacity className={`flex-row items-center space-x-1 mt-2 ${price_change_percentage_24h > 0 ? 'bg-[#3cbd48]' : 'bg-[#FF4B4B]'} px-3 py-2 rounded-md`} activeOpacity={0.7}>
                        {price_change_percentage_24h > 0 ? (
                            <FontAwesome name="caret-up" style={{marginBottom: 2}} size={20} color="white" />
                        ) : (
                            <FontAwesome name="caret-down" style={{marginBottom: 2}} size={20} color="white" />
                        )}
                        <Text className="text-white font-semibold">{price_change_percentage_24h.toFixed(2)} %</Text>
                    </TouchableOpacity>
                </View>

                <CoinSelectedFeatures
                    image={small}
                    market_cap_rank={market_cap_rank}
                />

                <ChartPath
                    strokeWidth={2}
                    height={screenWidth / 2}
                    stroke={chartColor}
                    width={screenWidth}
                />
                <View>
                    <ChartDot style={{ backgroundColor: chartColor }} />
                </View>

                <View className="bg-gray-800 py-4 mx-4 rounded-lg">
                    <View className="flex-row items-center justify-around">
                        <Text className="text-white font-bold">BTC</Text>
                        <Text className="text-white font-bold">USD</Text>
                    </View>
                    <View className="space-x-4 flex-row justify-around mx-4">
                        <TextInput keyboardType={'numeric'} value={coinValue} onChangeText={changeCoinValue} placeholder={'Enter Amount'} className="bg-gray-700/80 rounded py-2 px-5 flex-1 text-white mt-2"/>
                        <TextInput keyboardType={'numeric'}  value={usdValue} onChangeText={changeUsdValue} placeholder={'Enter Amount'} className="bg-gray-700/80 rounded py-2 px-5 flex-1 text-white mt-2"/>
                    </View>
                </View>

                {/*<CoinDetailFooter /> @FIXME do the footer */}

                </ChartPathProvider>
        </View>
    );
};

export default CoinDetailedScreen;

const styles = StyleSheet.create({
    currentPrice: {
        color: "white",
        fontSize: 23,
        fontWeight: "600",
        letterSpacing: 1,
        marginHorizontal: 0,
        marginTop: 10,
    },
});
