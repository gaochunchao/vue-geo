
<template>
  <div>
    <span>柱状图</span>
    <bar-chart :legend="lrZe.legend" :xAxis="lrZe.xAxis" :colorList="lrZe.colorList" :series="lrZe.series" :avDataBar="lrZe.avdata" :avLineCrl="lrZe.avLineCrl" lUnit="亿元" :splitLineClr="'rgba(0,0,0,0)'" :yLabelBgc="'#fe6b40'" :yLabelW="60" :yLabelH="20""></bar-chart>
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
        grid: {
          top: 30,
          bottom: 25,
          left: 10,
          right: 15,
          containLabel: true
        },
        legend: ["增幅", "全市累积", "上年同期"],
        xAxis: [1, 2, 3, 4, 5, 6, 7, 8],
        avdata: [100],
        avLineCrl: ["#459DF7"],
        colorList: ["#25D4E7", "#FE6B40"],
        axisLabel: {
          interval: 0,
          textStyle: {
            color: this.axisLalClr
          },
          formatter: function(params, index) {
            let rank = index > 2 ? "blue" : "yellow";
            return "{" + rank + "|" + params + "}";
          },
          align: "center",
          margin: 15,
          lineHeight: this.yLabelH,
          rich: {
            blue: {
              backgroundColor: "blue",
              width: 15,
              height: 15,
              borderRadius: 5
            },
            yellow: {
              backgroundColor: "yellow",
              width: 15,
              height: 15,
              borderRadius: 5
            }
          }
        },
        series: [
          {
            type: "bar",
            data: [287, 229, 333, 481, 367, 233, 148, 295]
          }
        ]
      }
    };
  }
};
</script>
