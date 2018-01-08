<template>
  <div :class="classes" ref="liquidFill" :style="styles">
  </div>
</template>
<script>
import eCharts from "echarts";
import liquidfill from "echarts-liquidfill";

const prefixCls = "geo-liquidFill";

export default {
    name: "liquidFill",
    props: {
        // 外盒宽度
        width: {
            type: [Number, String],
            default: 500
        },
        // 外盒高度
        height: {
            type: [Number, String],
            default: 300
        },
        dataList: {
            type: Array,
            default() {
                return [];
            }
        },
        title: String,
        colorList: {
            type: Array,
            default() {
                return [];
            }
        },
        percent: String,
        // 标题的颜色
        titleCor: {
            type: String,
            default: "#4EAFF8"
        },
        // 百分比的颜色
        percentCor: {
            type: String,
            default: "#ccc"
        }
    },
    data() {
        return {
            chart: null
        };
    },
    computed: {
        classes() {
            return `${prefixCls}`;
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
        }
    },
    mounted() {
        setTimeout(() => {
            this.drawChart();
        }, 500);
    },
    updated() {
        this.$nextTick(() => {
            this.drawChart();
        });
    },
    watch: {
        dataList(curVal, oldVal) {
            this.drawChart();
        },
        colorList(curVal, oldVal) {
            this.drawChart();
        }
    },
    methods: {
        drawChart() {
            const option = {
                series: [
                    {
                        type: "liquidFill",
                        data: this.dataList,
                        color: this.colorList,
                        amplitude: "5%",
                        waveLength: "80%",
                        phase: "auto",
                        period: "auto",
                        direction: "right",
                        radius: "80%",
                        shape: "circle",
                        center: ["50%", "50%"],

                        backgroundStyle: {
                            color: "rgba(0,0,0,0)",
                            borderWidth: 1,
                            borderColor: "rgba(0,0,0,0)"
                        },
                        tooltip: {
                            show: true
                        },
                        outline: {
                            borderDistance: 5,
                            itemStyle: {
                                color: "none",
                                borderColor: "#4EAFF8",
                                borderWidth: 3,
                                shadowBlur: 10,
                                shadowColor: "rgba(0, 0, 0, 0.25)"
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: this.colorList[0]
                                        },
                                        {
                                            offset: 0.8,
                                            color: this.colorList[1]
                                        }
                                    ]
                                }
                            }
                        },
                        label: {
                            normal: {
                                align: "center",
                                baseline: "middle",
                                position: "inside",
                                fontSize: 16,
                                fontWeight: "normal",
                                // formatter: this.title + "\n" + this.percent
                                formatter: [
                                    "{title|" + this.title + "}",
                                    "{percent|" + this.percent + "}"
                                ].join("\n"),
                                borderRadius: 4,
                                rich: {
                                    title: {
                                        fontSize: 14,
                                        fontFamily: "MicrosoftYaHei",
                                        color: this.titleCor,
                                        align: "center",
                                        padding: [15, 0, 9, 0]
                                    },
                                    percent: {
                                        fontSize: 28,
                                        fontFamily: "Conv_DINEngschriftStd",
                                        color: this.percentCor
                                    }
                                }
                            }
                        }
                    }
                ]
            };
            this.chart = eCharts.init(this.$refs.liquidFill);
            this.chart.setOption(option);
        }
    }
};
</script>