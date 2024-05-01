import { ArcSlider } from "../ArcSlider";
import { BarChart } from "../BarChart";
import { LineChart } from "../LineChart";
import { Screen } from "../../utils/Screen";
import { LineChartWithCursor } from "../LineChartWithCursor";
import { CreditCardPanel } from "../CreditCardPanel";

export const AnimationScreenNames = {
  LINE_CHART: "Line Chart 📈",
  BAR_CHART: "Bar Chart 📊",
  TOUCH_INTERACTIONS: "Touch Interactions 👍",
  LINE_CHART_WITH_CURSOR: "Complex Line Chart with animated cursor📈",
  CREDIT_CARD_PANEL: "Credit Cards Panel 🏦",
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
  },
  {
    name: AnimationScreenNames.CREDIT_CARD_PANEL,
    component: CreditCardPanel,
  }
];
