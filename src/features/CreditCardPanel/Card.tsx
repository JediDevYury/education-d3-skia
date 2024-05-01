import {Text, View, StyleSheet, Image, useWindowDimensions} from 'react-native';
import {DataType} from "./data";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import Animated, {
  interpolate, runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import {Dispatch, SetStateAction} from "react";

type Props = {
  item: DataType;
  index: number;
  dataLength: number;
  maxVisibleItem: number;
  currentIndex: number;
  animatedValue: SharedValue<number>;
  setNewData: Dispatch<SetStateAction<DataType[]>>;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  newData: DataType[];
}

const Card = ({ item, index, dataLength, maxVisibleItem, currentIndex, animatedValue, setCurrentIndex, setNewData, newData }:Props) => {
  const {width} = useWindowDimensions()
  const translateX = useSharedValue(0);
  const direction = useSharedValue(0);

  const panGesture = Gesture.Pan()
   .onUpdate(event => {
     const isSwipingRight = event.translationX > 0;

     direction.value = isSwipingRight ? 1 : -1;

     if (index === currentIndex) {
       translateX.value = event.translationX;
       animatedValue.value = interpolate(
          Math.abs(translateX.value),
          [0, width],
          [index, index + 1]
       );
     }
   }).onEnd((event) => {
     if (index === currentIndex) {
       if (Math.abs(event.translationX) > 150 || Math.abs(event.velocityX) > 1000){
         translateX.value = withTiming(width * direction.value, {}, () => {
           runOnJS(setCurrentIndex)(currentIndex + 1)
           runOnJS(setNewData)([...newData, newData[currentIndex]]);
         })
         animatedValue.value = withTiming(currentIndex + 1)
       } else {
         translateX.value = withTiming(0, {
           duration: 500
         })
       }
     }
   });

  const animatedStyle = useAnimatedStyle(() => {
    const currentItem = currentIndex === index;

    const rotateZ = interpolate(
     Math.abs(translateX.value),
      [0, width],
      [0, 20]
    )

    const translateY = interpolate(
      animatedValue.value,
      [index - 1, index],
      [-30, 0]
    )

    const scale = interpolate(
     animatedValue.value,
     [index - 1, index],
     [0.9, 1]
    )

    const opacity = interpolate(
      animatedValue.value + maxVisibleItem,
      [index - 1, index],
      [0.5, 1]
    )

    return {
      transform: [
        {
          scale: currentItem ? 1 : scale,
        },
        {
          translateY: currentItem ? 0 : translateY,
        },
        {
          translateX: translateX.value,
        },
        {
          rotateZ:
           currentItem ?
            `${rotateZ * direction.value}deg` :
            "0deg",
        }
      ],
      opacity: index < maxVisibleItem + currentIndex ? 1 : opacity,
    }
  });

  return (
   <GestureDetector gesture={panGesture}>
     <Animated.View
      style={[styles.container, {
        backgroundColor: item.backgroundColor,
        zIndex: dataLength - index,
        opacity: index === maxVisibleItem ? 0 : 1,
      }, animatedStyle]}>
       <View style={styles.top}>
         <Text style={styles.textName}>{item.name}</Text>
         <View style={styles.imageContainer}>
           <Image source={item.image} style={styles.image} />
         </View>
       </View>
       <View style={styles.middle}>
         <Text style={styles.textNumber}>{item.number}</Text>
       </View>
       <View style={styles.bottom}>
         <View>
           <Text style={styles.text}>VALID THRU</Text>
           <Text style={styles.text}>{item.exp}</Text>
         </View>
         <View>
           <Text style={styles.text}>CVV</Text>
           <Text style={styles.text}>{item.cvv}</Text>
         </View>
       </View>
     </Animated.View></GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 360,
    height: 200,
    borderRadius: 28,
    padding: 16,
  },
  imageContainer: {
    width: 80,
    height: 40,
  },
  image: {
    width: 80,
    height: 40,
    resizeMode: "contain",
  },
  top: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  middle: {
    flex: 2,
    justifyContent: "center",
  },
  bottom: {
    flex: 1,
    flexDirection: "row",
    gap: 56,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  textNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  textName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  }
});

export default Card;
