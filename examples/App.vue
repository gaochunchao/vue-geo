<style lang="less">
  @import "./styles/index.less";
</style>
<template>
  <div class="geo-body">
    <div class="geo-header"></div>
    <div class="geo-container">
      <div class="geo-container-menu">
        <router-link to="/barChart">柱状图</router-link>
        <router-link to="/lineChart">折线图</router-link>
        <router-link to="/pieChart">饼形图</router-link>
        <router-link to="/xMultipleRing">滚动圆环</router-link>
        <router-link to="/cirPross">圆形进度条</router-link>
        <router-link to="/gauge">仪表盘</router-link>
        <router-link to="/irBorder">不规则边框</router-link>
        <router-link to="/shadowBorder">阴影边框</router-link>
        <router-link to="/iconBox">图标列表</router-link>
      </div>
      <div class="geo-container-content">
        <router-view class=""></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  module.exports = {
    data: function () {
      return {}
    },
    mounted: function () {
    },
    beforeDestroy: function () {

    },
    methods: {}
  }
</script>
