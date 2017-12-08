<template>
  <div>
    <span>饼形图</span>
    <pieChart text="经济" :colors="fsPie.colors" :itemData="fsPie.itemData" :selected="false" unit="%"
              :kind="'overlayPie'"
              :radius="[['40%','60%'],['50%','70%'],['60%','80%']]"></pieChart>
    <pieChart :type="'h'" :height="150" :width="180" :colors="fsPie.colors" :itemData="fsPie.itemData" :selected="false"
              :radius='[25, 35]' unit="%"></pieChart>
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
              value: 26,
              name: "造纸和纸制品业"
            },
            {
              value: 22,
              name: "金属制品业"
            },
            {
              value: 18,
              name: "纺织业"
            }
          ]
        }
      };
    }
  };
</script>
