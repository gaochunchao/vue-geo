/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import geoView from '../src/index';
import '../src/styles/index.less'                                          
import barChart from './routers/barChart.vue'
import timelineBar from './routers/timelineBar.vue'
import multipleRing from './routers/multipleRing.vue'
import lineChart from './routers/lineChart.vue'
import pieChart from './routers/pieChart.vue'
import cirPross from './routers/cirPross.vue'
import gauge from './routers/gauge.vue'
import table from './routers/table.vue'
import irBorder from './routers/irBorder.vue'
import shadowBorder from './routers/shadowBorder.vue'
import iconBox from './routers/iconBox.vue'
import xLabel from './routers/xLabel.vue'
import yLabel from './routers/yLabel.vue'
import xLegend from './routers/xLegend.vue'
import yLegend from './routers/yLegend.vue'
import liquidFill from './routers/liquidFill.vue'


Vue.use(VueRouter);
Vue.use(geoView);

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
  routes: [{
      path: '/barChart',
      component: barChart
    },
    {
      path: '/multipleRing',
      component: multipleRing
    },
    {
      path: '/lineChart',
      component: lineChart
    },
    {
      path: '/pieChart',
      component: pieChart
    },
    {
      path: '/timelineBar',
      component: timelineBar
    },
    {
      path: '/cirPross',
      component: cirPross
    },
    {
      path: '/gauge',
      component: gauge
    },
    {
      path: '/table',
      component: table
    },
    {
      path: '/irBorder',
      component: irBorder
    },
    {
      path: '/shadowBorder',
      component: shadowBorder
    },
    {
      path: '/iconBox',
      component: iconBox
    },
    {
      path: '/xLabel',
      component: xLabel
    },
    {
      path: '/yLabel',
      component: yLabel
    },
    {
      path: '/xLegend',
      component: xLegend
    },
    {
      path: '/yLegend',
      component: yLegend
    }, {
      path: '/liquidFill',
      component: liquidFill
    },
  ]
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
