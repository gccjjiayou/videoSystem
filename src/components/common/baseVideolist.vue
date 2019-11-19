<template>
<div class="outer-box">
  <section v-for="(item, index) in videoData" 
    :key="index">
    <template v-if="page==='video'">
      <el-row type="flex" justify="center">
        <el-col :span="6"></el-col>
        <el-col :span="12"></el-col>
      </el-row>
    </template>
    <template v-else>
      <el-row type="flex" align="middle">
        <el-col :span="4" :push="4">{{ item.rank }}</el-col>
        <el-col :span="5" :push="1"><img :src="item.coverPicUrl || defaultImg" alt width="160px" height="100px" /></el-col>
        <el-col :span="9">
          <div class="desc-wrapper">
            <div>123</div>
            <div>456</div>
            <!-- <el-row>
              <el-col>
                <router-link
                  target="_blank"
                  style="text-decoration: none;"
                  :to="{name: 'videoDetail', params: {videoId: item.videoId}}">{{item.videoTitle}}</router-link></el-col>
              <el-col>{{ item.uploadTime }}</el-col>
            </el-row>
            <el-row type="flex" align="middle">
              <el-col><i class="iconfont icon-bofangliang"></i>{{ item.clickNum }}</el-col>
              <el-col><i class="iconfont icon-pingfen"></i>{{ item.rank }}</el-col>
              <el-col><i class="el-icon-download"></i>{{parseFloat(item.size / 1048576).toFixed(2)}}MB</el-col>
            </el-row> -->
          </div>
        </el-col>
        <el-col :span="6">{{ item.score }}</el-col>
      </el-row>
    </template>
  </section>
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
    videoData: {
      type: Array,
      required: true
    },
    page: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 1,
      pageSizes: [1, 2, 5, 10],
      total: 0
    }
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>
<style lang="less" scopeed>
.desc-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>