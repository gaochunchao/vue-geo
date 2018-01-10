<template>
    <div>
        <span>饼形图</span>
        <pieChart text="经济" :colors="fsPie.colors" :itemData="fsPie.itemData" :selected="false" :kind="'overlayPie'" :radius="[['40%','50%'],['50%','60%'],['60%','70%']]" :percent="false" :startAngle="[90,90,90]" unit="人"></pieChart>
        <pieChart :type="'h'" :height="200" :width="230" :colors="fsPie.colors" :itemData="fsPie.itemData" :selected="false" :radius='[25, 35]' unit="人" :hasRatio="true" :qty="true" :text="'总计'" :pieEvent="fsPie.pieEvent"></pieChart>
        <ul class="tabBox">
            <li class="tabName" :class="tabid==item.id?'selected':''" @click="sczzCY(item.id)" v-for="item in tabItem" :key="item.id">{{item.name}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tabItem: [
                {
                    id: 1,
                    name: "分类对比"
                },
                {
                    id: 2,
                    name: "区县对比"
                }
            ],
            tabid: 1,
            fsPie: {
                colors: ["#25D4E7", "#FE6B40", "#459DF7", "#AF83E8", "#EBAE43"],
                title: "工业废水行业分布",
                itemData: [
                    {
                        value: 500,
                        name: "造纸和纸制品业"
                    },
                    {
                        value: 300,
                        name: "金属制品业"
                    },
                    {
                        value: 240,
                        name: "纺织业"
                    }
                ]
            },
            csKey: +new Date(),
            caseSource: {
                colors: [
                    "#00bce0",
                    "#a4ccea",
                    "#54c5ff",
                    "#3b4d64",
                    "#71caff",
                    "#54c5ff",
                    "#00bce0",
                    "#a4ccea",
                    "#3b4d64"
                ],
                itemData: [
                    {
                        name: "电话诉求",
                        value: "77"
                    },
                    {
                        name: "领导交办",
                        value: "33"
                    },
                    {
                        name: "城管上报",
                        value: "33"
                    },
                    {
                        name: "公安非警务",
                        value: "33"
                    },
                    {
                        name: "门户网站",
                        value: "25"
                    },
                    {
                        name: "市级下发",
                        value: "20"
                    },
                    {
                        name: "旅游官网",
                        value: "19"
                    },
                    {
                        name: "微信",
                        value: "32"
                    },
                    {
                        name: "前台转办",
                        value: "28"
                    }
                ]
            }
        };
    },
};
</script>
<style lang="less">
.tabBox {
    width: 228px;
    margin: 0 auto;
    .tabName {
        display: inline-block;
        color: #000;
        text-align: center;
        width: 101px;
        height: 32px;
        line-height: 30px;
        border: 1px solid #83c8fe;
        margin-right: 20px;
        box-shadow: 0px 0px 9px #83c8fe inset;
        &:last-child {
            margin-right: 0;
        }
        &.selected {
            border: 1px solid #ffda84;
            box-shadow: 0px 0px 9px #ffda84 inset;
        }
    }
}
</style>

