<template>
  <section :style="outerStyle" class="geo-xRing-animate" :class="reverse?'reverse':'positive'">
    <div :class="classes" :style="innerStyle">
      <div class="geo-xRing-box" :style="innerText">
        <slot></slot>
      </div>
    </div>
  </section>
</template>
<script>
  const prefixCls = "geo-xRing";
  export default {
    name: "xRing",
    props: {
      color: {
        type: String,
        default: '#84fff5' // 5fb0ea
      },
      radius: {
        type: Number,
        default: 95
      },
      // 动画方向
      reverse:{
        type:Boolean,
        default:false
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
          `${prefixCls}-inner`
        ];
      },
      outerStyle(){
        return {
          width: `${this.radius+10}px`,
          height: `${this.radius+10}px`,
          border: `5px dashed ${this.color}`,
          borderRadius: `50%`
        }
      },
      innerStyle(){
        return {
          width: `${this.radius}px`,
          height: `${this.radius}px`
        }
      },
      innerText(){
        return {
          width: `${this.radius-20}px`,
          height: `${this.radius-20}px`,
          top:'10px',
          left:'10px'
        }
      }
    }
  }
</script>

