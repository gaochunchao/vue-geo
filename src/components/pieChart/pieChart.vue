<template>
  <section :class="classes" :style="styles">
    <div :class="pieClasses" ref="pieChart" :style="{width:chartBox[0],height:chartBox[1]}"></div>
    <ul :class="[prefixCls + '-legend']" ref="text" :style="{width:itemBox[0],height:itemBox[1]}" v-if="showLegend">
      <li v-for="(item,index) in itemData" :class="[prefixCls + '-legend-li']" :style="liStyle">
        <div :class="iconClasses" :style="{backgroundColor:colors[index],marginTop:marginTop}"></div>
        <div :class="[prefixCls + '-legend-name']">
          <div v-html="item.name" :style="{color:tColor}"></div>
        </div>
        <div :class="[prefixCls + '-legend-num']">
          <span :class="[prefixCls + '-legend-num-value']" :style="{color:tColor}">{{item.value}}</span>
          <span style="{font-size:14px,color:tColor}">{{unit}}</span>
          <span v-if="hasRatio">({{ratio[index]}})</span>
        </div>
      </li>
    </ul>
  </section>
</template>
<script>
import eCharts from "echarts";
import { oneOf } from "../../utils/assist";

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
      default: "v",
      validator(value) {
        return oneOf(value, ["v","h"]);
      }
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
     // 饼形图的高度
    chartHeight: {
      type: String,
      default: "45"
    },
    colors: {
      type: Array,
      default: ["#25d4e7", "#fe6b40", "#6bb592"]
    },
    // 内外环的直径
    radius: {
      type: Array,
      default: [38, 50]
    },
    // 单位
    unit:{
      type:String,
      default:""
    },
    itemData: {
      type: Array,
      default: [
        { value: 171668, name: "地方企业" },
        { value: 2196236, name: "中省企业" }
      ]
    },
    // 饼图中间文字
    text: {
      type: String,
      default: ""
    },
    // 是否显示数据总和
    qty: {
      type: Boolean,
      default: false
    },
    // 自定义中间数字显示内容
    secText: {
      type: String,
      default:""
    },
    // 饼形图展现形式
    kind: {
      type: String,
      default: "normalPie",
      validator(value) {
        return oneOf(value, ["normalPie", "overlayPie"]);
      }
    },
    // 开始旋转的角度
    startAngle: {
      type: Array,
      default: () => {
        return [40, 30, 60];
      }
    },
    // 是否需要另外一半数据是透明
    percent:{
      type: Boolean,
      default: false
    },
    // 是否显示overlayPie的提示框
    tShow:{
      type:Boolean,
      default:true
    },
    // 图例上面是否显示百分比
    hasRatio:{
      type:Boolean,
      default:false
    },
    // 图例颜色图标的形状
    shape: {
      type: String,
      default: "square",
      validator(value) {
        return oneOf(value, ["round", "square"]);
      }
    },
    // 是否显示右边图例
    showLegend:{
      type:Boolean,
      default:true
    },
    // 主标题的样式
    textStyle:{
      type:Object,
      default:function(){
        return{
          color: '#000',
          fontWeight: "normal",
          fontSize: 16,
          fontFamily: "Mircosoft Yahei"
        }
      }
    },
    // 副标题或者总和的样式
    secTextStyle:{
      type:Object,
      default:function(){
        return{
              color: '#000',
              fontWeight: "normal",
              fontSize: 16,
              fontFamily: "Mircosoft Yahei"
        }
      }
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      liStyle: {
        height: "",
        lineHeight: ""
      },
      marginTop: "",
      ratio:[],
    };
  },
  computed: {
    chartBox() {
      return [
        this.type === "v" ? `${this.chartWidth}%` : "100%",
        this.type === "v" ?  "100%" : `${this.chartHeight}%`,
      ]
    },
    itemBox() {
      return [
        this.type === "v" ? `${100 - parseInt(this.chartWidth)}%` : "100%",
        this.type === "v" ? "100%" : `${100 - parseInt(this.chartHeight)}%` ,
      ]
    },
    classes() {
      return [
        {
          [`${prefixCls}-v`]: this.type === "v",
          [`${prefixCls}-h`]: this.type === "h"
        }
      ];
    },
    iconClasses(){
      return [
        [`${prefixCls}-legend-icon`],
        {
          [`${prefixCls}-roundIcon`]: this.shape === "round",
          // [`${prefixCls}-squareIcon`]: this.shape === "square"
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
      this.itemData.forEach((item,index)=>{
        isNaN(item.value) ? (sum = "-") : (sum += parseInt(item.value));
      })
      this.itemData.forEach((item,index)=>{
        this.ratio.push(((parseInt(item.value) / sum)* 100).toFixed(2) + "%")
      })
      sum+=this.unit;
      if (this.kind === "normalPie") {
        eCharts.util.each(this.itemData, (item, index) => {
          item.itemStyle = {
            normal: {
              color: this.colors[index]
            }
          };
          if (index == 0 && this.selected) {
            item.selected = true;
          }
        });
      }
      const option = {
        title: [
          {
            text: this.text.replace("\\n", "\n"), //通过传入\n可使标题换行
            left: "center",
            top: this.text && (this.qty || this.secText) ? "35%" : "45%",
            textBaseline: "middle",
            textStyle: this.textStyle
          },
          {
            text: this.secText ? this.secText : sum,
            show: this.qty || this.secText ? true : false,
            left: "center",
            top: this.text && (this.qty || this.secText) ? "55%" : "45%",
            textBaseline: "middle",
            textStyle: this.secTextStyle
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
      if (this.kind == "overlayPie") {
        let series = [];
        eCharts.util.each(this.itemData, (item, index) => {
          series.push({
            type: "pie",
            name: item.name,
            clockWise: false,
            startAngle: this.startAngle[index],
            radius: this.radius[index],
            itemStyle: {
              normal: {
                color: this.colors[index],
                label: { show: false },
                labelLine: { show: false },
                shadowBlur: 0,
                shadowColor: "rgba(0, 0, 0, 0)"
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: item.value,
                name: "visible"
              },
              {
                value: this.percent? sum - parseInt(item.value): this.itemData[0].value - item.value,
                name: "invisible",
                tooltip:{
                  show:false
                },
                itemStyle: {
                  normal: {
                    color: "rgba(0,0,0,0)",
                    label: { show: false },
                    labelLine: { show: false }
                  },
                  emphasis: {
                    color: "rgba(0,0,0,0)"
                  }
                }
              }
            ]
          });
        });
        option.series = series;
        option.tooltip = {
          show: this.tShow,
          formatter: this.unit
            ? "{a} <br/> {c}" + this.unit + "（{d0}%）"
            : "{a} <br/> {c} ({d}%)"
        };
      }
      const chart = eCharts.init(this.$refs.pieChart);
      chart.setOption(option);
    }
  }
};
</script>