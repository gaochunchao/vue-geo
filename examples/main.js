/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import geoView from '../src/index';
import '../src/styles/index.less'
import barChart from './routers/barChart.vue'
import xMultipleRing from './routers/xMultipleRing.vue'
import lineChart from './routers/lineChart.vue'
import pieChart from './routers/pieChart.vue'


Vue.use(VueRouter);
Vue.use(geoView);

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
  routes: [
    {
      path: '/barChart',
      component: barChart
    },
    {
      path: '/xMultipleRing',
      component: xMultipleRing
    },
    {
      path: '/lineChart',
      component: lineChart
    },
    {
      path: '/pieChart',
      component: pieChart
    }
  ]
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
