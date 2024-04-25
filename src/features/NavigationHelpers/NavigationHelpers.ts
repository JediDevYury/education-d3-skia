import { ArcSlider } from "../ArcSlider";
import { BarChart } from "../BarChart";
import { LineChart } from "../LineChart";
import { Screen } from "../../utils/Screen";

export const AnimationScreenNames = {
  LINE_CHART: "Line Chart 📈",
  BAR_CHART: "Bar Chart 📊",
  TOUCH_INTERACTIONS: "Touch Interactions 👍",
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
];
