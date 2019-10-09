<template>
    <div>
        <span>百分比进度</span>
      <cir-Pross :percent="rate" :radius="58" :lineWidth="8" percentCor="#FFB448" color="#FFB448" font="30px Arial"></cir-Pross>
    </div>
</template>
<script>
export default {
    data() {
        return {
            rate: 75,
            
        };
    },
    mounted(){
    
    }
};
</script>
