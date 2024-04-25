import {
  Canvas,
  Path,
  runTiming,
  Skia,
  Text,
  useComputedValue,
  useFont,
  useValue,
} from "@shopify/react-native-skia";
import React from "react";
import { Button, Easing, StyleSheet, View } from "react-native";

import * as d3 from "d3";

interface DataPoint {
  label: string;
  value: number;
}

const data: DataPoint[] = [
  { label: "Jan", value: 50 },
  { label: "Feb", value: 100 },
  { label: "Mar", value: 350 },
  { label: "Apr", value: 200 },
  { label: "May", value: 550 },
  { label: "Jun", value: 300 },
  { label: "Jul", value: 150 },
  { label: "Aug", value: 400 },
  { label: "Sep", value: 450 },
  { label: "Oct", value: 500 },
  { label: "Nov", value: 250 },
  { label: "Dec", value: 600 },
];

const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 8;

const CanvasHeight = 350;
const CanvasWidth = 350;
const graphHeight = CanvasHeight - 2 * GRAPH_MARGIN;
const graphWidth = CanvasWidth - 2;

export const BarChart = () => {
  const animationState = useValue(1);

  const animate = () => {
    animationState.current = 0;
    runTiming(animationState, 1, {
      duration: 1600,
      easing: Easing.inOut(Easing.exp),
    });
  };

  const font = useFont(require("../../../Roboto-Bold.ttf"), 10);
  const xDomain = data.map((xDataPoint) => xDataPoint.label);
  const xRange = [0, graphWidth];

  const yDomain = [
    0,
    d3.max(data, (yDataPoint: DataPoint) => yDataPoint.value)!
  ];
  const yRange = [0, graphHeight];

  const y = d3.scaleLinear().domain(yDomain).range(yRange);
  const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);

  const graphPath = useComputedValue(() => {
    const newPath = Skia.Path.Make();

    data.forEach((dataPoint) => {
      const rect = Skia.XYWHRect(
       x(dataPoint.label)! - GRAPH_BAR_WIDTH / 2,
       graphHeight,
       GRAPH_BAR_WIDTH,
       y(dataPoint.value * animationState.current) * -1,
      );

      const roundedRect = Skia.RRectXY(rect, 0, 0);

      newPath.addRRect(roundedRect);
    });

    return newPath;
  }, [animationState]);

  if(!font) {
    return <View />;
  }

  return (
   <View style={styles.container}>
     <Canvas style={styles.canvas}>
       <Path path={graphPath} color="purple" />
       {data.map((dataPoint) => {
          return (
            <Text
             key={dataPoint.label}
             font={font}
             x={x(dataPoint.label)! - 10}
             y={CanvasHeight + 10}
             text={dataPoint.label}
            />
          );
       })}
     </Canvas>
     <Button title="Animate" onPress={animate} />
   </View>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
  canvas: {
    height: CanvasHeight,
    width: CanvasWidth,
  },
});
