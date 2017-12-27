<template>
    <liquid-fill :dataList="yqzb.dataList" :colorList="['#3797BB', '#3B6996']" :percent="'45%'" :title="'园区产值占比'"></liquid-fill>
</template>
<script>
export default {
  data() {
    return {
      yqzb: {
        dataList: [0.5, 0.45]
      }
    };
  }
};
</script>
