<template>
  <section :class="classes" :style="styles">
    <div :class="[prefixCls + '-chart']">
      <img :class="[prefixCls + '-chart-split']" src="../../styles/images/gauge/bftd.png"></img>
      <img :class="[prefixCls + '-chart-jt']" :style="jtStyle" style="transform: rotateZ(-90deg);"
           src="../../styles/images/gauge/jt.png" v-if="animated"></img>
      <img :class="[prefixCls + '-chart-jt']" style="transform: rotateZ(-90deg);" :style="jtStyle"
           src="../../styles/images/gauge/jt.png" v-else></img>
    </div>
    <div :class="[prefixCls + '-text']" ref="text">
      <div :class="[prefixCls + '-text-percent']" v-if="animated">
        <countTo :startVal='0' :endVal="percent" :decimals="getDecimals()" :suffix="getSuffix()"
                 :duration='4000'></countTo>
        %
      </div>
      <div :class="[prefixCls + '-text-percent']" v-else>
        {{percent}}%
      </div>
      <div :class="[prefixCls + '-text-name']">
        <slot></slot>
      </div>
    </div>
  </section>
</template>
<script>
  import countTo from "vue-count-to";
  const prefixCls = "geo-gauge";

  export default {
    components: {
      countTo
    },
    name: "gauge",
    props: {
      // 百分比
      percent: {
        type: Number
      },
      // 仪表盘图片
      src: {
        type: Array
      },
      animated: {
        type: Boolean,
        default: true
      },
      // 设置外盒的样式
      styles: {
        type: Object,
        default: function () {
          return {
            width: "94px",
            height: "40px"
          };
        }
      }
    },
    data() {
      return {
        prefixCls: prefixCls,
        jtStyle: {
          transform: 'rotateZ(0deg)'
        },
        duration: 3000, // 动画时间
        num: 100 // 移动次数
      };
    },
    computed: {
      classes() {
        return `${prefixCls}`;
      },
    },
    mounted(){
      this.transform();
    },
    methods: {
      transform() {
        if (!isNaN(this.percent)) {
          if (this.animated) {
            let count = 0;
            const speed = this.duration / this.num; // 动画速度
            const rate = 180 / this.num; // 翻转角度 一次移动的角度
            let timer = setInterval(() => {
              count++;
              this.jtStyle = `transform: rotateZ(${-90 + count * rate * (this.percent / 100)}deg)`;
              if (count === this.num) {
                clearInterval(timer);
              }
            }, speed);
          } else {
            this.jtStyle = `transform: rotateZ(${-90 + 1.8 * this.percent }deg)`;
          }
        } else {
          this.jtStyle = `transform: rotateZ(0deg);`;
        }
      },
      getDecimals() {
        //获得小数部分长度
        let str = this.percent + "";
        let i = str.indexOf(".") + 1; //获取小数点的位置
        if (i > 0) {
          return str.length - i; //获取小数点后的个数
        } else {
          return 0;
        }
      },
      getSuffix() {
        //截取后缀
        for (var i = this.percent.length; i >= 0; i--) {
          if (this.percent.charAt(i) <= "9" && this.percent.charAt(i) >= "0") {
            return this.percent.substr(i + 1);
            break;
          }
        }
      }
    }
  };
</script>
