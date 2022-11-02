//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import SearchableDropdown from "react-native-searchable-dropdown";
import {useRecoilState} from "recoil";
import {allPortfolioBoughtAssetsInStorage} from "../../atoms/PortfolioAssets";
import {getAllCoins, getDetailedCoinData} from "../../services/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LogBox} from "react-native";

// Not the best solution, but it works
LogBox.ignoreLogs(['Please report: Excessive number of pending callbacks:']);
// Ignore the errors on this screen, it's not finished yet

const AddNewAssetScreen = () => {
    const navigation = useNavigation();
    const [allCoins, setAllCoins] = useState([]);
    const [boughtAssetQuantity, setBoughtAssetQuantity] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedCoinId, setSelectedCoinId] = useState(null);
    const [selectedCoin, setSelectedCoin] = useState(null);

    const [assetsInStorage, setAssetsInStorage] = useRecoilState(
        allPortfolioBoughtAssetsInStorage
    );

    const isQuantityEntered = () => boughtAssetQuantity > 0;

    const fetchAllCoins = async () => {
        if(loading) return;
        setLoading(true);
        const allCoins = await getAllCoins();
        setAllCoins(allCoins);
        setLoading(false);
    }

    const fetchCoinInfo = async () => {
        if(loading) return;
        setLoading(true);
        const coinInfo = await getDetailedCoinData(selectedCoinId);
        setSelectedCoin(coinInfo);
        setLoading(false);
    };

    useEffect(() => {
        fetchAllCoins();
    }, []);

    useEffect(() => {
        if (selectedCoinId) {
            fetchCoinInfo();
        }
    }, [selectedCoinId]);

    const onAddNewAsset = async () => {
        if(!selectedCoin) return;
        const newAsset = {
            id: selectedCoin.id,
            name: selectedCoin.name,
            image: selectedCoin.image.small,
            ticker: selectedCoin?.symbol?.toUpperCase(),
            quantityBought: parseFloat(boughtAssetQuantity),
            priceBought: selectedCoin.market_data.current_price.usd,
        }
        const newAssets = [...assetsInStorage, newAsset];
        const jsonValue = JSON.stringify(newAssets);
        await AsyncStorage.setItem("@portfolio_coins", jsonValue);
        setAssetsInStorage(newAssets);
        navigation.goBack();
    }

    if(loading || !allCoins) {
        return (
            <View className="h-screen items-center justify-center">
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <View className="mx-4">
            <SearchableDropdown
                items={allCoins}
                onItemSelect={(item) => setSelectedCoinId(item.id)}
                containerStyle={styles.dropdownContainer}
                itemStyle={styles.item}
                itemTextStyle={{ color: "white" }}
                resetValue={false}
                placeholder={selectedCoinId || "Select a coin..."}
                placeholderTextColor="white"
                textInputProps={{
                    underlineColorAndroid: "transparent",
                    style: {
                        padding: 12,
                        borderWidth: 1.5,
                        borderColor: "#444444",
                        borderRadius: 5,
                        backgroundColor: "#1e1e1e",
                        color: "white",
                    },
                }}
            />
            <View className="h-[90%] items-center">
                {selectedCoinId && (
                    <View className="mt-16">
                        <View className="flex-row items-center justify-center">
                            <TextInput value={boughtAssetQuantity} onChangeText={setBoughtAssetQuantity}
                                       keyboardType={'numeric'} className="text-gray-800 text-[90px]" placeholder={'0'}/>
                            <Text className="text-gray-400 font-bold uppercase tracking-wider -mt-12 ml-3 text-[17px]">{selectedCoin?.symbol || 'Loading...'}</Text>
                        </View>
                        <View className="items-center justify-center mt-2">
                            <Text className="text-gray-500 font-bold tracking-wider">${selectedCoin?.market_data?.current_price?.usd || 'Loading...'} per coin</Text>
                        </View>
                    </View>
                )}
                <TouchableOpacity activeOpacity={0.7} className={`absolute bottom-6 w-full mx-4 flex-row items-center justify-center py-3 ${isQuantityEntered() ? 'bg-blue-600' : 'bg-gray-600'} rounded-md`}
                                  disabled={!isQuantityEntered()}
                                  onPress={onAddNewAsset}
                >
                    <Text className={`text-white font-bold`}>Add New Asset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddNewAssetScreen;

const styles = StyleSheet.create({
   dropdownContainer: {
       marginTop: 20,
       width: "100%",
       borderRadius: 5,
       backgroundColor: "#1e1e1e",
       color: "white",
   },
    item: {
         padding: 10,
         marginTop: 2,
         backgroundColor: "#1e1e1e",
         borderColor: "#444444",
         borderWidth: 1.5,
         borderRadius: 5,
        marginVertical: 5,
    }
});
