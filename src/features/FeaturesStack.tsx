import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import {
  allScreens,
} from "./NavigationHelpers/NavigationHelpers";
import {Components} from "./Components";

export default function FeaturesStack() {
  const Stack = createStackNavigator();

  const getScreenConfig = (screen: string) => {
    switch (screen) {
      default:
        return undefined;
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Components" component={Components}/>
      {allScreens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={getScreenConfig(screen.name)}
        />
      ))}
    </Stack.Navigator>
  );
}
