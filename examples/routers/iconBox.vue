<template>
  <div>
    <span>图标列表</span>
    <icon-box v-for="(item,index) in tx" :img="item.img" :text="item.text" :name="item.name" :key="index"
              :unit="item.unit" :isShow="false"></icon-box>
    <img src="../images/dollar.png" height="34" width="34"/>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tx: [
          {
            img: "../images/phone.png",
            text: "98%",
            unit: "万户",
            name: "移动电话使用量"
          },
          {
            img: "../images/router.png",
            text: "98%",
            unit: "万户",
            name: "宽带用户数"
          },
          {
            img: "../images/dollar.png",
            text: "98%",
            name: "通信营业总收入",
            unit: "亿元"
          }
        ]
      };
    }
  };
</script>



