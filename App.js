import { StatusBar } from 'expo-status-bar';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from "@expo/vector-icons";

export default function App() {
    const price_change_percentage_24h = +0.1;
  return (
      <View className="flex-1 pt-16 bg-[#121212]">
        <TouchableOpacity className="flex-row items-center justify-between mx-4" activeOpacity={0.7}>
            <View className="flex-row items-center">
                <Image source={{ uri: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'}} className="w-12 h-12 object-contain" />
                <View className="items-start ml-3 w-[200px]">
                    <Text className="text-white text-xl font-semibold">Bitcoin</Text>
                    <View className="flex-row items-center">
                        <View className="w-5 h-5 bg-gray-600 rounded-md items-center justify-center mr-2">
                            <Text className="text-white font-bold">1</Text>
                        </View>
                        <Text className="font-bold uppercase text-gray-400/90 mr-3">BTC</Text>
                        <View className="flex-row items-center space-x-2">
                            {price_change_percentage_24h < 0  ? (
                                <FontAwesome className="mt-1" style={{marginTop: 13}} name="sort-down" size={24} color="#FF4B4B" />
                            ) : (
                                <FontAwesome className="mt-1" style={{marginTop: 13}} name="sort-up" size={24} color="#3DFF4F" />
                            )}
                            <Text className="font-bold uppercase text-gray-400/90">1.02%</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <Text className="text-xl font-bold text-white">56.998.33</Text>
                <Text className="font-bold uppercase text-gray-400/90 text-[15px] mt-2">MCap 1,079 T</Text>
            </View>
        </TouchableOpacity>
        <StatusBar style="light" />
      </View>
  );
}

