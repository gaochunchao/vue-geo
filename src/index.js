
import barChart from "./components/barChart";
import lineChart from "./components/lineChart";
import pieChart from "./components/pieChart";
import xMultipleRing from "./components/xMultipleRing"
import cirPross from "./components/cirPross"
import gauge from "./components/gauge"
import irBorder from "./components/irBorder"
import shadowBorder from "./components/shadowBorder"
import iconBox from "./components/iconBox"

const components = {
  barChart,
  lineChart,
  pieChart,
  xMultipleRing,
  cirPross,
  gauge,
  irBorder,
  shadowBorder,
  iconBox
}

const geoView = {
  ...components
};

function install(Vue, _) {
  Object.keys(geoView).forEach(key => {
    Vue.component(key, geoView[key]);
  });
}


const API = {
  install,
  ...components
}

module.exports.default = module.exports = API;   // eslint-disable-line no-undef
