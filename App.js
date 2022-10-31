import { StatusBar } from 'expo-status-bar';
import { View} from 'react-native';
import HomeScreen from "./src/screens/HomeScreen";
import CoinDetailedScreen from "./src/screens/CoinDetailedScreen";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  return (
      <NavigationContainer
          theme={{
              colors: {
                  background: "#121212",
              },
          }}
      >
          <View className="flex-1 bg-[#121212]">
              {/*<HomeScreen />*/}
              <CoinDetailedScreen />
              <StatusBar style="light" />
          </View>

      </NavigationContainer>
  );
}

