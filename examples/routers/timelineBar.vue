
<template>
  <div>
    <span>时间轴</span>
    <timeline-bar :colors="jjzlLine1.colors" :xAxis="jjzlLine1.xAxis" :timeData="jjzlLine1.timeData" :series="jjzlLine1.series" :xAxisDec="jjzlLine1.xAxisDec" :yAxisDec="jjzlLine1.yAxisDec" :type="'bar'" :tLabel="jjzlLine1.tLabel" :tLine="jjzlLine1.tLine" :grid="{top:40,left:40,right:40,bottom:0}"></timeline-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
        jjzlLine1: {
            colors: ["#25d4e7", "#fe6b40"],
            timeData: ["2012", "2013", "2014", "2015", "2016"],
            xAxis:["黄石", "十堰", "荆州", "荆门", "孝感", "黄冈"],
            series: [
            [747, 658, 733, 581, 707, 562],
            [733, 581, 707, 683, 398, 586],
            [398, 595, 658, 733, 581, 456],
            [543, 435, 420, 635, 710, 580],
            [453, 530, 472, 382, 637, 560]
            ],
            xAxisDec: {
            type: "value",
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: [ ]
            },
            yAxisDec: {
            type: "category",
            axisLabel: { show: true },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: ["黄石", "十堰", "荆州", "荆门", "孝感", "黄冈"]
            },
            tLabel: {
            show: true,
            position: [400, 0],
            formatter: "{c}"+ '亿元',
            textStyle: {
                color: "#000"
            }
            },
            tLine:{
                show: true,
                top: 0,
                left: "5%",
                right: "10%"
            },
        }
    };
  }
};
</script>
