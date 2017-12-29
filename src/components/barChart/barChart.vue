<template>
  <div :class="classes" :style="styles" ref="barChart"></div>
</template>
<script>
import eCharts from "echarts";
import { oneOf } from "../../utils/assist";

const prefixCls = "geo-barChart";

export default {
  name: "barChart",
  props: {
    // 外盒宽度
    width: {
      type: [Number, String],
      default: 500
    },
    // 外盒高度
    height: {
      type: [Number, String],
      default: 300
    },
    // 图例
    legend: {
      type: Array,
      default() {
        return [];
      }
    },
    // 图例文字颜色
    legCrl: {
      type: String,
      default: "#000"
    },
    // 图例位置
    legPos: {
      type: String,
      default: "right",
      validator(value) {
        return oneOf(value, ["left", "center", "right"]);
      }
    },
    // 柱宽
    barWidth: {
      type: Number,
      default: 22
    },
    xAxis: {
      type: Array,
      default() {
        return [];
      }
    },
    //是否堆叠
    stack: {
      type: Boolean,
      default: false
    },
    // Y轴单位
    yName: String,
    // 折线Y轴的单位
    lineName: String,
    // X轴单位
    xName: String,
    // 是否增加右侧Y轴
    isY: {
      type: Boolean,
      default: false
    },
    // 是否隐藏所有线条和刻度
    isHidden: {
      type: Boolean,
      default: false
    },
    colorList: {
      type: Array,
      default() {
        return ["#25d4e7", "#fe6b40", "#6bb592"];
      }
    },
    series: {
      type: Array,
      default() {
        return [];
      }
    },
    // 图表数据太多需要使用的滚动条和缩放效果,设置这个之后需要设置gridBottom，让滚动条显示在数据下方
    isDataZoom: {
      type: Boolean,
      default: false
    },
    // 滚动条填充颜色
    zoomFillCrl: {
      type: String,
      default: "grey"
    },
    // 滚动条背景色
    zoomBgcCrl: {
      type: String,
      default: "#fff"
    },
    // 滚动条边框色
    zoomBorCrl: {
      type: String,
      default: "grey"
    },
    // 数据窗口范围的起始百分比
    zoomStart: {
      type: Number,
      default: 0
    },
    // 数据窗口范围的结束百分比
    zoomEnd: {
      type: Number,
      default: 50
    },
    // 整个图标的宽高，以及距上下左右的边距
    grid: {
      type: Object,
      default: function() {
        return {
          height: Number,
          width: Number,
          top: 30,
          bottom: 5,
          left: 10,
          right: 15,
          containLabel: true
        };
      }
    },
    // 定义X轴刻度的格式（文字太多设置换行）
    axisLabFmt: {
      type: Boolean,
      default: false
    },
    // 定义X轴刻度每行显示的字数,默认为2个
    wordsNum: Number,
    // 是否要给bar添加事件，以及事件类型
    barEvent: {
      type: Object,
      default() {
        return {
          eventType: "",
          callBack: null
        };
      }
    },
    // 是否需要柱状的背景色
    isBgc: {
      type: Boolean,
      default: false
    },
    // 与柱状图相对应的平均线
    avDataBar: {
      type: Array,
      default() {
        return [];
      }
    },
    // 与折线图相对应的平均线
    avDataLine: {
      type: Array,
      default() {
        return [];
      }
    },
    // 折线平均线颜色
    avLineCrl: {
      type: Array,
      default() {
        return ["#fe6b40", "#edea10"];
      }
    },
    // 柱子平均线颜色
    avBarCrl: {
      type: Array,
      default() {
        return ["#edea10", "#fe6b40"];
      }
    },
    // 如果柱状图需要显示所占百分比
    percent: {
      type: Boolean,
      default: false
    },
    // X轴Y轴刻度线颜色及文字背景色
    axisLineClr: {
      type: String,
      default: "#000"
    },
    // X轴Y轴的文字颜色
    axisLalClr: {
      type: String,
      default: "#000"
    },
    // 背景分割线颜色
    splitLineClr: {
      type: String,
      default: "#ddd"
    },
    // 更改图表展示类型
    changeDir: {
      type: Boolean,
      default: false
    },
    // 数据单位
    lUnit: String,
    // 设置图表label的是否显示，位置，颜色，内容
    tLabel: {
      type: Object,
      default: function() {
        return {
          show: true,
          position: "top",
          formatter: "{c}" + this.lUnit,
          textStyle: {
            color: "#000"
          }
        };
      }
    },
    //是否显示图例
    legShow: {
      type: Boolean,
      default: true
    },
    // 是否需要隔行变色
    isMix: {
      type: Boolean,
      default: false
    },
    // 柱状之间的距离
    barGap: {
      type: String | Number,
      default: "30%"
    },
    // 如果是折柱混合，且柱子的颜色是隔行变色，则需单独设置line的颜色
    lineColors: {
      type: Array,
      default() {
        return ["#F6D37E"];
      }
    },
    // 平均线数字的位置
    avPosition: {
      type: String,
      default: "middle",
      validator(value) {
        return oneOf(value, ["start", "middle", "end"]);
      }
    },
    // 自定义Y轴刻度文字的样式
    yAxisLabel:{
      type:Object,
      default:function(){

      }
    },
    // Y轴背景色
    splitBgc:{
      type:Array,
      default: function () {
        return ["rgba(0,0,0,0)"];
      }
    }
  },
  data() {
    return {
      maxBar: [],
      splitLine: {
        lineStyle: {
          color: this.splitLineClr
        }
      },
      chart: null
    };
  },
  computed: {
    classes() {
      return `${prefixCls}`;
    },
    styles() {
      let style = {};
      if (this.height) {
        style.height = `${this.height}px`;
      }
      if (this.width) {
        style.width = `${this.width}px`;
      }
      return style;
    }
  },
  mounted() {
    setTimeout(() => {
      this.drawChart();
    }, 100);
  },
  watch: {
    series(curVal, oldVal) {
      this.drawChart();
    },
    colorList(curVal, oldVal) {
      this.drawChart();
    }
  },
  methods: {
    countMax(max) {
      const num = Math.ceil(max);
      let base = "1";
      const len = Math.abs(num).toString().length - 1;
      for (let i = 0; i < len; i++) {
        base += "0";
      }
      let maxNum = Math.ceil(parseFloat(num / parseInt(base))) * parseInt(base);
      if ((maxNum / parseInt(base)) % 3 != 0) {
        return Math.ceil(maxNum / parseInt(base) / 3) * 3 * parseInt(base);
      }
      return maxNum;
    },

    drawChart() {
      let series = [];
      let isMulti = false;
      let o = 0;
      this.series.forEach((item, index) => {
        let sum = 0;
        item.data.forEach(i => {
          sum = sum + parseInt(i);
        });
        const json = {
          name: this.legend[index],
          type: item.type,
          data: item.data,
          label: {
            normal: this.tLabel
          },
          barWidth: this.barWidth,
          symbol: "circle",
          barGap: this.barGap,
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: params => {
                if (this.isMix) {
                  if (params.dataIndex % 2 === 0) {
                    return this.colorList[0];
                  } else {
                    return this.colorList[1];
                  }
                } else {
                  return this.colorList[index];
                }
              }
            }
          }
        };
        if (item.type === "line") {
          json.yAxisIndex = 1;
          json.lineStyle = {
            normal: {
              color: this.isMix ? this.lineColors[o] : this.colorList[index]
            }
          };
          json.itemStyle = {
            normal: {
              color: this.isMix ? this.lineColors[o++] : this.colorList[index]
            }
          };
          isMulti = true;
        }
        if (this.percent) {
          json.label = {
            normal: {
              show: true,
              position: "top",
              formatter: params => {
                return this.percent
                  ? parseInt(params.value / sum * 100) + "%"
                  : "{c}";
              }
            }
          };
        }
        if (this.stack) {
          json.stack = "总量";
        }
        if (this.isBgc) {
          var jsonBgc = {};
          for (var attr in json) {
            jsonBgc[attr] = json[attr];
          }
          jsonBgc.barGap = "-100%";
          jsonBgc.label = { normal: { show: false } };
          jsonBgc.barWidth = this.barWidth;
          jsonBgc.silent = true;
          jsonBgc.tooltip = { show: false };
          //颜色需要有透明度
          jsonBgc.itemStyle = { normal: { color: "rgba(102, 102, 102,.2)" } };
          //计算柱状图背景高度
          let barMax = 0;
          json.data.forEach(item => {
            if (item >= barMax) {
              barMax = item;
            }
          });
          const num = this.countMax(barMax);
          this.maxBar = [];
          json.data.forEach(item => {
            this.maxBar.push(num);
          });
          //data填你需要的背景的值
          jsonBgc.data = this.maxBar;
          series.push(jsonBgc);
        }
        if (this.avDataBar || this.avDataLine) {
          let avData = [];
          let color = "";
          if (item.type === "bar") {
            this.avDataBar.forEach((item, index) => {
              avData.push({
                yAxis: item,
                lineStyle: {
                  normal: {
                    color: this.avBarCrl[index]
                  }
                }
              });
            });
            color = this.avBarCrl[index];
          } else {
            this.avDataLine.forEach((item, index) => {
              avData.push({
                yAxis: item,
                lineStyle: {
                  normal: {
                    color: this.avLineCrl[index]
                  }
                }
              });
            });
          }
          json.markLine = {
            data: avData,
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: color,
                type: "solid",
                width: 2,
                position: "right"
              }
            },
            label: {
              normal: {
                position: this.avPosition
              }
            }
          };
        }
        series.push(json);
      });

      const option = {
        legend: {
          show: this.legShow,
          data: this.legend,
          textStyle: {
            color: this.legCrl
          },
          itemWidth: 12,
          itemHeight: 12
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        animationEasing: "sinusoidalInOut",
        animationDuration: 1500,
        grid: this.grid,
        xAxis: [
          {
            type: this.changeDir ? "value" : "category",
            axisLabel: {
              interval: 0,
              textStyle: {
                color: this.axisLalClr
              },
              show: this.changeDir ? false : true,
            },
            axisLine: {
              lineStyle: {
                color: this.axisLineClr
              },
              show: this.changeDir ? false : true
            },
            axisTick: {
              show: false
            },
            data: this.changeDir ? "" : this.xAxis,
            splitLine: this.splitLine
          }
        ],
        yAxis: [
          {
            type: this.changeDir ? "category" : "value",
            data: this.changeDir ? this.xAxis : "",
            axisLabel: this.yAxisLabel ? this.yAxisLabel : {
              interval: 0,
              textStyle: {
                color: this.axisLalClr
              },
              show:true,
            },
            axisLine: {
              lineStyle: {
                color: this.axisLineClr
              }
            },
            axisTick: {
              show: false
            },
            name: this.yName,
            nameTextStyle: {
              color: "#ffffff"
            },
            splitLine: this.splitLine,
            splitArea:{
              show: true,
              areaStyle:{
                color: this.splitBgc
              }
            },
            splitNumber: 3,
          }
        ],
        series: series
      };
      // X轴的显示字数是否要换行
      if (this.axisLabFmt) {
        option.xAxis[0].axisLabel.formatter = params => {
          let newParamsName = "";
          let paramsNameNumber = params.length;
          let provideNumber = this.wordsNum ? this.wordsNum : 2;
          let rowNumber = Math.ceil(paramsNameNumber / provideNumber);
          if (paramsNameNumber > provideNumber) {
            for (let p = 0; p < rowNumber; p++) {
              let tempStr = "";
              let start = p * provideNumber;
              let end = start + provideNumber;
              if (p == rowNumber - 1) {
                tempStr = params.substring(start, paramsNameNumber);
              } else {
                tempStr = params.substring(start, end) + "\n";
              }
              newParamsName += tempStr;
            }
          } else {
            newParamsName = params;
          }
          return newParamsName;
        };
      }
      // 是否隐藏X和Y轴的刻度和线条
      if (this.isHidden) {
        option.xAxis[0] = {
          type: "category",
          axisLabel: {
            interval: 0,
            textStyle: {
              color: this.axisLalClr
            }
          },
          axisLine: { show: false },
          axisTick: { show: false },
          data: this.xAxis
        };
        option.yAxis[0] = {
          type: "value",
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          name: this.yName,
          nameTextStyle: {
            color: this.axisLalClr
          },
          splitLine: { show: false }
        };
      }
      // 是否需要右侧Y轴刻度
      if (isMulti && !this.isY) {
        option.yAxis.push({
          type: "value",
          splitNumber: 3,
          show: false,
          //              min: 0,
          //              max: 100,
          axisLabel: {
            inside: true
          }
        });
      } else if (this.isY) {
        option.yAxis.push({
          type: "value",
          splitNumber: 3,
          name: this.lineName,
          nameTextStyle: {
            color: this.axisLalClr
          },
          axisLine: {
            lineStyle: {
              color: this.axisLineClr
            }
          },
          splitLine: this.splitLine,
          axisLabel: {
            interval: 0,
            textStyle: {
              color: this.axisLalClr
            }
          },
          formatter: "{value}%"
        });
      }
      // 图例位置
      switch (this.legPos) {
        case "left":
          option.legend.left = 15;
          break;
        case "center":
          break;
        case "right":
          option.legend.right = 15;
          break;
      }
      // 设置Y轴名字
      if (this.yName) {
        option.yAxis[0].name = this.yName;
        option.yAxis[0].nameTextStyle = {
          color: this.axisLalClr
        };
      }
      // 设置X轴名字
      if (this.xName) {
        option.xAxis[0].name = this.xName;
        option.xAxis[0].nameTextStyle = {
          color: this.axisLalClr
        };
        option.xAxis[0].nameLocation = "start";
        option.xAxis[0].nameGap = "20";
      }
      // 设置柱状背景色
      if (this.isBgc) {
        option.xAxis.push({
          type: "category",
          data: this.xAxis,
          tooltip: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          splitArea: { show: false },
          splitLine: { show: false }
        });
      }
      // 设置滚动条
      if (this.isDataZoom) {
        option.dataZoom = [
          {
            id: "dataZoomX",
            type: "slider",
            xAxisIndex: [0],
            filterMode: "weakFilter", // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
            start: this.zoomStart ? this.zoomStart : 0,
            bottom: 10,
            end: this.zoomEnd ? this.zoomEnd : 50,
            height: 10,
            handleSize: 0,
            zoomLock: true,
            fillerColor: this.zoomFillCrl ? this.zoomFillCrl : "#114c91",
            backgroundColor: this.zoomBgcCrl ? this.zoomBgcCrl : "#434651",
            borderColor: this.zoomBorCrl ? this.zoomBorCrl : "rgba(0,0,0,0)",
            showDetail: false,
            showDataShadow: false
          },
          {
            type: "inside",
            xAxisIndex: [0],
            filterMode: "weakFilter",
            start: this.zoomStart ? this.zoomStart : 0,
            end: this.zoomEnd ? this.zoomEnd : 50
          }
        ];
      }
      this.chart = eCharts.init(this.$refs.barChart);
      this.chart.on(this.barEvent.eventType, this.barEvent.callBack);
      this.chart.setOption(option);
    }
  }
};
</script>
<style>
/* .geo-barChart {
  width: 500px;
  height: 300px;
} */
</style>
