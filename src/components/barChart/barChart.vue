<template>
  <div :class="classes" :style="styles" ref="barChart"></div>
</template>
<script>
  import eCharts from "echarts";
  import {oneOf} from "../../utils/assist";

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
      legCrl: String,
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
          return [];
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
      zoomFillCrl: String,
      // 滚动条背景色
      zoomBgcCrl: String,
      // 滚动条边框色
      zoomBorCrl: String,
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
      // 图表高度
      gridHeight: Number,
      // 图表宽度
      gridWidth: Number,
      // 图表距离左侧的位置
      gridLeft: {
        type: Number,
        default: 10
      },
      // 图表距离右侧的位置
      gridRight: {
        type: Number,
        default: 15
      },
      // 图表距离底部的距离
      gridBottom: {
        type: Number,
        default: 5
      },
      // 图表距离顶部的距离
      gridTop: {
        type: Number,
        default: 30
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
      // 平均线颜色
      avLineCrl: {
        type: Array,
        default() {
          return ["#fe6b40", "#edea10"];
        }
      },
      // 如果柱状图需要显示所占百分比
      percent: {
        type: Boolean,
        default: false
      },
      // X轴Y轴刻度线颜色及文字背景色
      axisLineClr: String,
      // X轴Y轴的文字颜色
      axisLalClr: String,
      // 背景分割线颜色
      splitLineClr: String
    },
    data() {
      return {
        maxBar: [],
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
        splitLine: {lineStyle: {color: this.splitLineClr ? this.splitLineClr : "rgba(255,255,255,0.6)"}},
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
              normal: {
                show: this.percent ? true : false,
                position: "top",
                formatter: params => {
                  return this.percent
                    ? parseInt(params.value / sum * 100) + "%"
                    : "{c}";
                }
              }
            },
            barWidth: this.barWidth,
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: params => {
                  if (this.colorList[index] instanceof Array) {
                    return this.colorList[index][params.dataIndex];
                  } else {
                    return this.colorList[index];
                  }
                }
              }
            }
          };
          if (item.type === "line") {
            json.yAxisIndex = 1;
            isMulti = true;
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
            jsonBgc.label = {normal: {show: false}};
            jsonBgc.barWidth = this.barWidth;
            jsonBgc.silent = true;
            //颜色需要有透明度
            jsonBgc.itemStyle = {normal: {color: "rgba(102, 102, 102,.2)"}};
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
              this.avDataBar.forEach(item => {
                avData.push({yAxis: item});
              });
              color = this.avLineCrl[0];
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
                  position: "middle"
                }
              }
            };
          }
          series.push(json);
        });

        const option = {
          legend: {
            data: this.legend,
            textStyle: {
              color: this.legCrl ? this.legCrl : "#ffffff"
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
          grid: {
            top: this.gridTop,
            left: this.gridLeft,
            right: this.gridRight,
            bottom: this.gridBottom,
            height: this.gridHeight,
            width: this.gridWidth,
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              axisLabel: this.axisLabel,
              axisLine: this.axisLine,
              data: this.xAxis,
              splitLine: this.splitLine,
            }
          ],
          yAxis: [
            {
              type: "value",
              axisLabel: this.axisLabel,
              axisLine: this.axisLine,
              name: this.yName,
              nameTextStyle: {
                color: "#ffffff"
              },
              splitLine: this.splitLine,
              splitNumber: 3
            }
          ],
          series: series
        };
        // X轴的显示字数是否要换行
        if (this.axisLabFmt) {
          option.xAxis[0].axisLabel.formatter = (params) => {
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
            axisLabel: this.axisLabel,
            axisLine: {show: false},
            axisTick: {show: false},
            data: this.xAxis
          };
          option.yAxis[0] = {
            type: "value",
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            name: this.yName,
            nameTextStyle: {
              color: "#ffffff"
            },
            splitLine: {show: false}
          };
          option.tooltip = {
            show: false
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
            //            min: 0,
            axisLine: this.axisLine,
            splitLine: this.splitLine,
            axisLabel: this.axisLabel,
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
            color: this.axisLalClr ? this.axisLalClr : "#fff"
          };
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
        // 设置柱状背景色
        if (this.isBgc) {
          option.xAxis.push({
            type: "category",
            data: this.xAxis,
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {show: false},
            splitArea: {show: false},
            splitLine: {show: false}
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
              end: this.zoomEnd ? this.zoomEnd : 50,
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
