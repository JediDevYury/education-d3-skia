import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {useState} from "react";
import {data} from "./data";
import Card from "./Card";
import Animated, {Extrapolation, interpolate, runOnJS, useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import Activity from "./Activity";

export const CreditCardPanel = () => {
  const [newData, setNewData] = useState([...data]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const animatedValue = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    if (animatedValue.value > currentIndex + 0.5) {
      runOnJS(setActivityIndex)(currentIndex + 1);
    } else {
      runOnJS(setActivityIndex)(currentIndex);
    }
    const opacity = interpolate(
     animatedValue.value,
     [currentIndex, currentIndex + 0.3, currentIndex + 0.8, currentIndex + 1],
     [1, 0, 0, 1],
     Extrapolation.CLAMP,
    );

    return {
      opacity: opacity,
    };
  });

  const MAX = 3;

  return (
   <GestureHandlerRootView style={{
      flex: 1
   }}>
     <SafeAreaView style={styles.container}>
       <View style={[styles.cardContainer]}>
         {
           newData.map((item, index) => {
             if(index > currentIndex + MAX || index < currentIndex) {
               return null;
             }

             return (
              <Card
               item={item}
               index={index}
               key={item.cardId}
               dataLength={newData.length}
               maxVisibleItem={MAX}
               currentIndex={currentIndex}
               animatedValue={animatedValue}
               setNewData={setNewData}
               setCurrentIndex={setCurrentIndex}
               newData={newData}
              />
             );
           })
         }
       </View>
       <Text style={styles.text}>Recent Activity</Text>
       <View style={styles.activityContainer}>
         <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={[{width: "100%"}, animatedStyle]}
         >
           {newData[activityIndex].activity.map((item, index) => {
              return (
                <Activity
                item={item}
                key={index}
                />
              );
           })}
         </Animated.ScrollView>
       </View>
     </SafeAreaView>
   </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111"
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activityContainer: {
    flex: 3 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    position: 'relative',
    paddingHorizontal: 16,
  },
});
