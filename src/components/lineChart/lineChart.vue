<template>
  <div :class="classes" :style="styles" ref="lineChart"></div>
</template>
<script>
import eCharts from "echarts";
import { oneOf } from "../../utils/assist";

const prefixCls = "geo-lineChart";

export default {
  name: "lineChart",
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
    // 可设置为折线图或者柱状图
    type: {
      type: String,
      default: "normalLine",
      validator(value) {
        return oneOf(value, ["normalLine", "assumed1", "assumed2","assumed3"]);
      }
    },
    //图例
    legend: {
      type: Array,
      default() {
        return [];
      }
    },
    // 图例文字颜色
    legCrl: String,
    // 图例位置
    legPos: {
      type: String,
      default: "right",
      validator(value) {
        return oneOf(value, ["left", "center", "right"]);
      }
    },
    //是否堆叠
    stack: {
      type: Boolean,
      default: false
    },
    //是否显示图例
    legShow: {
      type: Boolean,
      default: true
    },
    //颜色集合
    colors: {
      type: Array,
      default() {
        return ["#25d4e7", "#fe6b40", "#6bb592"];
      }
    },
    //x轴
    xAxis: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否显示圖表分割線
    sShow: {
      type: Boolean,
      default: true
    },
    // 是否隐藏所有线条和刻度
    isHidden: {
      type: Boolean,
      default: false
    },
    // Y轴数据
    series: {
      type: Array,
      default() {
        return [];
      }
    },
    // X轴单位
    xName: String,
    // Y轴单位
    yName: String,
    // 如果type为bar,或者设置为true，则图表两边会留白
    forceGap: {
      type: Boolean,
      default: false
    },
    // 是否显示折点
    isSymbol: {
      type: Boolean,
      default: false
    },
    // 最小刻度值
    min: {
      type: Number,
      default: null
    },
    // 最大刻度值
    max: {
      type: Number,
      default: null
    },
    // X轴Y轴刻度线颜色及文字背景色
    axisLineClr: String,
    // X轴Y轴的文字颜色
    axisLalClr: String,
    // 背景分割线颜色
    splitLineClr: {
      type: String,
      default: "lightgrey"
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
    // // 图表高度
    // gridHeight: Number,
    // // 图表宽度
    // gridWidth: Number,
    // // 图表距离左侧的位置
    // gridLeft: {
    //   type: Number,
    //   default: 10
    // },
    // // 图表距离右侧的位置
    // gridRight: {
    //   type: Number,
    //   default: 15
    // },
    // // 图表距离底部的距离
    // gridBottom: {
    //   type: Number,
    //   default: 5
    // },
    // // 图表距离顶部的距离
    // gridTop: {
    //   type: Number,
    //   default: 40
    // },
    // 定义X轴刻度的格式（文字太多设置换行）
    axisLabFmt: {
      type: Boolean,
      default: false
    },
    // 定义X轴刻度每行显示的字数,默认为2个
    wordsNum: Number,
    //tooltip的文字格式化
    tooltipFmt: {
      type: Function,
      default(params) {
        for (let i = 0; i < params.length; i++) {
          if (params[i].value) {
            return params[i].seriesName + params[i].value[1];
          }
        }
        return "loading";
      }
    },
    //normalLine是否填充
    fillCor: {
      type: Boolean,
      default: false
    },
    //normalLine填充的颜色
    aColors: {
      type: Array,
      default() {
        return [
          ["#25d4e7", "#25d4e7"],
          ["#fe6b40", "#fe6b40"],
          ["#6bb592", "#6bb592"]
        ];
      }
    }
  },
  data() {
    return {
      boundaryGap: true,
      axisLabel: {
        interval: 0,
        textStyle: {
          color: this.axisLalClr ? this.axisLalClr : "#ffffff"
        }
      },
      axisLine: {
        lineStyle: {
          color: this.axisLineClr ? this.axisLineClr : "rgba(101,226,244,.5)"
        }
      },
      splitLine: {
        show: this.sShow,
        lineStyle: {
          color: this.splitLineClr ? this.splitLineClr : "rgba(255,255,255,0.6)"
        }
      }
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
    if (!this.legShow) {
      this.top = 10;
    }
    this.chart();
  },
  watch: {
    series(curVal, oldVal) {
      this.chart();
    }
  },
  methods: {
    chart() {
      let series = [];
      if (this.type == "normalLine") {
        this.series.forEach((item, index) => {
          const json = {
            name: this.legend[index],
            type: "line",
            data: item,
            symbol: "circle",
            symbolSize: 10,
            smooth: true,
            showSymbol: this.isSymbol,
            itemStyle: {
              normal: {
                color: this.colors[index]
              }
            }
          };
          if (this.type == "assumed2") {
            if (index % 2 !== 0) {
              json.lineStyle = {
                normal: {
                  type: "dashed"
                  // color: this.colors[index-1]
                }
              };
            } else {
              json.lineStyle = {
                normal: {
                  type: "solid"
                  // color: this.colors[index]
                }
              };
              json.tooltip = {
                show: false
              };
            }
          }
          if (this.fillCor) {
            let aColor = [
              {
                offset: 0,
                color: this.aColors[index][0]
              },
              {
                offset: 1,
                color: this.aColors[index][1]
              }
            ];
            json.areaStyle = {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: aColor,
                  globalCoord: false
                }
              }
            };
          }
          if (this.stack) {
            json.stack = "总量";
          }
          series.push(json);
        });
      } else if (
        this.type == "assumed1" ||
        this.type == "assumed2" ||
        this.type == "assumed3"
      ) {
        let yAxis = [],
          data = [],
          seriesItem;
        this.series.forEach((item, index) => {
          // debugger;
          data = [];
          let st = item[0].status;
          for (let i = 0; i < item.length; i++) {
            yAxis.push(item[i].value);
            if (st == item[i].status) {
              data.push([this.xAxis[i], item[i].value]);
            }
            if (st != item[i].status || i == item.length - 1) {
              let name1 = st == 1 ? "预测" : "实际";
              let color = "";
              let type = "";
              let aColor = [];
              if (this.type == "assumed1") {
                color = st == 1 ? this.colors[1] : this.colors[0];
                type = st == 1 ? "dashed" : "solid";
                aColor =
                  st == 1
                    ? [
                        {
                          offset: 0,
                          color: this.colors[4]
                        },
                        {
                          offset: 1,
                          color: this.colors[5]
                        }
                      ]
                    : [
                        {
                          offset: 0,
                          color: this.colors[2]
                        },
                        {
                          offset: 1,
                          color: this.colors[3]
                        }
                      ];
              } else if (this.type == "assumed2") {
                color = this.colors[index];
                type = st == 1 ? "dashed" : "solid";
              } else if (this.type == "assumed3") {
                color = st == 1 ? this.colors[1] : this.colors[0];
                type = "solid";
              }
              seriesItem = {
                name: name1,
                type: "line",
                smooth: true,
                symbolSize: 7,
                data: data,
                lineStyle: {
                  normal: {
                    color: color,
                    type: type
                  }
                },
                itemStyle: {
                  normal: {
                    color: color,
                    borderWidth: 2,
                    borderType: "solid"
                  }
                }
              };
              if (this.type == "assumed1") {
                seriesItem.areaStyle = {
                  normal: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: aColor,
                      globalCoord: false
                    }
                  }
                };
              }
              series.push(seriesItem);
              data = [[this.xAxis[i - 1], item[i - 1].value]];

              data.push([this.xAxis[i], item[i].value]);
              st = item[i].status;
            }
          }
        });
      }
      if (this.forceGap == true) {
        this.boundaryGap = true;
      } else {
        this.boundaryGap = false;
      }
      const option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          show: this.legShow,
          textStyle: {
            color: this.legCrl ? this.legCrl : "#ffffff"
          },
          itemWidth: 12,
          itemHeight: 12,
          right: 15,
          data: this.legend
        },
        grid: this.grid,
        xAxis: [
          {
            type: "category",
            name: this.xName,
            boundaryGap: this.boundaryGap,
            data: this.xAxis,
            axisTick: {
              show: false
            },
            splitLine: this.splitLine,
            axisLabel: this.axisLabel,
            axisLine: this.axisLine
          }
        ],
        yAxis: [
          {
            type: "value",
            name: this.yName,
            min: this.min,
            max: this.max,
            nameTextStyle: {
              color: "#ffffff"
            },
            axisTick: {
              show: false
            },
            splitLine: this.splitLine,
            splitNumber: 4,
            axisLabel: this.axisLabel,
            axisLine: this.axisLine
          }
        ],
        series: series
      };
      if (this.type == "assumed1" || this.type == "assumed2") {
        option.tooltip.axisPointer = {
          type: "cross"
        };
        option.tooltip.formatter = this.tooltipFmt;
      }
      // 设置X轴名字
      if (this.xName) {
        option.xAxis[0].name = this.xName;
        option.xAxis[0].nameTextStyle = {
          color: this.axisLalClr ? this.axisLalClr : "#fff"
        };
        option.xAxis[0].nameLocation = "start";
        option.xAxis[0].nameGap = "20";
      }
      // 是否隐藏X和Y轴的刻度和线条
      if (this.isHidden) {
        option.xAxis[0] = {
          type: "category",
          axisLabel: this.axisLabel,
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
            color: "#ffffff"
          },
          splitLine: { show: false }
        };
        option.tooltip = {
          show: false
        };
      }
      // X轴的显示字数是否要换行 
      if (this.axisLabFmt) {
        option.xAxis[0].axisLabel.formatter =(params)=>{
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
      const chart = eCharts.init(this.$refs.lineChart);
      chart.setOption(option);
    }
  }
};
</script>
