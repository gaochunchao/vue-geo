<template>
    <div style="width:300px;height:100px">
        <x-legend v-for="(item,index) in qxPie.itemData" :key="item.name" :item="{name:item.name,value:item.value,ratio:item.ratio,color:itemColor(index,qxPie.colors)}" style="width:50%;height:25%"></x-legend>
    </div>
</template>
<script>
export default {
  data() {
    return {
      qxPie: {
        colors: [
          "#469df7",
          "#7cd8fd",
          "#a581d2",
          "#d2c681",
          "#ecbd6c",
          "#f28864",
          "#f17070",
          "#2eadbc"
        ],
        itemData: [
          {
            value: 45,
            name: "孝南区",
            ratio: "10%"
          },
          {
            value: 15,
            name: "孝昌县",
            ratio: "10%"
          },
          {
            value: 35,
            name: "云梦县",
            ratio: "10%"
          },
          {
            value: 55,
            name: "汉川市",
            ratio: "10%"
          },
          {
            value: 55,
            name: "安陆市",
            ratio: "10%"
          },
          {
            value: 55,
            name: "大悟县",
            ratio: "10%"
          },
          {
            value: 55,
            name: "应城市",
            ratio: "10%"
          },
          {
            value: 55,
            name: "市高新",
            ratio: "10%"
          }
        ]
      }
    };
  },
  methods: {
    itemColor(index, colors) {
      return colors[index];
    }
  }
};
</script>



