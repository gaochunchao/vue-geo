<template>
  <liquid-fill :colorList="['#3797BB', '#3B6996']" borderCor="#3797BB" :percent="yqzb.percent"
               :title="'园区产值占比'"></liquid-fill>
</template>
<script>
export default {
  data() {
    return {
      yqzb: {
        percent:"25"
      }
    };
  }
};
</script>
