
<template>
  <div>
    <span>柱状图</span>
    <timeline-bar :colors="jjzlLine.colors" :legend="jjzlLine.legend" :xAxis="jjzlLine.xAxis" :timelineData="jjzlLine.timelineData" :xAxisDec="jjzlLine.xAxisDec" :yAxisDec="jjzlLine.yAxisDec" :type="'bar'" :tLabel="jjzlLine.tLabel"></timeline-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      jjzlLine: {
        colors: ["#25d4e7", "#fe6b40"],
        legend: ["黄石", "十堰", "荆州", "荆门", "孝感", "黄冈"],
        xAxis: ["2012", "2013", "2014", "2015", "2016"],
        timelineData: [
          [747, 658, 733, 581, 707, 562],
          [733, 581, 707, 683, 398, 586],
          [398, 595, 658, 733, 581, 456],
          [543, 435, 420, 635, 700, 580],
          [453, 530, 472, 382, 637, 560]
        ],
        xAxisDec: {
          type: "value",
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          data: []
        },
        yAxisDec:{
         type: "category",
          // axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          data: ["黄石", "十堰", "荆州", "荆门", "孝感", "黄冈"],
        },
        tLabel:{
          show: true,
          position: [420,0],
          formatter: "{c}",
          textStyle: {
            color: "#000"
          }
        }
      }
    }
  },
};
</script>
