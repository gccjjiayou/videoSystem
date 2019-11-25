<template>
<div class="outer-box">
  <base-header title="排行榜" />
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>排行榜</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="12">
      <el-card shadow="hover">
        <div slot="header"><h3>搜索</h3></div>
        <el-row type="flex" justify="center" align="middle">
          <el-col :span="11">
            <el-select 
              v-model="college" 
              placeholder="请选择学院"
              clearable
              @change="selectCollege">
              <el-option 
                v-for="(item, index) in collegeOptions"
                :key="index"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
            <el-button style="margin: 10px"
              type="primary"
              icon="el-icon-search"
              plain                   
              @click="searchData"></el-button>
          </el-col>
          <el-col :span="3"><i class="iconfont icon-wf_quanwangbofangliangshi"></i>热播榜</el-col>
          <el-col :span="3"><i class="iconfont icon-zan"></i>评教榜</el-col>
          <el-col :span="3"><i class="iconfont icon-icon_paiming"></i>下载榜</el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
  <base-table 
    :tableData="tableData"
    :tableHeader="tableHeader"/>
</div>
</template>
<script>
import { getVideo } from "@/api/video";
import { getAllColleges } from "@/api/college"
import baseHeader from "@/components/common/baseHeader"
import baseTable from "@/components/common/baseTable"
export default {
  name: "rank",
  components: {
    "base-header": baseHeader,
    "base-table": baseTable
  },
  data() {
    return {
      tableHeader: [
        { prop: 'rank', label: '排名', width: '100'},
        { prop: 'title', label: '视频名', width: '350', align: 'left', link: "/video/videoDetail/", param: 'videoId'},
        { prop: 'teacher', label: '教师', align: 'left'},
        { prop: 'score', label: '分数', width: '160'}
      ],
      tableData: [
        { videoId: 186, rank: '1', title: '少年的你', teacher: '李老师', score: '100'},
        { videoId: 187, rank: '2', title: '烈火英雄', teacher: '王老师', score: '99'}
      ],
      total: '',
      collegeOptions: [],
      college: ''
    }
  },
  methods: {
    selectCollege() {},
    searchData() {}
  },
  mounted() {
    getVideo(
        null,
        null,
        this.pageSize,
        this.currentPage,
        null,
        null,
        null,
        null,
        null,
        null        
      ).then(res => {
        // this.tableData = res.data.result.rows;
        this.total = res.data.result.total;
      });
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
.table-box {
  width: 95%;
  margin: 0 auto;
}
.icon-wf_quanwangbofangliangshi {
  font-size: 30px;
  color: #B0E2FF;
}
.icon-zan {
  font-size: 30px;
  color: #ffafc9;
}
.icon-icon_paiming {
  font-size: 30px;
}
</style>