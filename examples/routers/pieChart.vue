<template>
    <div>
        <span>饼形图</span>
        <pieChart text="经济" :colors="fsPie.colors" :itemData="fsPie.itemData" :selected="false" :kind="'overlayPie'"
        :radius="[['40%','50%'],['50%','60%'],['60%','70%']]" :percent="true" :startAngle="[90,90,90]" unit="人"></pieChart>
        <pieChart :type="'h'" :height="200" :width="180" :colors="fsPie.colors" :itemData="fsPie.itemData" :selected="false" :radius='[25, 35]' unit="人"></pieChart>
    </div>
</template>
<script>
export default {
  data() {
    return {
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
      }
    };
  }
};
</script>