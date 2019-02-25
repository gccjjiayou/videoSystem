<template>
<el-card class="my-school">
  <base-table v-if="show==='table'"
    ref="mytable"
    :loading="tableLoading"
    :tableHeader="tableHeader"
    :tableData="tableData"
    :backPagination="true"
    :pageTotal="pageTotal"
    @sort-change="sortData"
    @search-data="searchSchoolData"
    @update-data="updateSchoolData"
    @add="addSchool"></base-table>
  <!-- <add-school v-else-if="show==='add'"></add-school> -->
</el-card>
</template>

<script>
import { getSchoolInfo } from '@/api/school'
import baseTable from '@/components/common/baseTable'
import addSchool from '@/components/school/addSchool'
export default {
  components: {
    'base-table': baseTable,
    'add-school': addSchool,
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
    getSchoolData() {
      getSchoolInfo(this.searchString, this.$refs.mytable.pageSize, this.$refs.mytable.currentPage).then(res => {
        this.tableData = res.data.result.rows
        this.pageTotal = res.data.result.total
      })
    },
    sortData() {

    },
    searchSchoolData(val) {
      getSchoolInfo(val, this.$refs.mytable.pageSize, 1).then(res => {
        this.tableData = res.data.result.rows
        this.pageTotal = res.data.result.total
      })
    },
    updateSchoolData() {
      this.getSchoolData()
    },
    addSchool() {
      this.show = 'add'
    }
  },
  mounted() {
    this.getSchoolData()
  }
  
}
</script>

<style lang="less" scoped>

</style>
