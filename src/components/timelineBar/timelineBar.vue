<template>
  <div :class="classes" :style="styles" ref="timelineChart"></div>
</template>
<script>
import eCharts from "echarts";
import { oneOf } from "../../utils/assist";

const prefixCls = "geo-timelineBar";

export default {
  name: "timelineBar",
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
    // 选择柱状或者折线
    type: {
      type: String,
      default: "line",
      validator(value) {
        return oneOf(value, ["line", "bar"]);
      }
    },
    //颜色集合
    colors: {
      type: Array,
      default() {
        return ["#25d4e7", "#fe6b40"];
      }
    },
    // 时间轴颜色
    tColors: {
      type: Array,
      default() {
        return ["#25d4e7", "#fe6b40"];
      }
    },
    //x轴
    xAxis: {
      type: Array,
      default() {
        return ["9月", "10月", "11月", "12月", "1月", "2月", "3月", "4月"];
      }
    },
    // 时间轴的数据
    timeData: Array,
    series: {
      type: Array,
      default() {
        return [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0]
        ];
      }
    },
    // 设置要变色的关键字
    keyWord: {
      type: String,
      default: "孝感"
    },
    // 设置时间轴的文字是否显示及位置
    timelineLabel: {
      type: Object,
      default: function() {
        return {
          show: "true",
          position: 10
        };
      }
    },
    // 设置时间轴的位置以及是否显示
    tLine: {
      type: Object,
      default: function() {
        return {
          show: true,
          top: "80%",
          left: "10%",
          right: "5%"
        };
      }
    },
    // 设置label的单位
    lUnit: {
      type: String,
      default: ""
    },
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
    // 柱子的宽度
    barWidth: {
      type: Number,
      default: 20
    },
    // 切换的速度
    timer: {
      type: Number,
      default: 3000
    },
    // 整个图标的宽高，以及距上下左右的边距
    grid: {
      type: Object,
      default: function() {
        return {
          height: Number,
          width: Number,
          top: 20,
          bottom: 60,
          left: 10,
          right: 15,
          containLabel: true
        };
      }
    },
    // 设置整个x轴的样式
    xAxisDec: {
      type: Object,
      default: function() {
        return {
          type: "category",
          axisLine: {
            show: true
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            show: true
          },
          textStyle: {
            color: "#9D9EA0",
            fontSize: 12
          },
          splitLine: {
            show: true
          },
          data: this.xAxis
        };
      }
    },
    // 设置整个Y轴的样式
    yAxisDec: {
      type: Object,
      default: function() {
        return {
          type: "value",
          axisLine: {
            show: true
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            show: true
          },
          textStyle: {
            color: "#9D9EA0",
            fontSize: 12
          },
          splitLine: {
            show: false
          },
          data: []
        };
      }
    }
  },
  data() {
    return {};
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
    this.chart();
  },
  updated() {
    this.$nextTick(() => {
      this.chart();
    });
  },
  watch: {
    series(curVal, oldVal) {
      this.chart();
    }
  },
  methods: {
    chart() {
      const options = [];
      const cityIndex = this.xAxis.indexOf(this.keyWord);
      this.series.forEach((item, index) => {
        if (this.type == "bar") {
          item[cityIndex] = {
            value: item[cityIndex],
            itemStyle: {
              normal: {
                color: this.colors[1]
              }
            }
          };
        }
        const json = {
          type: this.type,
          barGap: 20,
          barWidth: this.barWidth,
          label: {
            normal: this.tLabel
          },
          itemStyle: {
            normal: {
              color: this.colors[0]
            }
          },
          data: item
        };
        options.push({
          series: json
        });
      });

      const option = {
        baseOption: {
          timeline: {
            show: this.tLine.show,
            top: this.tLine.top,
            left: this.tLine.left,
            right: this.tLine.right,
            axisType: "category",
            tooltip: {
              show: false
            },
            autoPlay: true,
            playInterval: this.timer,
            data: this.timeData,
            symbol: "circle",
            symbolSize: 13,
            lineStyle: {
              color: this.tColors[0]
            },
            itemStyle: {
              normal: {
                color: this.tColors[0]
              },
              emphasis: {
                color: this.tColors[0]
              }
            },
            checkpointStyle: {
              symbolSize: 13,
              borderWidth: 1,
              borderColor: this.tColors[1],
              color: this.tColors[1]
            },
            label: this.timelineLabel,
            controlStyle: {
              show: false
            }
          },
          grid: this.grid,
          xAxis: this.xAxisDec,
          yAxis: this.yAxisDec,
          series: []
        },
        options: options
      };
      const chart = eCharts.init(this.$refs.timelineChart);
      chart.setOption(option);
    }
  }
};
</script>
<style lang="css" scoped>

</style>