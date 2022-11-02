//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Pressable} from 'react-native';
import {FontAwesome} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import PortfolioAssetItem from "../PortfolioAssetItem";
import {useRecoilValue} from "recoil";
import {allPortfolioAssets} from "../../../../atoms/PortfolioAssets";
import {SwipeListView} from "react-native-swipe-list-view";

const PortfolioAssetsList = () => {
    const navigation = useNavigation();
    const assets = useRecoilValue(allPortfolioAssets);

    const getCurrentBalance = () =>
        assets.reduce(
            (total, currentAsset) =>
                total + currentAsset.currentPrice * currentAsset.quantityBought,
            0
        );

    const getCurrentValueChange = () => {
        const currentBalance = getCurrentBalance();
        const boughtBalance = assets.reduce((total, currentAsset) => total + currentAsset.priceBought * currentAsset.quantityBought, 0);
        return (currentBalance - boughtBalance).toFixed(2);
    }

    const getCurrentPercentageChange = () => {
        const currentBalance = getCurrentBalance();
        const boughtBalance = assets.reduce((total, currentAsset) => total + currentAsset.priceBought * currentAsset.quantityBought, 0);
        return (((currentBalance - boughtBalance) / boughtBalance) * 100).toFixed(2) || 0;
    }


    const renderDeleteButton = (data) => {
        return (
            <Pressable activeOpacity={1}
                style={{
                    flex: 1,
                    backgroundColor: "#EA3943",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingRight: 30,
                    marginHorizontal: 20,
                }}
                // onPress={() => onDeleteAsset(data)}
            >
                <FontAwesome name="trash-o" size={22} color="white" />
            </Pressable>
        );
    };

    return (
        <SwipeListView
            data={assets}
            renderItem={({item}) => <PortfolioAssetItem assetItem={item} />}
            rightOpenValue={-75}
            disableRightSwipe
            renderHiddenItem={(data) => renderDeleteButton(data)}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={({id}, index) => `${id}${index}`}
            ListHeaderComponent={
                <View className="pt-16 mx-4">
                    <View>
                        <Text className="text-md text-white font-[600]">Current Balance</Text>
                    </View>
                    <View className="mt-2 flex-row justify-between">
                        <View>
                            <Text className="text-4xl tracking-wider font-[600] text-white">{getCurrentBalance().toFixed(2) || 0}$</Text>
                            <Text className={`${getCurrentPercentageChange() ? 'text-green-700' : 'text-red-700'} font-[500] tracking-wider`}>${getCurrentValueChange() || 0} (All time)</Text>
                        </View>
                        <View>
                            <TouchableOpacity className={`flex-row items-center space-x-1 mt-2 ${getCurrentPercentageChange() > 0 ? 'bg-[#3cbd48]' : 'bg-[#FF4B4B]'} px-3 py-2 rounded-md`} activeOpacity={0.7}>
                                {getCurrentPercentageChange() > 0 ? (
                                    <FontAwesome name="caret-up" style={{marginBottom: 2}} size={20} color="white" />
                                ) : (
                                    <FontAwesome name="caret-down" style={{marginBottom: 2}} size={20} color="white" />
                                )}
                                <Text className="text-white font-semibold">{getCurrentPercentageChange() || 0}%</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="my-4">
                        <Text className="text-white font-[600] text-2xl">Your Assets</Text>
                    </View>
                </View>
            }
            ListFooterComponent={
                <TouchableOpacity activeOpacity={0.7} className=" mx-8 flex-row items-center justify-center py-3 bg-blue-600 rounded-md"
                    onPress={() => navigation.navigate("AddNewAssetScreen")}
                >
                    <Text className="text-white font-bold">Add New Asset</Text>
                </TouchableOpacity>
            }
        />
    );
};

export default PortfolioAssetsList;
