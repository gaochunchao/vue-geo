<template>
    <div>
        <span>百分比进度</span>
        <cir-Pross :percent="waterRing[0].rate" :radii="58" :lineWidth="12" color="#f9693f"></cir-Pross>
    </div>
</template>
<script>
export default {
  data() {
    return {
      waterRing: [
        {
          rate: 80,
          name: "污水处理率"
        }
      ]
    };
  }
};
</script>
