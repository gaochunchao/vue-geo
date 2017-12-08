<template>
  <div :class="classes" :style="styles">
    <div :class="tClass" v-if="title">{{title}}</div>
    <div :class="[prefixCls + '-main']">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { oneOf } from "../../utils/assist";

const prefixCls = "geo-irBorder";

export default {
  name: "irBorder",
  props: {
    title: String, //文本内容
    // 外盒宽度
    width: {
      type: [Number, String]
    },
    // 外盒高度
    height: {
      type: [Number, String]
    },
    // 自定义字体样式
    fontClass: {
      type: String
    },
    // 边框大小类型
    type: {
      type: String,
      default: "small",
      validator(value) {
        return oneOf(value, ["small", "middle", "big"]);
      }
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-small`]: this.type === "small",
          [`${prefixCls}-middle`]: this.type === "middle",
          [`${prefixCls}-big`]: this.type === "big"
        }
      ];
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
    },
    tClass(){
      return [
        `${prefixCls}-title`,
        {
          [`${this.fontClass}`]: !!this.fontClass
        }
      ];
    },
  }
};
</script>
