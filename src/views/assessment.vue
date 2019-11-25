<template>
<div class="outer-box">
  <base-header title="评教" />
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>评教</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row type="flex" justify="center">
    <el-col :span="8">
      <el-card shadow="hover">
        <div slot="header"><h3>搜索</h3></div>
        <el-row type="flex" justify="center" align="middle">
            <el-select 
              v-model="college" 
              placeholder="请选择学院"
              clearable
              @change="selectCollege">
              <el-option 
                v-for="(item, index) in collegeOptions"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-button style="margin: 10px"
              type="primary"
              icon="el-icon-search"
              plain                   
              @click="searchData">
            </el-button>
        </el-row>
       
      </el-card>
    </el-col>
  </el-row>
</div>
  
</template>
<script>
import { getVideo } from "@/api/video";
import { getAllColleges } from "@/api/college"
import baseHeader from "@/components/common/baseHeader"
import baseTable from "@/components/common/baseTable"
export default {
  components: {
    "base-header": baseHeader,
    "base-table": baseTable
  },
  data() {
    return {
      college: '',
      collegeOptions: []
    }
  },
  methods: {
    selectCollege() {},
    searchData() {}
  },
  mounted() {
    getAllColleges().then(res => {
      this.collegeOptions = res.data.result
    })
  }
}
</script>
<style lang="less" scoped>
h3 {
  margin: 0;
  color: #409EFF;
}
</style>