<template>
  <canvas ref="cirPross" :class="classes" :width="(radius+lineWidth)*2" :height="(radius+lineWidth)*2"></canvas>
</template>
<script>
const prefixCls = "geo-cirPross";

export default {
  name: "cirPross",
  props: {
    percent: {
      //百分比进度
      type: Number | String,
      default: 95
    },
    radius: {
      //内环半径
      type: Number,
      default: 38
    },
    lineWidth: {
      //环形宽度
      type: Number,
      default: 12
    },
    color: {
      //填充色
      type: String,
      default: "#f9693f"
    },
    // 中间百分比颜色
    percentCor: {
      type: String,
      default: "#000"
    },
    // 中间文字字体
    font:{
      type:String,
      default:"25px AgencyFBBold"
    }
  },
  data() {
    return {
      canvaStyle: {},
      ctx: null,
      centerX: null,
      centerY: null,
      rad: Math.PI * 2 / 100,
      speed: 1,
      timer: null
    };
  },
  computed: {
    classes() {
      return `${prefixCls}`;
    }
  },
  watch: {
    percent(curVal, oldVal) {
      if (isNaN(curVal)) {
        this.whiteCircle();
        this.textPercent("-");
      } else {
        const that = this;
        const canvas = this.$refs.cirPross;
        (function drawFrame() {
          that.timer = window.requestAnimationFrame(drawFrame, canvas);
          that.ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
          that.whiteCircle();
          that.textPercent(that.speed);
          that.blueCircle(that.speed);
          if (that.speed >= curVal) window.cancelAnimationFrame(that.timer);
          that.speed += 1;
        })();
      }
    }
  },
  mounted() {
    const canvas = this.$refs.cirPross;
    const marginTop = canvas.clientHeight / 2 - this.radius;
    const marginLeft = canvas.clientWidth / 2 - this.radius;
    this.canvaStyle = {
      marginTop: `${marginTop}px`,
      marginLeft: `${marginLeft}px`
    };
    this.ctx = canvas.getContext("2d");
    this.centerX = canvas.width / 2; //Canvas中心点x轴坐标
    this.centerY = canvas.height / 2; //Canvas中心点y轴坐标
    if (isNaN(this.percent)) {
      this.whiteCircle();
      this.textPercent("-");
    } else {
      const that = this;
      (function drawFrame() {
        that.timer = window.requestAnimationFrame(drawFrame, canvas);
        that.ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        that.whiteCircle();
        that.textPercent(that.speed);
        that.blueCircle(that.speed);
        if (that.speed >= that.percent) window.cancelAnimationFrame(that.timer);
        that.speed += 1;
      })();
    }
  },
  methods: {
    //绘制蓝色外圈
    blueCircle(n) {
      this.ctx.save();
      this.ctx.strokeStyle = this.color; //设置描边样式
      this.ctx.lineWidth = this.lineWidth; //设置线宽
      this.ctx.beginPath(); //路径开始
      //用于绘制圆弧this.ctx.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
      this.ctx.arc(
        this.centerX,
        this.centerY,
        this.radius,
        -Math.PI / 2,
        -Math.PI / 2 + n * this.rad,
        false
      );
      this.ctx.lineCap = "round";
      this.ctx.stroke(); //绘制
      this.ctx.closePath(); //路径结束
      this.ctx.restore();
    },
    //绘制外圈
    whiteCircle() {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.lineWidth = this.lineWidth; //设置线宽
      this.ctx.strokeStyle = "#fff";
      this.ctx.globalAlpha = 0.2;
      this.ctx.arc(
        this.centerX,
        this.centerY,
        this.radius,
        0,
        Math.PI * 2,
        false
      );
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.restore();
    },
    //百分比文字绘制
    textPercent(n) {
      this.ctx.save(); //save和restore可以保证样式属性只运用于该段canvas元素
      this.ctx.fillStyle = this.percentCor; //设置描边样式
      this.ctx.font = this.font; //设置字体大小和字体
      const len = isNaN(n) ? n.length : n.toFixed(0).length;
      const x = len === 1 ? 10 : len === 2 ? 25 : 25;
      //绘制字体，并且指定位置
      this.ctx.fillText(
        (isNaN(n) ? n : n.toFixed(0)) + "%",
        this.centerX - x,
        this.centerY + 10
      );
      this.ctx.restore();
    }
  }
};
</script>
