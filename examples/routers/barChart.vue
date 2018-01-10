
<template>
  <div>
    <span>柱状图</span>
    <bar-chart class="gyBar fl" :legend="gycz.legend" :xAxis="gycz.xAxis" :colorList="gycz.colorList" :series="gycz.series" :barWidth="8" :tLabel="{show:false}" :width="438" :height="247" :axisLineClr="'#2a72c1'" :barGap="0" :splitLineClr="'rgba(42,114,193,0.35)'" :grid="{top:40,bottom:40,left:45,right:10}" :axisLalClr="'#9dc4dd'" :yName="'(万吨)'" :legShow="false" :avPosition="'start'"></bar-chart>
  </div>
</template>
<script>
export default {
    data() {
        return {
            gycz: {
                legend: ["当月产值", "当月销售产值", "当月产值涨幅", "当月销售产值涨幅"],
                colorList: ["#0fbadc", "#E8CD4E", "#0fbadc", "#E8CD4E"],
                xAxis: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
                series: [
                    {
                        type: "bar",
                        data: [170, 190, 195, 175, 205, 230, 200]
                    },
                    {
                        type: "bar",
                        data: [270, 290, 295, 275, 305, 310, 308]
                    },
                    {
                        type: "line",
                        data: [1.0, 2.3, 3.5, 2.1, 1.7, 3.3, 2.0]
                    },
                    {
                        type: "line",
                        data: [1.5, 2.1, 3.0, 2.75, 1.9, 3.1, 2.03]
                    }
                ]
            }
        };
    }
};
</script>
