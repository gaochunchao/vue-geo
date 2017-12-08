<template>
  <div :class="classes" ref="lBody">
    <div :class="[prefixCls + '-clr']" :style="{backgroundColor:item.color}"></div>
    <div :class="[prefixCls + '-name']" :style="{lineHeight:lhStyle,color:tColor}">{{item.name}}</div>
    <div :class="[prefixCls + '-val']" :style="{lineHeight:lhStyle,color:tColor}">{{item.value}}</div>
    <div :class="typeCls"></div>
    <div :class="[prefixCls + '-ratio']" :style="{lineHeight:lhStyle,color:tColor}">{{item.ratio}}</div>
  </div>
</template>
<script>
const prefixCls = "geo-xLegend";

export default {
  name: "xLegend",
  props: {
    // 文字顏色
    tColor: {
      type: String,
      default: "#000"
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
    console.log(lHeight);
    this.lhStyle = `${lHeight}px`;
  },
  updated() {
    let lHeight = this.$refs.lBody.clientHeight;
    this.lhStyle = `${lHeight}px`;
  }
};
</script>
