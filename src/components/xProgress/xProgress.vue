<template>
    <div :style="progressStyle" :class="classes">
        <div :class="[prefixCls + '-text']">
            <div :class="[prefixCls + '-name']" :style="txtStyle">{{text}}</div>
            <div :class="[prefixCls + '-num']" :style="numStyle">{{mount}}</div>
        </div>
        <div :class="[prefixCls + '-bar']">
            <div :class="[prefixCls + '-full-bar']" :style="{height: this.strokeWidth+'px',
                backgroundColor: trailColor}">
                <div :class="[prefixCls + '-percent-bar']" :style="{backgroundColor: strokeColor,
                width: percent + '%'}"></div>
            </div>
            <div :class="[prefixCls + '-circle']" :style="circleStyle"></div>
        </div>
    </div>
</template>
<script>
const prefixCls = "geo-xProgress";

export default {
    name: "xProgress",
    props: {
        percent: Number,
        strokeColor: {
            // 进度条的颜色
            type: String,
            default: "#5fb0ea"
        },
        trailColor: {
            // 进度条背景颜色
            type: String,
            default: "#4b606D"
        },
        strokeWidth: {
            // 进度条线宽
            type: Number,
            default: 8
        },
        width: {
            // 进度条宽度
            type: Number,
            default: 120
        },
        text: {
            // 文字说明
            type: String
        },
        mount: {
            // 数值
            type: Number,
            default: 0
        },
        // 文字样式
        txtStyle:{
            type:Object,
            default:{
                color:"#fff",
                fontSize:"14px"
            }
        },
        // 数字样式
        numStyle:{
            type:Object,
            default:{
                color:"#fff",
                fontSize:"24px"
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
            return [`${prefixCls}`];
        },
        circleStyle() {
            return {
                backgroundColor: this.strokeColor,
                width: `${this.strokeWidth + 6}px`,
                height: `${this.strokeWidth + 6}px`
            };
        },
        progressStyle() {
            return {
                width: `${this.width}px`
            };
        }
    }
};
</script>
