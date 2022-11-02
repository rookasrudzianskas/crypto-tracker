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
            <View>
                <View className="mx-4">
                    <Text
                        // style={{ fontFamily: 'Inter_900Black' }}
                        className="text-3xl font-bold text-white tracking-wider mb-2">Crypto assets</Text>
                </View>
            </View>
            <View>
                <FlatList
                    data={coins}
                    onEndReached={() => fetchCoins(coins.length / 49 + 1)}
                    refreshControl={
                        <RefreshControl refreshing={loading} tintColor={'white'} onRefresh={refetchCoins} />
                    }
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => <CoinItem marketCoin={item} index={index} />}
                />
            </View>
        </View>
    );
};

// const _renderitem = ({item, index}) => <CoinItem marketCoin={item} index={index} />

export default HomeScreen;
