import { StatusBar } from 'expo-status-bar';
import {ActivityIndicator, View} from 'react-native';
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
import {useFonts} from "expo-font";
import {Inter_900Black} from "@expo-google-fonts/inter";
import 'react-native-gesture-handler';

export default function App() {
    let [fontsLoaded] = useFonts({
        Inter_900Black,
    });

    if(!fontsLoaded) {
        return (
            <View className="h-screen items-center justify-center">
                <ActivityIndicator />
            </View>
        )
    }

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

