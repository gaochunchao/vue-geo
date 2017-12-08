<template>
    <div>
        <span>图标列表</span>
        <icon-box class="iconBox" v-for="(item,index) in tx" :img="item.img" :text="item.text" :name="item.name" :key="index" :unit="item.unit" :isShow="false"></icon-box>
    </div>
</template>
<script>
export default {
  data() {
    return {
      tx: [
        {
          img: require('../images/dollar.png'),
          text: "98%",
          unit: "万户",
          name: "移动电话使用量"
        },
        {
          img: require('../images/dollar.png'),
          text: "98%",
          unit: "万户",
          name: "宽带用户数"
        },
        {
          img: require('../images/dollar.png'),
          text: "98%",
          name: "通信营业总收入",
          unit: "亿元"
        }
      ]
    };
  }
};
</script>



