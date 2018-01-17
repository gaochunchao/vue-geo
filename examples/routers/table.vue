<template>
  <div class="tableTest">
    <span>表格</span>
    <table-form color="#195fb4" :columns="qyTable.columns" :dataItem="qyTable.dataItem" :styles="tableStyle"
                :lineColors="['#05253c','#1c3f5d']" :headerColor="'#05253c'" :animate="animate"></table-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        animate: false,
        tableStyle: {
          width: '430px',
          height: '710px',
          margin: '10px'
        },
        qyTable: {
          lineColors: ["rgba(0,0,0,0)"],
          columns: [
            {
              type: "name",
              name: "区域",
              width: "25%"
            },
            {
              type: "now",
              name: "总数",
              width: "25%"
            },
            {
              type: "same",
              name: "新增数",
              width: "25%"
            },
            {
              type: "add",
              name: "净增数",
              width: "25%"
            }
          ],
          dataItem: [
            {
              name: "大悟县",
              now: "2097.34",
              same: "2097.34",
              add: "9.6%"
            },
            {
              name: "汉川",
              now: "2097.34",
              same: "2097.34",
              add: "9.6%"
            },
            {
              name: "云梦县",
              now: "2097.34",
              same: "2097.34",
              add: "9.6%"
            },
            {
              name: "孝南区",
              now: "2097.34",
              same: "2097.34",
              add: "9.6%"
            },
            {
              name: "应城市",
              now: "2097.34",
              same: "2097.34",
              add: "9.6%"
            },
            {
              name: "孝昌县",
              now: "2097.34",
              same: "2097.34",
              add: "9.6%"
            },
            {
              name: "市本级",
              now: "2097.34",
              same: "2097.34",
              add: "9.6%"
            },
            {
              name: "孝感",
              now: "2097.34",
              same: "2097.34",
              add: "9.6%"
            }
          ]
        }
      };
    }
  };
</script>
<style type="text/less" lang="less">
  .tableTest > .geo-table > .geo-table-body {
    margin-top: 0 !important;
  }

  .tableTest > .geo-table > .geo-table-header {
    border: 1px solid #355f83;
    border-bottom: 2px solid #527ca8;
  }

  .tableTest > .geo-table > .geo-table-body {
    border: 1px solid #355f83;
    border-top: none;
  }
</style>
