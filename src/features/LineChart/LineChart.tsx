import {
  SkPath,
  Skia,
  Canvas,
  Line,
  vec,
  Path,
  useValue,
  runTiming,
  Easing,
  useComputedValue,
} from "@shopify/react-native-skia";
import { StyleSheet, View, Pressable, Text } from "react-native";

import { animatedData, DataPoint, originalData } from "./Data";
import {curveBasis, line, scaleLinear, scaleTime} from "d3";

interface GraphData {
  min: number;
  max: number;
  curve: SkPath;
}

export const LineChart = () => {
  const transition = useValue(1);
  const state = useValue({
    currentChart: 0,
    nextChart: 1,
  });

  const GRAPH_HEIGHT = 400;
  const GRAPH_WIDTH = 370;

  const makeGraph = (data: DataPoint[]): GraphData => {
    const min = Math.min(...data.map((val) => val.value));
    const max = Math.max(...data.map((val) => val.value));

    const getYAxis = scaleLinear()
      .domain([0, max])
      .range([GRAPH_HEIGHT, 35]);

    const getXAxis = scaleTime()
      .domain([new Date(2000, 1, 1), new Date(2000, 1, 15)])
      .range([10, GRAPH_WIDTH - 10]);

    const curvedLine = line<DataPoint>()
      .x((d) => getXAxis(new Date(d.date)))
      .y((d) => getYAxis(d.value))
      .curve(curveBasis)(data) as string;

    const skPath = Skia.Path.MakeFromSVGString(curvedLine);

    return {
      min,
      max,
      curve: skPath!,
    }
  };

  const graphData = [makeGraph(originalData), makeGraph(animatedData)];

  const transitionCharts = (target: number) => {
    state.current = {
      currentChart: target,
      nextChart: state.current.currentChart,
    }

    transition.current = 0;

    runTiming(transition, 1, {
      duration: 500,
      easing: Easing.inOut(Easing.cubic)
    });
  };

  const currentPath = useComputedValue(() => {
    const start = graphData[state.current.currentChart].curve;
    const end = graphData[state.current.nextChart].curve;

    const result = start.interpolate(end, transition.current);

    return result?.toSVGString() ?? '';
  }, [state, transition]);

  return (
   <View style={styles.container}>
     <View style={{flexDirection: "column"}}>
        <Canvas style={{
          height: GRAPH_HEIGHT,
          width: GRAPH_WIDTH,
        }}>
          <Line
           p1={vec(10, 130)}
           p2={vec(400, 130)}
           color="lightgrey"
           style="stroke"
           strokeWidth={1}
          />
          <Line
           p1={vec(10, 250)}
           p2={vec(400, 250)}
           color="lightgrey"
           style="stroke"
           strokeWidth={1}
          />
          <Line
           p1={vec(10, 370)}
           p2={vec(400, 370)}
           color="lightgrey"
           style="stroke"
           strokeWidth={1}
          />
          <Path
           path={currentPath}
           color="purple"
           strokeWidth={4}
           style="stroke"
          />
        </Canvas>
        <View style={styles.buttonContainer}>
          <Pressable
           style={styles.buttonStyle}
           onPress={() => transitionCharts(1)}
          >
            <Text style={styles.textStyle}>Graph 1</Text>
          </Pressable>
          <Pressable
           style={styles.buttonStyle}
           onPress={() => transitionCharts(0)}
          >
            <Text style={styles.textStyle}>Graph 2</Text>
          </Pressable>
        </View>
     </View>
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonStyle: {
    marginRight: 20,
    backgroundColor: "#6231ff",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textStyle: {
    color: "white",
    fontSize: 20,
  },
});
