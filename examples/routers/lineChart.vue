<template>
  <div>
    <span>折线图</span>
    <line-Chart type="normalLine" :isAssumed="true" :legend="jjzlLine.legend" :xAxis="jjzlLine.xAxis" :series="jjzlLine.series" :colors="jjzlLine.colors" :forceGap="false" :isSymbol="true" :axisLineClr="'#000'" :axisLalClr="'#000'" :legCrl="'#000'" :splitLineClr="'#000'" :sShow="false" :tooltipFmt="jjzlLine.tooltipFmt" :stack="true" :splitBgc="['rgba(82,124,168,0.2)','rgba(19,43,116,0.2)']"></line-Chart>
  </div>
</template>
<script>
export default {
  data() {
    return {
      jjzlLine: {
        colors: [
          "#64e4f1",
          "#fe6b40",
          "#469df7",
          "#a581d2",
          "#ecbd6c",
          "#e5474b"
        ],
        legend: ["黄石", "孝感"],
        xAxis: ["2012", "2013", "2014", "2015", "2016", "2017", "2018"],
        series: [
          // [100,120,105,96,86,97,102],
          // [100,120,105,96,86,97,102],
          // [70,110,85,116,76,127,122],
          // [70,110,85,116,76,127,122],

          [
            {
              value: 100,
              status: 0
            },
            {
              value: 95,
              status: 0
            },
            {
              value: 120,
              status: 0
            },
            {
              value: 80,
              status: 0
            },
            {
              value: 96,
              status: 0
            },
            {
              value: 58,
              status: 1
            },
            {
              value: 89,
              status: 1
            }
          ],
          [
            {
              value: 95,
              status: 0
            },
            {
              value: 105,
              status: 0
            },
            {
              value: 125,
              status: 0
            },
            {
              value: 70,
              status: 0
            },
            {
              value: 106,
              status: 0
            },
            {
              value: 68,
              status: 1
            },
            {
              value: 99,
              status: 1
            }
          ]
        ],
        tooltipFmt: function(params) {
          for (let i = 0; i < params.length; i++) {
            if (params[i].value) {
              return params[i].seriesName + "人数" + params[i].value[1];
            }
          }
          return "loading";
        }
      }
    };
  }
}
</script>
