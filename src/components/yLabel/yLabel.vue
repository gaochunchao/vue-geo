<template>
  <div :class="classes" :style="styles">
    <div :class="[prefixCls + '-box']">
      <div :class="[prefixCls + '-text']" :style="vStyle">
        {{text}}
        <span :style="uStyle">{{unit}}</span>
      </div>
    </div>
    <div :class="[prefixCls + '-name']" v-if="name" :style="{color:uColor}">{{name}}</div>
  </div>
</template>
<script>
const prefixCls = "geo-yLabel";

export default {
  name: "yLabel",
  props: {
    // 设置外盒的样式
    styles: {
      type: Object,
      default: function() {
        return {
          width: "100px",
          height: "100%"
        };
      }
    },
    // 单位样式设置
    uStyle: {
      type: Object,
      default: function() {
        return {
          color: "#f9693f",
          fontSize: "14px"
        };
      }
    },
     // 数值样式设置
    vStyle: {
      type: Object,
      default: function() {
        return {
          color: "#f9693f",
          fontSize: "24px"
        };
      }
    },
    val: {
      type: String,
      default: "--"
    },
    unit: String,
    name: String,
    // 下面文字字体颜色
    uColor:String
  },
  data() {
    return {
      text: this.val,
      prefixCls: prefixCls
    };
  },
  computed: {
    classes() {
      return [`${prefixCls}`];
    }
  },
  watch: {
    val(curVal, oldVal) {
      this.text = curVal;
    }
  }
};
</script>
