<template>
    <div :class="classes" ref="lBody">
        <div :class="[prefixCls + '-clr']" :style="{backgroundColor:item.color}"></div>
        <div :class="[prefixCls + '-name']" :style="{lineHeight:lhStyle,color:tColor}">{{item.name}}</div>
        <div :class="[prefixCls + '-num']" :style="nuSty">{{item.value}}
            <span :class="[prefixCls + '-unit']" :style="unitSty">{{unit}}</span>
        </div>
        <span :class="[prefixCls + '-com']" :style="{lineHeight:lhStyle,color:tColor}">同比</span>
        <div :class="typeCls"></div>
        <div :class="[prefixCls + '-ratio']" :style="{lineHeight:lhStyle,color:tColor}">{{item.ratio}}</div>
    </div>
</template>
<script>
const prefixCls = "geo-yLegend";

export default {
  name: "yLegend",
  props: {
    unit: {
      type: String,
      default: "亿元"
    },
    item: {
      type: Object,
      default: function() {
        return {
          color: "#000",
          name: "孝感",
          value: "10500",
          ratio: "5%"
        };
      }
    },
    // 文字顏色
    tColor: {
      type: String,
      default: "#000"
    },
    // 数字样式
    nuSty: {
      type: Object,
      default: function() {
        return {
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
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      lhStyle: ""
    };
  },
  computed: {
    classes() {
      return [`${prefixCls}`];
    },
    typeCls(item) {
      return [
        [`${prefixCls}-type`],
        {
          [`${prefixCls}-type-up`]: parseFloat(this.item.ratio) > 0,
          [`${prefixCls}-type-down`]: parseFloat(this.item.ratio) < 0
        }
      ];
    }
  },
  mounted() {
    let lHeight = this.$refs.lBody.clientHeight;
    this.lhStyle = `${lHeight}px`;
  },
  updated() {
    let lHeight = this.$refs.lBody.clientHeight;
    this.lhStyle = `${lHeight}px`;
  }
};
</script>
