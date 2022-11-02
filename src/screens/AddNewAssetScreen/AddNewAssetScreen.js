//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import SearchableDropdown from "react-native-searchable-dropdown";
import {useRecoilState} from "recoil";
import {allPortfolioBoughtAssetsInStorage} from "../../atoms/PortfolioAssets";

const AddNewAssetScreen = () => {
    const navigation = useNavigation();
    const [allCoins, setAllCoins] = useState([]);
    const [boughtAssetQuantity, setBoughtAssetQuantity] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedCoinId, setSelectedCoinId] = useState(null);
    const [selectedCoin, setSelectedCoin] = useState(null);

    const [assetsInStorage, setAssetsInStorage] = useRecoilState(
        allPortfolioBoughtAssetsInStorage
    );

    const fetchAllCoins = async () => {
        if(loading) return;
        setLoading(true);
        const allCoins = await getAllCoins();
        setAllCoins(allCoins);
        setLoading(false);
    }

    useEffect(() => {
        fetchAllCoins();
    }, []);

    const onAddNewAsset = () => {
        const newAsset = {
            id: selectedCoin.id,
        }
    }

    return (
        <View className="mx-4">
            <SearchableDropdown
                items={allCoins}
                onItemSelect={(item) => {}}
                containerStyle={styles.dropdownContainer}
                itemStyle={styles.item}
                itemTextStyle={{ color: "white" }}
                resetValue={false}
                placeholder={"Select a coin..."}
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
                <View className="mt-16">
                    <View className="flex-row items-center justify-center">
                        <TextInput value={boughtAssetQuantity} onChangeText={(text) => setBoughtAssetQuantity(text)} keyboardType={'numeric'} className="text-gray-800 text-[90px]" placeholder={'0'}/>
                        <Text className="text-gray-400 font-bold uppercase tracking-wider -mt-12 ml-3 text-[17px]">BTC</Text>
                    </View>
                    <View className="items-center justify-center mt-2">
                        <Text className="text-gray-500 font-bold tracking-wider">47018.00$ per coin</Text>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.7} className="absolute bottom-6 w-full mx-4 flex-row items-center justify-center py-3 bg-blue-600 rounded-md"
                                  onPress={onAddNewAsset}
                >
                    <Text className="text-white font-bold">Add New Asset</Text>
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
   }
});
