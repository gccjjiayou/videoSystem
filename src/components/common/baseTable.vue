<template>
<div class="base-table">
  <el-card shadow="hover">
    <el-row type="flex"  align="middle">
      <el-col :span="16">
        <el-button plain @click="add"><i class="el-icon-plus"></i>添加学校</el-button>
      </el-col>
      <el-col :span="8">
        <el-input style="width: 240px"
          v-model="searchString" 
          placeholder="请输入" 
          clearable
          @keyup.enter.native="searchData"></el-input>
        <el-button style="margin: 10px"
          icon="el-icon-search"
          plain                   
          @click="searchData"></el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-table
    v-loading="loading"
    :data="currentData"
    @sort-change="sortChange">
    <template v-for="(item, index) in tableHeader">
      <el-table-column v-if="item.prop==='logo' || item.prop==='edit'"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :sortable="item.sortable">
        <template slot-scope="scope">
          <img v-if="item.prop==='logo'" :src="scope.row.logo" width="35px" height="35px" alt="">
          <el-button v-else size="mini" round @click="editDetail(scope.row.collegeId)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column v-else
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align || center"
        show-overflow-tooltip
        :sortable="item.sortable">
      </el-table-column>
    </template>
  </el-table>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</div> 
</template>

<script>
export default {
  props: {
    /* 表格数据源 */
    tableData: { type: Array, default: () => new Array() },
    /* 表头 */
    tableHeader: {type: Array, default: () => new Array() },
    /* 是否后端分页 */
    backPagination: { type: Boolean, default: () => new Array() },
    /* 若后端分页，传入总数据量 */
    pageTotal: { type: Number, default: 0},
    /* 控制表格内容loading */
  },
  data() {
    return {
      loading: false,
      searchString: '',
      currentPage: 1,
      pageSizes: [1, 2, 5, 10, 20],
      pageSize: 2,
    }
  },
  computed: {
    hasData(){
      return !!this.tableData;
    },
    total(){
      if(this.backPagination) return this.pageTotal || 0;
      if(!this.hasData) return 0;
      return this.tableData.length;
    },
    currentData(){
      if(!this.hasData) return [];
      if(this.backPagination) return this.tableData;
      //前端分页，计算当前要显示的数据
      let startIndex = (this.currentPage-1)*this.pageSize;
      return this.tableData.slice(startIndex,startIndex+this.pageSize);
    }
  },
  methods: {
    add() {
      this.$emit('add')
    },
    searchData() {
      this.$emit('search-data', this.searchString)
    },
    handleSizeChange(val) {
      this.pageSize = val
      if(this.backPagination) {
        this.$emit('update-data', this.currentPage, this.pageSize)
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      if(this.backPagination) {
        this.$emit('update-data', this.currentPage, this.pageSize)
      }
    },
    sortChange(val) {
      // val: { column:{}, prop: '列名', order: '顺序'}
      if(this.backPagination) {
        // 后端排序就要多另外两个参数：当前的页面和页面大小
        this.$emit('sort-change', val.prop, val.order, this.currentPage, this.pageSize)
      } else {
        // 前端排序只要两个参数：列的属性和排序方式
        this.$emit('sort-change', val.prop, val.order)
      }
    }
  }
  
}
</script>

<style lang="less" scoped>

</style>
