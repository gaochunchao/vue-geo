<template>
  <liquid-fill :colorList="['#3797BB', '#3B6996']" borderCor="#3797BB" :percent="35"
               :title="'园区产值占比'"></liquid-fill>
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
