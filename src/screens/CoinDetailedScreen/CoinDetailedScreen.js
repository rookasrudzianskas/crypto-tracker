//@ts-nocheck
import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, TextInput, ActivityIndicator} from 'react-native';
import cryptoCurrencyData from "../../../assets/data/crypto.json";
import {FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import CoinDetailedHeader from "./components/CoinDetailedHeader";
import CoinDetailFooter from "./components/CoinDetailFooter";
import {Dimensions} from 'react-native';
import {ChartDot, ChartPath, ChartPathProvider, ChartYLabel} from '@rainbow-me/animated-charts';
import 'react-native-gesture-handler';
import CoinSelectedFeatures from "./components/CoinSelectedFeatures";
import {useRoute} from "@react-navigation/native";
import {getCandleChartData, getCoinMarketChart, getDetailedCoinData} from "../../services/requests";
import FilterComponent from "./components/FilterComponent";
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";

const CoinDetailedScreen = () => {
    const [coin, setCoin] = useState(null);
    const [coinMarketData, setCoinMarketData] = useState(null);

    const screenWidth = Dimensions.get('window').width;
    const [loading, setLoading] = useState(false);

    const [coinCandleChartData, setCoinCandleChartData] = useState(null);
    const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);

    const [coinValue, setCoinValue] = useState('1');
    const [usdValue, setUsdValue] = useState("0.00");
    const [selectedRange, setSelectedRange] = useState("1");

    const route = useRoute();
    const { coinId } = route.params;

    const filterDaysArray = [
        { filterDay: "1", filterText: "24h" },
        { filterDay: "7", filterText: "7d" },
        { filterDay: "30", filterText: "30d" },
        { filterDay: "365", filterText: "1y" },
        { filterDay: "max", filterText: "All" },
    ];

    const fetchCoinData = async () => {
        setLoading(true);
        const fetchedCoinData = await getDetailedCoinData(coinId);
        const fetchedCoinMarketData = await getCoinMarketChart(coinId);
        setCoin(fetchedCoinData);
        setCoinMarketData(fetchedCoinMarketData);
        setUsdValue(fetchedCoinData?.market_data?.current_price?.usd.toString());
        setLoading(false);
    };

    const fetchMarketCoinData = async (selectedRangeValue) => {
        const fetchedCoinMarketData = await getCoinMarketChart(
            coinId,
            selectedRangeValue
        );
        setCoinMarketData(fetchedCoinMarketData);
    };

    const fetchCandleStickChartData = async (selectedRangeValue) => {
        const fetchedSelectedCandleChartData = await getCandleChartData(
            coinId,
            selectedRangeValue
        );
        setCoinCandleChartData(fetchedSelectedCandleChartData);
    };

    useEffect(() => {
        fetchCoinData();
        fetchMarketCoinData(1);
        fetchCandleStickChartData();
    }, []);

    const onSelectedRangeChange = (selectedRangeValue) => {
        setSelectedRange(selectedRangeValue);
        fetchMarketCoinData(selectedRangeValue);
        fetchCandleStickChartData(selectedRangeValue);
    };

    const memoOnSelectedRangeChange = useCallback((range) => onSelectedRangeChange(range), []);

    if(loading || !coin || !coinMarketData || !coinCandleChartData) {
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
        // @FIXME - correct the data type
        // coin cryptoCurrencyData
    } = coin || {};

    // @FIXME - correct the data type
    const { prices } = coinMarketData; // coinMarketData; cryptoCurrencyData
    const chartColor = usd > prices[0][1] ? '#16c784' : '#Ea3943';

    const formatCurrency = ({ value }) => {
        "worklet";
        if (value === "") {
            if (usd < 1) {
                return `$${usd}`;
            }
            return `$${usd.toFixed(2)}`;
        }
        if (usd < 1) {
            return `$${parseFloat(value)}`;
        }
        return `$${parseFloat(value).toFixed(2)}`;
    };


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
            <LineChart.Provider data={prices.map(([timestamp, value]) => ({ timestamp, value }))}>

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
                    <LineChart.PriceText
                        format={formatCurrency}
                        style={styles.currentPrice}
                    />
                    <TouchableOpacity className={`flex-row items-center space-x-1 mt-2 ${price_change_percentage_24h && price_change_percentage_24h > 0 ? 'bg-[#3cbd48]' : 'bg-[#FF4B4B]'} px-3 py-2 rounded-md`} activeOpacity={0.7}>
                        {price_change_percentage_24h > 0 ? (
                            <FontAwesome name="caret-up" style={{marginBottom: 2}} size={20} color="white" />
                        ) : (
                            <FontAwesome name="caret-down" style={{marginBottom: 2}} size={20} color="white" />
                        )}
                        <Text className="text-white font-semibold">{price_change_percentage_24h.toFixed(2) || 0} %</Text>
                    </TouchableOpacity>
                </View>

                <View className="mx-4">
                    <CoinSelectedFeatures
                        market_cap_rank={market_cap_rank}
                        image={small}
                    />
                    <View className="flex-row py-1 px-2 rounded-lg bg-gray-700/60 justify-between space-x-2 my-3">
                        {filterDaysArray.map((day) => (
                                <FilterComponent
                                    filterDay={day.filterDay}
                                    filterText={day.filterText}
                                    selectedRange={selectedRange}
                                    setSelectedRange={memoOnSelectedRangeChange}
                                    key={day.filterText}
                                />
                            ))}
                        {isCandleChartVisible ? (
                            <TouchableOpacity className="mt-1 -ml-10" activeOpacity={0.7}>
                                <MaterialIcons
                                    name="show-chart"
                                    size={24}
                                    color="#16c784"
                                    onPress={() => setIsCandleChartVisible(false)}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity className="mt-1 -ml-10" activeOpacity={0.7}>
                                <MaterialIcons
                                    name="waterfall-chart"
                                    size={24}
                                    color="#16c784"
                                    onPress={() => setIsCandleChartVisible(true)}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {isCandleChartVisible ? (
                    <CandlestickChart.Provider
                        data={coinCandleChartData.map(
                            ([timestamp, open, high, low, close]) => ({
                                timestamp,
                                open,
                                high,
                                low,
                                close,
                            })
                        )}
                    >
                        <CandlestickChart height={screenWidth / 2} width={screenWidth}>
                            <CandlestickChart.Candles />
                            <CandlestickChart.Crosshair>
                                <CandlestickChart.Tooltip />
                            </CandlestickChart.Crosshair>
                        </CandlestickChart>
                        <View style={styles.candleStickDataContainer}>
                            <View>
                                <Text style={styles.candleStickTextLabel}>Open</Text>
                                <CandlestickChart.PriceText
                                    style={styles.candleStickText}
                                    type="open"
                                />
                            </View>
                            <View>
                                <Text style={styles.candleStickTextLabel}>High</Text>
                                <CandlestickChart.PriceText
                                    style={styles.candleStickText}
                                    type="high"
                                />
                            </View>
                            <View>
                                <Text style={styles.candleStickTextLabel}>Low</Text>
                                <CandlestickChart.PriceText
                                    style={styles.candleStickText}
                                    type="low"
                                />
                            </View>
                            <View>
                                <Text style={styles.candleStickTextLabel}>Close</Text>
                                <CandlestickChart.PriceText
                                    style={styles.candleStickText}
                                    type="close"
                                />
                            </View>
                        </View>
                        <CandlestickChart.DatetimeText
                            style={{ color: "white", fontWeight: "700", margin: 10 }}
                        />
                    </CandlestickChart.Provider>
                ) : (
                    <LineChart height={screenWidth / 2} width={screenWidth}>
                        <LineChart.Path color={chartColor} />
                        <LineChart.CursorCrosshair color={chartColor} />
                    </LineChart>
                )}

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

            </LineChart.Provider>
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
