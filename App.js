import { StatusBar } from 'expo-status-bar';
import { View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import Navigation from "./src/navigation";

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
              <Navigation />
              <StatusBar style="light" />
          </View>

      </NavigationContainer>
  );
}

