
<template>
    <div>
        <span>柱状图</span>
        <bar-chart :legend="lrZe.legend" :xAxis="lrZe.xAxis" :colorList="lrZe.colorList" :series="lrZe.series" :barWidth="15" legPos="left" :axisLabFmt="true" :wordsNum="3" :avDataBar="lrZe.avdata" :avLineCrl="lrZe.avLineCrl" :isDataZoom="true" :grid="{bottom:50}" :tLabel="{show:false}" lUnit="亿元" ></bar-chart>
    </div>
</template>
<script>
export default {
  data() {
    return {
      // barChart: {
      //     colorList: ['#fe6b40', '#25d4e7'],
      //     yAxis: ['热力', '燃气', '电信', '排水', '给水'],
      //     series: [102, 96, 125, 140, 110]
      //   },
      lrZe: {
        grid:{
          top: 30,
          bottom: 25,
          left: 10,
          right: 15,
          containLabel: true
        },
        legend: ["增幅", "全市累积", "上年同期"],
        xAxis: ["孝南区", "孝昌县", "大悟县", "安陆市", "云梦县", "应城市", "汉川市", "市高新区"],
        avdata:[100],
        avLineCrl:["#459DF7"],
        colorList: ["#25D4E7", "#FE6B40"],
        series: [
          {
            type: "bar",
            data: [287, 229, 333, 481, 367, 233, 148, 295]
          },
          {
            type: "line",
            data: [747, 658, 733, 581, 707, 683, 398, 595]
          }
        ]
      }
    };
  }
};
</script>
