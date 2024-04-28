import {data, DataType} from "./data";
import {Canvas, Path, Skia, useFont} from "@shopify/react-native-skia";
import {curveBasis, line, scaleLinear, scalePoint} from "d3";
import {useSharedValue, withDelay, withTiming, clamp, runOnJS, SharedValue} from "react-native-reanimated";
import {SetStateAction, Dispatch, useEffect, useState, useMemo} from "react";
import Gradient from "./Gradient";
import XAxisText from "./XAxisText";
import Cursor from "./Cursor";
import {
  Gesture,
  GestureDetector,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import {getYForX, parse} from "react-native-redash";

type Props = {
  data: DataType[]
  chartHeight: number
  chartMargin: number
  chartWidth: number
  setSelectedDate: Dispatch<SetStateAction<string>>
  selectedValue: SharedValue<number>
}

const LineChart = ({selectedValue, chartWidth, chartHeight, chartMargin, setSelectedDate}:Props) => {
  const [showCursor, setShowCursor] = useState(false);
  const cx = useSharedValue(0);
  const cy = useSharedValue(0);
  const totalValue = useMemo(() => data.reduce((acc, {value}) => acc + value, 0), [data]);

  const xDomain = data.map((xDataPoint) => xDataPoint.label);

  const xRange = [chartMargin, chartWidth - chartMargin];

  const x = scalePoint().domain(xDomain).range(xRange).padding(0);

  const stepX = x.step();

  const max = Math.max(...data.map(({value}) => value));
  const min = Math.min(...data.map(({value}) => value));

  const yDomain = [min, max];

  const yRange = [chartHeight, 0];

  const y = scaleLinear().domain(yDomain).range(yRange);


  const curvedLine = line<DataType>()
   .x((d) => x(d.label)!)
   .y((d) => y(d.value))
   .curve(curveBasis)(data)

  const linePath = Skia.Path.MakeFromSVGString(curvedLine!)
  const animationGradient = useSharedValue({
    x: 0,
    y: 0
  });

  const animationLine = useSharedValue(0);

  const path = parse(linePath!.toSVGString());

  const handleGesturePanEvent = (event: PanGestureHandlerEventPayload) => {
    'worklet'

    const index = Math.floor(event.absoluteX / stepX);

    runOnJS(setSelectedDate)(data[index].date!);

    selectedValue.value = withTiming(data[index].value, {
      duration: 1000,
    })

    const clampValue = clamp(
     Math.floor(event.absoluteX / stepX) * stepX + chartMargin,
     chartMargin,
     chartWidth - chartMargin,
    )
    cx.value = clampValue;
    cy.value = getYForX(path, Math.floor(clampValue))!;
  }

  const panGesture = Gesture.Pan()
   .onTouchesDown(() => {
     runOnJS(setShowCursor)(true);
   })
   .onTouchesUp(() => {
     runOnJS(setShowCursor)(false);
     runOnJS(setSelectedDate)('Total');
     selectedValue.value = withTiming(totalValue);
   })
   .onBegin(handleGesturePanEvent)
   .onChange(handleGesturePanEvent);

  useEffect(() => {
    animationLine.value = withTiming(1, {
      duration: 1000,
    });
    animationGradient.value = withDelay(
     1000,
     withTiming({x: 0, y: chartHeight}, {duration: 500}),
    );

    //set initial value
    selectedValue.value = withTiming(totalValue);
  }, []);

  return (
   <GestureDetector gesture={panGesture}>
     <Canvas style={{
       width: chartWidth,
       height: chartHeight,
     }}>
       <Path
        path={linePath!}
        style={'stroke'}
        strokeWidth={4}
        color={'#eaf984'}
        start={0}
        end={animationLine}
       />
       <Gradient
        chartHeight={chartHeight}
        chartMargin={chartMargin}
        chartWidth={chartWidth}
        curvedLine={curvedLine!}
        animationGradient={animationGradient}
       />
       {data.map((dataPoint) => {
         return (
          <XAxisText
           key={dataPoint.label}
           x={x(dataPoint.label)!}
           y={chartHeight}
           text={dataPoint.label}
          />
         )
       })}
       {showCursor &&
        (
         <Cursor
          cx={cx}
          cy={cy}
          chartHeight={chartHeight}
         />
        )
       }
     </Canvas>
   </GestureDetector>
  );
};

export type LineChartProps = Props;

export default LineChart;
