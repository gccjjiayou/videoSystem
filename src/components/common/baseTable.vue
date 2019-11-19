<template>
<div class="outer-box">
  <el-table
    :data="tableData"
    stripe>
    <el-table-column v-for="(item, index) in tableHeader"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      :align="item.align || 'center'">
        <template slot-scope="scope">
          <router-link v-if="item.link" :to="item.link + scope.row[item.param]">
            {{scope.row[item.prop]}}
          </router-link>
          <template v-else>{{scope.row[item.prop]}}</template>
        </template>
      </el-table-column>  
  </el-table>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  ></el-pagination>
</div>
  
</template>
<script>
export default {
  props: {
    tableHeader: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSizes: [1, 2, 5, 10],
      pageSize: 2,
      total: 0
    }
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
}
</script>
<style lang="less" scoped>
.outer-box {
  width: 95%;
  margin: 0 auto;
  padding: 20px 0;
  a {
    color: #2B8A97;
  }
}
</style>