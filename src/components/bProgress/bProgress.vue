<!--add by wangyanping 2018年1月15日 10:39:48-->
<template>
  <div :class="classes" :style="trailStyle">
    <div :class="[prefixCls + '-bar']" :style="strokeStyle">
      {{value}}
      <label> {{value>0?unit:''}}</label>
      <div :class="[prefixCls + '-value']">{{percent}}%</div>
    </div>
  </div>
</template>
<script>
const prefixCls = "geo-bProgress";

export default {
    name: "bProgress",
    props: {
        percent: {
            // 百分比
            type: Number | String,
            default: 0
        },
        value: {
            // 内容
            type: String,
            default: ""
        },
        unit: {
            // 单位
            type: String,
            default: ""
        },
        strokeColor: {
            // 进度条的颜色
            type: String,
            default: "#5fb0ea"
        },
        trailColor: {
            // 进度条背景颜色
            type: String,
            default: "#4b606D"
        },
        width: {
            // 进度条宽度
            type: Number,
            default: 120
        }
    },
    data() {
        return {
            prefixCls: prefixCls
        };
    },
    computed: {
        classes() {
            return [`${prefixCls}`];
        },
        trailStyle() {
            return {
                backgroundColor: this.trailColor,
                width: `${this.width}px`
            };
        },
        strokeStyle() {
            return {
                backgroundColor: this.strokeColor,
                width: `${this.percent > 100 ? 100 : this.percent}%`,
                minWidth: this.percent > 0 ? "20%" : ""
            };
        }
    }
};
</script>