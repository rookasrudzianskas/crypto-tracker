import { StatusBar } from 'expo-status-bar';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import cryptoData from './assets/data/cryptocurrencies.json';
import CoinItem from "./src/components/CoinItem";

export default function App() {
  return (
      <View className="flex-1 pt-16 bg-[#121212]">
          <FlatList
              data={cryptoData}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                  <CoinItem marketCoin={item} index={index} />
              )} />
        <StatusBar style="light" />
      </View>
  );
}

