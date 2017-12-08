<template>
  <section :class="classes" :style="styles">
    <div :class="[prefixCls + '-chart']">
      <img :class="[prefixCls + '-chart-split']" src="../../images/gauge/bftd.png"></img>
      <img :class="[prefixCls + '-chart-jt']" :style="jtStyle" style="transform: rotateZ(-90deg);"
           src="../../images/gauge/jt.png"></img>
    </div>
    <div :class="[prefixCls + '-text']" ref="text">
      <div :class="[prefixCls + '-text-percent']">
        <countTo :startVal='0' :endVal="percent" :decimals="getDecimals()" :suffix="getSuffix()"
                 :duration='4000'></countTo>
        %
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
        rate: this.percent,
        jtStyle: {
          transform: 'rotateZ(0deg)'
        }
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
        if (!isNaN(this.rate)) {
          const speed = (1.8 * this.rate) / 4;
          let count = 0;
          let timer = setInterval(() => {
            count++;
            this.jtStyle = `transform: rotateZ(${-90 + speed * count/10}deg)`;
            if (count === 50) {
              clearInterval(timer);
            }
          }, 50);
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
