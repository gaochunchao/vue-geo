
import barChart from "./components/barChart";
import lineChart from "./components/lineChart";
import pieChart from "./components/pieChart";
import timelineBar from "./components/timelineBar";
import multipleRing from "./components/multipleRing"
import cirPross from "./components/cirPross"
import gauge from "./components/gauge"
import tableForm from "./components/table"
import irBorder from "./components/irBorder"
import shadowBorder from "./components/shadowBorder"
import iconBox from "./components/iconBox"
import xLabel from "./components/xLabel"
import yLabel from "./components/yLabel"
import xLegend from "./components/xLegend"
import yLegend from "./components/yLegend"
import liquidFill from "./components/liquidFill"
import xRing from "./components/xRing"
import xProgress from "./components/xProgress"
import bProgress from "./components/bProgress"

const components = {
  barChart,
  timelineBar,
  lineChart,
  pieChart,
  multipleRing,
  cirPross,
  gauge,
  tableForm,
  irBorder,
  shadowBorder,
  iconBox,
  xLabel,
  yLabel,
  xLegend,
  yLegend,
  liquidFill,
  xRing,
  xProgress,
  bProgress,
}

const geoView = {
  ...components
};

function install (Vue, _) {
  Object.keys(geoView).forEach(key => {
    Vue.component(key, geoView[key]);
  });
}


const API = {
  version: process.env.VERSION,
  install,
  ...components
}

module.exports.default = module.exports = API;
