<template>
<el-card class="my-college">
  <base-table v-if="show==='table'"
    ref="mytable"
    :loading="tableLoading"
    :tableHeader="tableHeader"
    :tableData="tableData"
    :backPagination="true"
    :pageTotal="pageTotal"
    @sort-change="sortData"
    @search-data="searchCollegeData"
    @update-data="updateCollegeData"
    @add="addCollege"></base-table>
  <!-- <add-college v-else-if="show==='add'"></add-college> -->
</el-card>
</template>

<script>
// import { getCollegeInfo } from '@/api/college'
import baseTable from '@/components/common/baseTable'
import addCollege from '@/components/college/addCollege'
export default {
  components: {
    'base-table': baseTable,
    'add-college': addCollege,
  },
  data() {
    return {
      show: 'table',
      tableLoading: false,
      tableHeader: [
        {
          prop: 'logo',
          label: '校徽',
          width: 100,
          align: 'left',
          sortable: false,
          fit: true,
        },
        {
          prop: 'name',
          label: '学校',
          width: 150,
          align: 'center',
          sortable: false,
          fit: true,
        },
        {
          prop: 'regionName',
          label: '区域',
          width: 150,
          align: 'center',
          sortable: false,
          fit: true,
        },
        {
          prop: 'detailAddress',
          label: '地址',
          width: 250,
          align: 'center',
          sortable: false,
          fit: true,
        },
        {
          prop: 'contactsName',
          label: '联系人',
          width: 150,
          align: 'center',
          sortable: false,
          fit: true,
        },
        {
          prop: 'contactsPhone',
          label: '联系电话',
          width: 150,
          align: 'center',
          sortable: false,
          fit: true,
        },
        {
          prop: 'edit',
          label: '编辑',
          width: 100,
          'header-align': 'center',
          align: 'center',
          sortable: false,
          fit: true,
        }
      ],
      tableData: [],
      pageTotal: 0,

    }
  },
  methods: {
    getCollegeData() {
      // getCollegeInfo(this.searchString, this.$refs.mytable.pageSize, this.$refs.mytable.currentPage).then(res => {
      //   this.tableData = res.data.result.rows
      //   this.pageTotal = res.data.result.total
      // })
    },
    sortData() {

    },
    searchCollegeData(val) {
      // getCollegeInfo(val, this.$refs.mytable.pageSize, 1).then(res => {
      //   this.tableData = res.data.result.rows
      //   this.pageTotal = res.data.result.total
      // })
    },
    updateCollegeData() {
      // this.getCollegeData()
    },
    addCollege() {
      this.show = 'add'
    }
  },
  mounted() {
    // this.getCollegeData()
  }
  
}
</script>

<style lang="less" scoped>

</style>
