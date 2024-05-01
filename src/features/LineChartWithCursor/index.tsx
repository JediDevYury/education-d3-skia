import {StyleSheet, SafeAreaView, useWindowDimensions, Text} from 'react-native';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import LineChart from './LineChart';
import {data} from "./data";
import {useState} from "react";
import AnimatedText from "./AnimatedText";
import {useFont} from "@shopify/react-native-skia";
import {useSharedValue} from "react-native-reanimated";

export const LineChartWithCursor = () => {
  const CHART_HEIGHT = 400
  const CHART_MARGIN = 20
  const {width: CHART_WIDTH} = useWindowDimensions()
  const [selectedDate, setSelectedDate] = useState("Total");
  const selectedValue = useSharedValue(0);

  const font = useFont(require("../../../bruno.ttf"), 20);

  if(!font) {
    return null;
  }

  return (
   <GestureHandlerRootView style={{
     flex: 1
   }}>
     <SafeAreaView style={styles.container}>
       <Text style={styles.text}>{selectedDate} Expenses</Text>
       <AnimatedText selectedValue={selectedValue} font={font}/>
       <LineChart
        data={data}
        chartHeight={CHART_HEIGHT}
        chartMargin={CHART_MARGIN}
        chartWidth={CHART_WIDTH}
        setSelectedDate={setSelectedDate}
        selectedValue={selectedValue}
       />
     </SafeAreaView>
   </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d"
  },
  text: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
});
