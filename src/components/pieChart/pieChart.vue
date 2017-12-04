<template>
  <section :class="classes" :style="styles">
    <div :class="pieClasses" ref="pieChart" :style="{width:chartBox}"></div>
    <ul :class="[prefixCls + '-legend']" ref="text" :style="{width:itemBox}">
      <li v-for="(item,index) in itemData" :class="[prefixCls + '-legend-li']" :style="liStyle">
        <div :class="[prefixCls + '-legend-icon']" :style="{backgroundColor:colors[index],marginTop:marginTop}"></div>
        <div :class="[prefixCls + '-legend-name']">
          <div v-html="item.name"></div>
        </div>
        <div :class="[prefixCls + '-legend-num']">
          <span :class="[prefixCls + '-legend-num-value']">{{item.value}}</span>
          <span style="font-size:14px;">{{unit}}</span>
        </div>
      </li>
    </ul>
  </section>
</template>
<script>
  import eCharts from "echarts";
  import {oneOf} from "../../utils/assist";

  const prefixCls = "geo-pie";

  export default {
    name: "pieChart",
    props: {
      // 外盒宽度
      width: {
        type: [Number, String],
        default: 398
      },
      // 外盒高度
      height: {
        type: [Number, String],
        default: 160
      },
      // 图例文字颜色
      tColor: {
        type: String,
        default: "#000"
      },
      // 饼形图横向或者纵向
      type: {
        type: String,
        default: "v"
      },
      // 是否默认被选中状态
      selected: {
        type: Boolean,
        default: true
      },
      // 饼形图的宽度
      chartWidth: {
        type: String,
        default: "45"
      },
      colors: {
        type: Array,
        default: ["#22afc3", "#ff6633"]
      },
      // 内外环的直径
      radius: {
        type: Array,
        default: [38, 50]
      },
      // 单位
      unit: String,
      itemData: {
        type: Array,
        default: [
          {value: 171668, name: "地方企业"},
          {value: 2196236, name: "中省企业"}
        ]
      },
      // 饼图中间文字
      text: {
        type: String,
        default: ""
      },
      // 中间文字颜色
      titleCor: {
        type: String,
        default: "#000"
      },
      // 是否显示中间数字
      qty: {
        type: Boolean,
        default: true
      },
      // 自定义中间数字显示内容
      secText: {
        type: String,
        default: " "
      },
      // 中间文字大小
      textFont: {
        type: Number,
        default: 16
      },
      // 饼形图展现形式
      style: {
        type: String,
        default: "normalPie"
      }
    },
    data() {
      return {
        prefixCls: prefixCls,
        liStyle: {
          height: "",
          lineHeight: ""
        },
        marginTop: ""
      };
    },
    computed: {
      chartBox() {
        return this.type === "v" ? `${this.chartWidth}%` : "100%";
      },
      itemBox() {
        return this.type === "v" ? `${100 - parseInt(this.chartWidth)}%` : "100%";
      },
      classes() {
        return [
          {
            [`${prefixCls}-v`]: this.type === "v",
            [`${prefixCls}-h`]: this.type === "h"
          }
        ];
      },
      pieClasses() {
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
        if (this.tColor) {
          style.color = `${this.tColor}`;
        }
        return style;
      }
    },
    mounted() {
      this.chart();
      this.$nextTick(() => {
        setTimeout(() => {
          const height = this.$refs.text.clientHeight - 20;
          const liHeight = height / this.itemData.length;
          this.liStyle.height = `${liHeight}px`;
          this.liStyle.lineHeight = `${liHeight}px`;
          this.marginTop = `${(liHeight - 14) / 2}px`;
        }, 10);
      });
    },
    watch: {
      itemData(curVal, oldVal) {
        this.chart();
      }
    },
    methods: {
      chart() {
        let sum = 0;
        if (this.style === "normalPie") {
          eCharts.util.each(this.itemData, (item, index) => {
            item.itemStyle = {
              normal: {
                color: this.colors[index]
              }
            };
            if (index == 0 && this.selected) {
              item.selected = true;
            }
            isNaN(item.value) ? (sum = "-") : (sum += parseInt(item.value));
          });
        }
        const option = {
          title: [
            {
              text: this.text.replace("\\n", "\n"), //通过传入\n可使标题换行
              left: "center",
              top: this.text && this.qty ? "40%" : "47%",
              textBaseline: "middle",
              textStyle: {
                color: this.titleCor,
                fontWeight: "normal",
                fontSize: this.textFont
              }
            },
            {
              text: this.secText ? this.secText : sum,
              show: this.text && this.qty ? true : false,
              left: "center",
              top: "55%",
              textBaseline: "middle",
              textStyle: {
                color: "#73e2ed",
                fontWeight: "normal",
                fontSize: 16,
                fontFamily: "AgencyFBBold"
              }
            }
          ],
          tooltip: {
            formatter: this.unit
              ? "{b0} <br/> {c0}" + this.unit + "（{d0}%）"
              : "{b0} <br/> {c0}"
          },
          series: [
            {
              hoverAnimation: false, //设置饼图默认的展开样式
              radius: this.radius,
              type: "pie",
              selectedMode: "single",
              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this.itemData
            }
          ]
        };
        if (this.style == "overlayPie") {
          let series = [];
          eCharts.util.each(this.itemData, (item, index) => {
            series.push({
              type: "pie",
              clockWise: false,
              startAngle: this.startAngle[index],
              radius: this.radius[index],
              itemStyle: {
                normal: {
                  color: this.colors[index],
                  label: {show: false},
                  labelLine: {show: false},
                  shadowBlur: 40,
                  shadowColor: "rgba(40, 40, 40, 0.5)"
                }
              },
              hoverAnimation: false,
              data: [
                {
                  value: item.value,
                  name: "visible"
                },
                {
                  value: this.itemData[0].value - item.value,
                  name: "invisible",
                  itemStyle: {
                    normal: {
                      color: "rgba(0,0,0,0)",
                      label: {show: false},
                      labelLine: {show: false}
                    },
                    emphasis: {
                      color: "rgba(0,0,0,0)"
                    }
                  }
                }
              ]
            });
          });
        }
        const chart = eCharts.init(this.$refs.pieChart);
        chart.setOption(option);
      }
    }
  };
</script>
<style type="text/less" lang="less">
  .geo-pie-v {
    .geo-pie {
      float: left;
      height: 100%;
      /*width: 45%;*/
    }
    .geo-pie-legend {
      float: left;
      height: 100%;
      /*width: 55%;*/
      padding: 10px 0;
      &-li {
        float: left;
        width: 100%;
      }
      &-name {
        float: left;
        overflow: hidden;
        height: 100%;
        font-size: 14px;
      }
      &-num {
        float: right;
        font-size: 16px;
        margin-right: 15px;
      }
      &-icon {
        float: left;
        font-size: 16px;
        width: 14px;
        height: 14px;
        background-color: #fff;
        text-align: left;
        margin-right: 5px;
      }
    }
  }

  .geo-pie-h {
    .geo-pie {
      float: left;
      height: 100%;
      width: 100%;
    }
    .geo-pie-legend {
      float: left;
      height: 100%;
      width: 100%;
      padding: 10px 0;
      &-li {
        float: left;
        width: 100%;
      }
      &-name {
        float: left;
        width: 50%;
        overflow: hidden;
        height: 100%;
        font-size: 14px;
      }
      &-num {
        float: left;
        font-size: 16px;
      }
      &-icon {
        float: left;
        font-size: 16px;
        width: 14px;
        height: 14px;
        background-color: #fff;
        text-align: left;
        margin-right: 5px;
      }
    }
  }
</style>
