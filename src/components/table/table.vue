<template>
  <table :class="classes" :style="[styles,{borderCollapse:'collapse'}]" ref="geoXTable">
    <!--表头-->
    <thead :class="[prefixCls + '-header']" :style="{backgroundColor:headerColor,height:thHeight+'px'}" v-if="isHeader">
      <th :class="[prefixCls + '-th']" v-for="item in columns" :style="[thStyle(item),{color:hColor}]" v-html="item.name" ref="thead">
      </th>
    </thead>
    <tbody :class="bodyStyle" :style="bodyHeight">
      <tr v-for="(item,index) in dataItem" :key="index" :style="[trHeight,trBack(index),{color:bColor},isHighLight(item)]">
        <td :class="[prefixCls + '-td']" :style="{width:liWidth(index),lineHeight:cellHeight(td)}" v-for="(td,index) in item" v-html="td">
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { oneOf } from "../../utils/assist";

const prefixCls = "geo-table";

export default {
  name: "tableForm",
  props: {
    // 设置外盒的样式
    styles: {
      type: Object,
      default: function() {
        return {
          width: "600px",
          height: "400px"
        };
      }
    },
    // 表头背景色
    headerColor: {
      type: String,
      default: ""
    },
    // tbody的背景颜色
    lineColors: {
      type: Array,
      default() {
        return [];
      }
    },
    // 设置表头的文字颜色
    hColor: {
      type: String,
      default: "#fff"
    },
    // 设置表格的文字颜色
    bColor: {
      type: String,
      default: "#fff"
    },
    // 是否显示表头
    isHeader: {
      type: Boolean,
      default: true
    },
    // 数据太多需要上下滚动来查看数据，则设置成true
    isScroll: {
      type: Boolean,
      default: false
    },
    // 设置每次展示的数据条数
    showNum: {
      type: [Number, String],
      default: 6
    },
    //头部高度
    thHeight: {
      type: Number,
      default: 24
    },
    // 表头数据
    columns: Array,
    // tbody数据
    dataItem: Array,
    // 高亮字体的颜色
    hlColor: {
      type: String,
      default: "#fe6b40"
    },
    // 设置高亮字
    keyWord: {
      type: String,
      default: "孝感"
    },
    // 是否需要动画效果
    animate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      trHeight: {
        height: "",
        lineHeight: ""
      },
      bodyHeight: {
        height: "",
        marginTop: "10px"
      },
      liHeight: 24, //单元格高度
      num: 0
    };
  },
  computed: {
    classes() {
      return `${prefixCls}`;
    },
    bodyStyle() {
      return [
        [`${prefixCls}-body`],
        {
          [`animated flipInX`]: this.animate == true
        }
      ];
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        const vHeight = this.$refs.geoXTable.clientHeight;
        let bHeight = vHeight;
        if (this.isHeader) {
          bHeight = vHeight - this.thHeight - 10;
          this.bodyHeight.height = `${bHeight}px`;
          this.bodyHeight.marginTop = "10px";
        } else {
          this.bodyHeight.height = `${bHeight}px`;
          this.bodyHeight.marginTop = "0";
        }
        if (this.isScroll) {
          this.liHeight = Math.floor(
            bHeight / this.showNum
          );
        } else {
          this.liHeight = bHeight / this.dataItem.length;
        }
        this.trHeight.height = `${this.liHeight}px`;
        this.trHeight.lineHeight = `${this.liHeight}px`;
      }, 10);
    });
  },
  methods: {
    trBack(index) {
      return {
        backgroundColor: this.lineColors[index % 2]
      };
    },
    thStyle(item) {
      const num = item.name.split("<br/>").length;
      return {
        width: item.width,
        lineHeight: `${this.thHeight / num}px`
      };
    },
    cellHeight(item) {
      const num = `${item}`.split("<br/>").length;
      return `${this.liHeight / num}px`;
    },
    liWidth(index) {
      const width = this.columns.filter(item => {
        return item.type == index;
      });
      return width[0].width;
    },
    isHighLight(item) {
      if (item.name == this.keyWord) {
        return {
          color: this.hlColor
        };
      }
    }
  }
};
</script>
