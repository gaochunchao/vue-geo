<template>
  <div :class="classes" :style="styles">
    <div :class="[prefixCls + '-icon']"><img :src="img.length>0 ? img : '../../styles/images/carbon.png'" height="50" width="50" /></div>
    <div :class="[prefixCls + '-textBox']">
      <div :class="[prefixCls + '-textBox-val']" :style="{color:numCor}" v-if="isShow">{{text}}
        <span :style="{color:unitCor}">{{unit}}</span>
      </div>
      <countTo :class="[prefixCls + '-textBox-val']" :style="{color:numCor}" :startVal='startVal' :endVal="endVal" :decimals="getDecimals()" :suffix="getSuffix()" :duration='4000' v-else></countTo>
      <div :class="[prefixCls + '-textBox-name']" :style="{color:nameCor}">{{name}}</div>
    </div>
  </div>
</template>
<script>
import countTo from "vue-count-to";

const prefixCls = "geo-iconBox";

export default {
  name: "iconBox",
  components: { countTo },
  props: {
    // 设置外盒的样式
    styles: {
      type: Object,
      default: function() {
        return {
          width: "300px",
          height: "100%"
        };
      }
    },
    // 如果为false，则数字是动画加载效果
    isShow: {
      type: Boolean,
      default: true
    },
    img: {
      type: String,
      default: "../images/wifi.png"
    },
    // 数值
    text: {
      type: String | Number,
      default: "-"
    },
    // 名字
    name: {
      type: String,
      default: "名称"
    },
    // 单位
    unit: {
      type: String,
      default: "-"
    },
    // 设置单位的颜色
    unitCor: {
      type: String,
      default: "#000"
    },
    // 设置数字的颜色
    numCor: {
      type: String,
      default: "#000"
    },
    // 名称的颜色
    nameCor: {
      type: String,
      default: "#000"
    }
  },
  data() {
    return {
      startVal: 0,
      endVal: 0,
      prefixCls: prefixCls
    };
  },
  mounted() {
    this.getNum();
  },
  computed: {
    classes() {
      return [`${prefixCls}`];
    }
  },
  methods: {
    getNum() {
      //获取text的数字部分
      for (var i = 0; i < this.text.length; i++) {
        //去除前缀
        if (this.text.charAt(i) <= "9" && this.text.charAt(i) >= "0") {
          this.endVal = this.text.substr(i);
          break;
        }
      }
      for (var i = this.endVal.length - 1; i >= 0; i--) {
        //去除后缀，从字符串尾部遍历，碰到第一个数字时记录i的位置
        if (this.endVal.charAt(i) <= "9" && this.endVal.charAt(i) >= "0") {
          this.endVal = parseFloat(this.endVal.substr(0, i + 1));
          break;
        }
      }
    },
    getDecimals() {
      //获得小数部分长度
      let str = this.endVal + "";
      let i = str.indexOf(".") + 1; //获取小数点的位置
      if (i > 0) {
        return str.length - i; //获取小数点后的个数
      } else {
        return 0;
      }
    },
    getSuffix() {
      //截取后缀
      for (var i = this.text.length; i >= 0; i--) {
        if (this.text.charAt(i) <= "9" && this.text.charAt(i) >= "0") {
          return this.text.substr(i + 1);
          break;
        }
      }
    }
  }
};
</script>
