//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {FontAwesome} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import PortfolioAssetItem from "../PortfolioAssetItem";
import {useRecoilState, useRecoilValue} from "recoil";
import {allPortfolioAssets} from "../../../../atoms/PortfolioAssets";

const PortfolioAssetsList = () => {
    const navigation = useNavigation();
    const price_change_percentage_24h = 0.5;
    const assets = useRecoilValue(allPortfolioAssets);

    console.log(assets);

    return (
        <FlatList
            data={assets}
            renderItem={({item}) => <PortfolioAssetItem assetItem={item} />}
            ListHeaderComponent={
                <View className="pt-16 mx-4">
                    <View>
                        <Text className="text-md text-white font-[600]">Current Balance</Text>
                    </View>
                    <View className="mt-2 flex-row justify-between">
                        <View>
                            <Text className="text-4xl tracking-wider font-[600] text-white">25430.22$</Text>
                            <Text className="text-green-700 font-[500] tracking-wider">$99.00 (All time)</Text>
                        </View>
                        <View>
                            <TouchableOpacity className={`flex-row items-center space-x-1 mt-2 ${price_change_percentage_24h && price_change_percentage_24h > 0 ? 'bg-[#3cbd48]' : 'bg-[#FF4B4B]'} px-3 py-2 rounded-md`} activeOpacity={0.7}>
                                {price_change_percentage_24h > 0 ? (
                                    <FontAwesome name="caret-up" style={{marginBottom: 2}} size={20} color="white" />
                                ) : (
                                    <FontAwesome name="caret-down" style={{marginBottom: 2}} size={20} color="white" />
                                )}
                                <Text className="text-white font-semibold">{price_change_percentage_24h.toFixed(2) || 0} %</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="my-4">
                        <Text className="text-white font-[600] text-2xl">Your Assets</Text>
                    </View>
                </View>
            }
            ListFooterComponent={
                <TouchableOpacity activeOpacity={0.7} className=" mx-4 flex-row items-center justify-center py-3 bg-blue-600 rounded-md"
                    onPress={() => navigation.navigate("AddNewAssetScreen")}
                >
                    <Text className="text-white font-bold">Add New Asset</Text>
                </TouchableOpacity>
            }
        />
    );
};

export default PortfolioAssetsList;
