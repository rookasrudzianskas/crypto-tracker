import { StatusBar } from 'expo-status-bar';
import { View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import Navigation from "./src/navigation";
import WatchlistProvider from "./src/contexts/WatchlistContext";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

export default function App() {
  return (
      <NavigationContainer
          theme={{
              colors: {
                  background: "#121212",
              },
          }}
      >
          <RecoilRoot>
              <WatchlistProvider>
                  <View className="flex-1 bg-[#121212]">
                      <Navigation />
                      <StatusBar style="light" />
                  </View>
              </WatchlistProvider>
          </RecoilRoot>
      </NavigationContainer>
  );
}

