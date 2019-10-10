<template>
  <canvas ref="cirPross" :class="classes" :width="ctxBox" :height="ctxBox"></canvas>
</template>
<script>
const prefixCls = 'geo-cirPross';

export default {
    name: 'cirPross',
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
        showStar:{type:Boolean,default:true},
        color: {
      //填充色
            type: String,
            default: '#f9693f'
        },
    // 中间百分比颜色
        percentCor: {
            type: String,
            default: '#000'
        },
        starColor:{
            type:String,default:''
        },
    // 中间文字字体
        font:{
            type:String,
            default:'25px AgencyFBBold'
        },
    },
    data() {
        return {
            canvaStyle: {},
            ctx: null,
            shadowColor:'',
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
        },
        ctxBox(){
            return this.showStar?(this.radius+this.lineWidth*2.5)*2:(this.radius+this.lineWidth)*2;
        }
    },
    watch: {
        percent(curVal) {
            if (isNaN(curVal)) {
                this.whiteCircle();
                this.textPercent('-');
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
        this.shadowColor=this.colorRgb(this.color,0.3);
        this.canvaStyle = {
            marginTop: `${marginTop}px`,
            marginLeft: `${marginLeft}px`
        };
        this.ctx = canvas.getContext('2d');
        this.centerX = canvas.width / 2; //Canvas中心点x轴坐标
        this.centerY = canvas.height / 2; //Canvas中心点y轴坐标
        if (isNaN(this.percent)) {
            this.whiteCircle();
            this.textPercent('-');
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
        colorRgb(sColor,opacity){
            sColor = sColor.toLowerCase();
    //十六进制颜色值的正则表达式
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
            if (sColor && reg.test(sColor)) {
                if (sColor.length === 4) {
                    var sColorNew = '#';
                    for (var i=1; i<4; i+=1) {
                        sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
                    }
                    sColor = sColorNew;
                }
        //处理六位的颜色值
                var sColorChange = [];
                for (let i=1; i<7; i+=2) {
                    sColorChange.push(parseInt('0x'+sColor.slice(i, i+2)));    
                }
                return 'RGBA(' + sColorChange.join(',') + ','+opacity+')';
            }
            return sColor;
        },
    //绘制蓝色外圈
        blueCircle(n) {
            this.ctx.save();
            this.ctx.strokeStyle = this.color; //设置描边样式
            this.ctx.lineWidth = this.lineWidth; //设置线宽
            this.ctx.beginPath(); //路径开始
            //用于绘制圆弧this.ctx.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
            var endRadian=-Math.PI / 2 + n * this.rad;
            this.ctx.arc(this.centerX,this.centerY,this.radius,-Math.PI / 2,endRadian,false);
            this.ctx.lineCap = 'round';
            this.ctx.stroke(); //绘制
            this.ctx.closePath(); //路径结束
            if(this.showStar) this.drawStar(endRadian);
            this.ctx.restore();
        },
          // 绘制星光
        drawStar(endRadian){            
            var angle = 2*Math.PI - endRadian; // 转换成逆时针方向的弧度（三角函数中的）
            var xPos = Math.cos(angle) * this.radius + this.centerX; // 红色圆 圆心的x坐标
            var yPos = -Math.sin(angle) * this.radius + this.centerY; // 红色圆 圆心的y坐标
            var grd=this.ctx.createRadialGradient(xPos,yPos,0,xPos,yPos,this.lineWidth*1.2);
            grd.addColorStop(0,'#fff');
            grd.addColorStop(1,this.shadowColor);                 
            this.ctx.beginPath();
            this.ctx.moveTo(xPos,yPos+this.lineWidth*2.5);
            this.ctx.lineTo(xPos-3,yPos);
            this.ctx.lineTo(xPos,yPos-this.lineWidth*2.5);
            this.ctx.lineTo(xPos + 3,yPos);
            this.ctx.fillStyle=grd;
            this.ctx.shadowBlur=10;
            this.ctx.shadowColor=this.starColor.length>0?this.starColor:this.color;                          
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.moveTo(xPos-this.lineWidth*2.5,yPos);
            this.ctx.lineTo(xPos,yPos-3);
            this.ctx.lineTo(xPos+this.lineWidth*2.5,yPos);
            this.ctx.lineTo(xPos,yPos+3);            
            this.ctx.shadowBlur=10;
            this.ctx.shadowColor=this.starColor.length>0?this.starColor:this.color;                 
            this.ctx.fillStyle=grd;  
                    
            this.ctx.closePath();
            this.ctx.fill();
        },
    //绘制外圈
        whiteCircle() {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.lineWidth = this.lineWidth; //设置线宽
            this.ctx.strokeStyle = this.color;
            this.ctx.globalAlpha = 0.1;
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
            this.ctx.textAlign='center';
      //绘制字体，并且指定位置
            this.ctx.fillText((isNaN(n) ? n : n.toFixed(0)) + '%',this.centerX ,this.centerY + 10);
            this.ctx.restore();
        }
    }
};
</script>