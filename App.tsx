import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import FeaturesStack from "./src/features/FeaturesStack";
import { HomeScreen } from "./src/Home";
import { Platform } from "react-native";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: Platform.OS === "android" ? "modal" : undefined,
        }}
      >
        <Stack.Screen name="Menu" component={HomeScreen} />
        <Stack.Screen name="Features" component={FeaturesStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
