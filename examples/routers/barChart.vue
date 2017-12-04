<template>
  <div>
    <span>柱状图</span>
    <bar-chart :legend="lrZe.legend" :xAxis="lrZe.xAxis" :colorList="lrZe.colorList" :series="lrZe.series"
               :barWidth="15" legPos="left" :axisLabFmt="true" :wordsNum="3" :axisLineClr="'#000'" :axisLalClr="'#000'"
               :legCrl="'#000'" :splitLineClr="'#000'" :avDataBar="lrZe.avdata" :avLineCrl="lrZe.avLineCrl"
               :isDataZoom="true" :gridBottom="30"></bar-chart>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        lrZe: {
          legend: ["增幅", "全市累积", "上年同期"],
          xAxis: ["孝南区", "孝昌县", "大悟县", "安陆市", "云梦县", "应城市", "汉川市", "市高新区"],
          avdata: [100],
          avLineCrl: ["#2eadbc"],
          colorList: ["#fe6b40", "#1f7be8", "#2eadbc"],
          series: [
            {
              type: "bar",
              data: [287, 229, 333, 481, 367, 233, 148, 295]
            },
            {
              type: "bar",
              data: [747, 658, 733, 581, 707, 683, 398, 595]
            }
          ]
        }
      };
    }
  };
</script>
