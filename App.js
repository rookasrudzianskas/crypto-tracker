import { StatusBar } from 'expo-status-bar';
import { View} from 'react-native';
import HomeScreen from "./src/screens/HomeScreen";
import CoinDetailedScreen from "./src/screens/CoinDetailedScreen";

export default function App() {
  return (
      <View className="flex-1 pt-16 bg-[#121212]">
          {/*<HomeScreen />*/}
          <CoinDetailedScreen />
        <StatusBar style="light" />
      </View>
  );
}

