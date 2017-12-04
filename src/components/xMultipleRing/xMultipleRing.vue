<template>
  <div :style="circleSize" :class="prefixCls">
    <svg width="100%" height="100%">
      <circle :r="size-outerWidth" :cx="size" :cy="size" :stroke="outC" fill="none" :stroke-width="outerWidth"
              stroke-dasharray="28,5"></circle>
      <g fill="none" :stroke="outTrailColor" :stroke-width="outerWidth">
        <path stroke-dasharray="28,5" :transform="transform" :d="pathD(outPercent,size-outerWidth)"></path>
        <animateTransform attributeName="transform" ref="rotate" type="rotate" dur="5s" repeatCount="indefinite"
                          :from="from" :to="to"
                          v-if="animated"/>
      </g>
      <circle :r="innerCircleSize" :cx="size" :cy="size" fill="none" :stroke="innerC"
              :stroke-width="innerWidth"></circle>
      <path fill="none" :stroke="innerTrailColor" :stroke-width="innerWidth" :transform="transform"
            :d="pathD(innerPercent,innerCircleSize)"></path>
    </svg>
    <div :class="innerClasses">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  const prefixCls = 'geo-multiple-ring';
  const defaultSize = 60;
  const defaultSpace = 4;
  export default {
    name: 'MultipleRing',
    props: {
      size: {  //半径
        type: Number,
        default: defaultSize
      },
      animated: { //动画
        type: Boolean,
        default: true
      },
      space: { //内外环间隔
        type: Number,
        default: defaultSpace,
      },
      outPercent: { //外环占比
        type: Number,
        default: 0.27
      },
      outerWidth: { //外环宽度
        type: Number,
        default: 6
      },
      outerColor: { //外环底色
        type: String,
        default: '#386361'
      },
      outTrailColor: { //外环填充色
        type: String,
        default: '#39F'
      },
      innerPercent: { //内环占比
        type: Number,
        default: 1
      },
      innerWidth: { //内环宽度
        type: Number,
        default: 6
      },
      innerColor: { //内环底色
        type: String,
        default: '#edbaa0'
      },
      innerTrailColor: { //内环填充色
        type: String,
        default: '#F63'
      },
    },
    data(){
      return {
        outC: this.outerColor,
        innerC: this.innerColor,
        prefixCls: prefixCls
      }
    },
    computed: {
      innerClasses(){
        return `${prefixCls}-inner`;
      },
      circleSize () {
        return {
          width: `${this.size * 2}px`,
          height: `${this.size * 2}px`
        };
      },
      innerCircleSize(){
        return this.size - this.outerWidth - this.innerWidth - this.space;
      },
      from(){
        return [0, this.size, this.size].join(',');
      },
      to(){
        return [360, this.size, this.size].join(',');
      },
      transform(){
        return `translate(${this.size},${this.size})`;
      },
    },
    mounted(){
      this.outC = this.outPercent == 1 ? this.outTrailColor : this.outerColor;
      this.innerC = this.innerPercent == 1 ? this.innerTrailColor : this.innerColor;
    },
    methods: {
      pathD(percent, r){
        const degrees = percent * 360; //计算当前的进度对应角度值
        const rad = degrees * (Math.PI / 180); //计算当前角度对应的弧度值
        //极坐标转换成直角坐标
        const x = (Math.sin(rad) * r).toFixed(2);
        const y = -(Math.cos(rad) * r).toFixed(2);
        //大于180度时候画大角度弧，小于180度的画小角度弧，(deg > 180) ? 1 : 0
        const lenghty = window.Number(degrees > 180);
        //path 属性
        const descriptions = ['M', 0, -r, 'A', r, r, 0, lenghty, 1, x, y];
        return descriptions.join(' ');
      }
    }
  }
</script>
