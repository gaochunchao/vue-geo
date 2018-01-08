
<template>
  <div>
    <span>柱状图</span>
    <bar-chart :legend="lrZe.legend" :xAxis="lrZe.xAxis" :colorList="lrZe.colorList" :series="lrZe.series" :avDataBar="lrZe.avdata" :avLineCrl="lrZe.avLineCrl" lUnit="亿元" :splitLineClr="'rgba(0,0,0,0)'" :yLabelBgc="'#fe6b40'" :yLabelW="60" :yLabelH="20" :changeDir="true" :yAxisLabel="lrZe.axisLabel"></bar-chart>
    <bar-chart :xAxis="jjzl.xAxis" :legend="jjzl.legend" :legShow="false" :colorList="jjzl.colorList" :series="jjzl.series" :isY="true" :barWidth="8" :tLabel="{show:false}" :axisLineClr="'#2a72c1'" :splitLineClr="'rgba(42,114,193,0.35)'" :axisLalClr="'#9dc4dd'" :isMix="true" :width="440" :height="260" :yName="'(万元)'" :lineName="'增长率'" :yUnit="['','%']"></bar-chart>
    <bar-chart class="gyBar fl" :legend="gycz.legend" :xAxis="gycz.xAxis" :colorList="gycz.colorList" :series="gycz.series" :barWidth="8" :tLabel="{show:false}" :width="438" :height="247" :axisLineClr="'#2a72c1'" :barGap="0" :splitLineClr="'rgba(42,114,193,0.35)'" :grid="{top:40,bottom:40,left:45,right:10}" :axisLalClr="'#9dc4dd'" :yName="'(万吨)'" :legShow="false" :avPosition="'start'"></bar-chart>
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
      },
      jjzl: {
        xAxis: [2013,2014,2015,2016,2017,2018],
        colorList: ["#84fff5", "#0fbadc"],
        legend: ["产值", "增长率"],
        series: [
          {
            type: "bar",
            data: [0,0,0,0,0,0]
          },
          {
            type: "line",
            data: [0,0,0,0,0,0]
          }
        ]
      },
      gycz: {
    legend: ['当月产值', '当月销售产值', '当月产值涨幅', '当月销售产值涨幅'],
    colorList: ['#0fbadc', '#E8CD4E','#0fbadc', '#E8CD4E'],
    xAxis: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
    series: [{
        type: 'bar',
        data: [170, 190, 195, 175, 205, 230, 200]
      },
      {
        type: 'bar',
        data: [270, 290, 295, 275, 305, 310, 308]
      }, {
        type: 'line',
        data: [1.0, 2.3, 3.5, 2.1, 1.7, 3.3, 2.0]
      }, {
        type: 'line',
        data: [1.5, 2.1, 3.0, 2.75, 1.9, 3.1, 2.03]
      }
    ]
  },
    };
  },
  mounted () {
    this.$nextTick(() => {           
      this.getTotalEconomicAmount();
    });
  },
  methods: {
    getTotalEconomicAmount(){
      this.$api.getPortEconomicOverview("getTotalEconomicAmount").then(resp => {
          if(resp.resCode === 1 && resp.data.length>0){
            const data=resp.data[0];
            //产值、增长率
            this.jjzl.xAxis=[];
            this.jjzl.series[0].data=[];
            this.jjzl.series[1].data=[];
            data.Month.forEach(item=>{
                this.jjzl.xAxis.push(item.TYPENAME);
                this.jjzl.series[0].data.push(item.MYCZ);
                this.jjzl.series[1].data.push(item.MYZZL);
            })
          }
        })
    },
  }
};
</script>
