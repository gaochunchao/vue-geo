<template>
  <div>
    <span>仪表盘</span>
    <gauge name="污水处理率" :percent="csjzhjdata.amount1"
           :src="['../../static/images/bftd.png','../../static/images/jt1.png']"></gauge>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        csjzhjdata: {
          amount1: 60
        }
      }
    }
  }
</script>

