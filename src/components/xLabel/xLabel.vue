<template>
  <div :class="classes" :style="styles">
    <div :class="[prefixCls + '-name']" :style="naSty" v-html="name"></div>
    <div :class="[prefixCls + '-num']" :style="nuSty" v-if="isUnit">{{num}}
      <span :class="[prefixCls + '-unit']" :style="unitSty">{{unit}}</span>
    </div>
    <div :class="[prefixCls + '-num']" :style="nuSty" v-else>
      <span :class="[prefixCls + '-badge']" :style="badSty">第 </span>{{num}}
      <span :class="[prefixCls + '-badge']" :style="badSty"> 位</span>
    </div>
  </div>
</template>
<script>
const prefixCls = "geo-xLabel";
export default {
  name: "xLabel",
  props: {
    // 设置外盒的样式
    styles: {
      type: Object,
      default: function() {
        return {
          width: "200px",
          height: "100%"
        };
      }
    },
    num: {
      type: [String, Number],
      default: 0
    },
    name: {
      type: String,
      default: "增加值"
    },
    unit: {
      type: String,
      default: "万元"
    },
    isUnit: {
      type: Boolean,
      default: true
    },
    // 名字样式
    naSty: {
      type: Object,
      default: function() {
        return {
          width: "40%",
          color: "#000",
          fontSize: "14px"
        };
      }
    },
    // 数字样式
    nuSty: {
      type: Object,
      default: function() {
        return {
          width: "60%",
          color: "#e47f61",
          fontSize: "24px"
        };
      }
    },
    // 单位样式
    unitSty: {
      type: Object,
      default: function() {
        return {
          color: "#e47f61",
          fontSize: "14px"
        };
      }
    },
    // 排名数字前后文字的样式
    badSty: {
      type: Object,
      default: function() {
        return {
          color: "#e47f61",
          fontSize: "14px"
        };
      }
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
    }
  }
};
</script>
