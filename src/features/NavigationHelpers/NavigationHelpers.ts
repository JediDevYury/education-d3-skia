import { ArcSlider } from "../ArcSlider";
import { BarChart } from "../BarChart";
import { LineChart } from "../LineChart";
import { Screen } from "../../utils/Screen";
import LineChartWithCursor from "../LineChartWithCursor";

export const AnimationScreenNames = {
  LINE_CHART: "Line Chart 📈",
  BAR_CHART: "Bar Chart 📊",
  TOUCH_INTERACTIONS: "Touch Interactions 👍",
  LINE_CHART_WITH_CURSOR: "Complex Line Chart with animated cursor📈",
};

export const allScreens: Screen[] = [
  {
    name: AnimationScreenNames.LINE_CHART,
    component: LineChart,
  },
  {
    name: AnimationScreenNames.BAR_CHART,
    component: BarChart,
  },
  {
    name: AnimationScreenNames.TOUCH_INTERACTIONS,
    component: ArcSlider,
  },
  {
    name: AnimationScreenNames.LINE_CHART_WITH_CURSOR,
    component: LineChartWithCursor,
  }
];
