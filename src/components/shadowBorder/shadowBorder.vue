<template>
  <div :class="classes" :style="styles">
    <div :class="[prefixCls + '-box']">
      <div :class="[prefixCls + '-box-title']" :style="{color:titleColor}">{{title}}</div>
      <div :class="[prefixCls + '-box-inner']" :style="{height:mainHeight}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
  import {oneOf} from "../../utils/assist";

  const prefixCls = "geo-shadowBorder";

  export default {
    name: "shadowBorder",
    props: {
      // 外盒宽度
      width: {
        type: [Number, String],
        default: 400
      },
      // 外盒高度
      height: {
        type: [Number, String],
        default: 400
      },
      //是否显示边框
      border: {
        type: Boolean,
        default: true
      },
      // 边框颜色
      borderColor: {
        type: String,
        default: "#112665"
      },
      // 水平位移
      xShift: {
        type: [Number, String],
        default: 5
      },
      // 垂直位移
      yShift: {
        type: [Number, String],
        default: 5
      },
      // 模糊半径
      blur: {
        type: [Number, String],
        default: 15
      },
      // 设置标题的颜色
      titleColor: {
        type: String,
        default: "#112665"
      },
      // 设置标题
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        prefixCls: prefixCls
      };
    },
    computed: {
      classes() {
        return `${prefixCls}`;
      },
      styles() {
        return {
          border: this.border ? `1px solid ${this.borderColor}` : '',
          boxShadow: `${this.xShift}px ${this.yShift}px ${this.blur}px ${this.borderColor} inset ,-${this.xShift}px -${this.yShift}px ${this.blur}px ${this
            .borderColor} inset`,
          position: "relative",
          height: `${this.height}px`,
          width: `${this.width}px`
        };
      },
      mainHeight() {
        return this.title ? "calc(100% - 30px)" : "100%";
      }
    }
  };
</script>
