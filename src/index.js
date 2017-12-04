import barChart from "./components/barChart";
import lineChart from "./components/lineChart";
import pieChart from "./components/pieChart";
import xMultipleRing from "./components/xMultipleRing"

const components = {
  barChart,
  lineChart,
  pieChart,
  xMultipleRing
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
