<template>
    <div style="width:500px">
        <y-label v-for="(item,index) in nygy" :key="index" :name="item.name" :val="item.val" :unit="item.unit" color="#f9693f" :styles="{width:'30%'}"></y-label>
        <!-- <x-label num="100" :isUnit="false" :nuSty="{color:'#469df7',width:'60%',fontSize:'28px'}" :badSty="{color:'#e47f61',fontSize:'12px'}"></x-label> -->
    </div>
</template>
<script>
export default {
  data() {
    return {
      nygy: [
        //能源供应
        {
          val: "56",
          unit: "亿/m³",
          name: "供水量"
        },
        {
          val: "34",
          unit: "亿/m³",
          name: "供气量"
        },
        {
          val: "-",
          unit: "亿/千瓦时",
          name: "供电量"
        },
        {
          val: "-",
          unit: "亿/m³",
          name: "供气量"
        },
        {
          val: "-",
          unit: "亿/m³",
          name: "供油量"
        }
      ]
    };
  }
};
</script>



