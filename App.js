import { StatusBar } from 'expo-status-bar';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import cryptoData from './assets/data/cryptocurrencies.json';
import CoinItem from "./src/components/CoinItem";
import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  return (
      <View className="flex-1 pt-16 bg-[#121212]">
          <HomeScreen />
        <StatusBar style="light" />
      </View>
  );
}

