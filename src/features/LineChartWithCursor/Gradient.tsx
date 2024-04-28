import {Path, Skia, LinearGradient} from "@shopify/react-native-skia";
import {SharedValue} from "react-native-reanimated";

type GradientProps = {
  curvedLine: string
  animationGradient: SharedValue<{x: number; y: number}>
  chartWidth: number
  chartHeight: number
  chartMargin: number
};

const Gradient = ({animationGradient, curvedLine, chartWidth, chartHeight, chartMargin}: GradientProps) => {
  const getGradient = (
    chartLine: string,
    width: number,
    height: number,
  ) =>  {
    const gradientAreaSplit = Skia.Path.MakeFromSVGString(chartLine)!;

    if(gradientAreaSplit) {
      gradientAreaSplit
       .lineTo(width - chartMargin, height)
       .lineTo(chartMargin, height)
       .lineTo(chartMargin, gradientAreaSplit.getPoint(0).y)
    }

    return gradientAreaSplit;
  }


  return (
   <Path
    path={getGradient(curvedLine!, chartWidth, chartHeight)}
    color={'pink'}
   >
    <LinearGradient
     start={{x: 0, y: 0}}
     end={animationGradient}
     colors={['rgba(234, 249,123,.2)', 'rgba(234, 249,132,.0)']}
    />
   </Path>
  );
};

export default Gradient;
