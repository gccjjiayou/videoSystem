<template>
  <div class="outer-box">
    <base-header title="视频"></base-header>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>视频</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="18">
        <video-searchbar
          ref="searchbar"
          @search-data="getSearchData"
          @select-college="getSelectData"
          @select-classroom="getSelectData"
          @select-teacher="getSelectData"
          @select-course="getSelectData"
          @select-class="getSelectData"
          @select-grade="getSelectData"
        ></video-searchbar>   
        <section v-for="(item, index) in videoData" :key="index" class="video-info">
          <div class="left">
            <img :src="item.coverPicUrl || defaultImg" alt width="160px" height="100px">
          </div>
          <div class="right">
            <div class="head-info">
              <router-link
                target="_blank"
                style="text-decoration: none;"
                :to="{name: 'videoDetail', params: {videoId: item.videoId}}"
              >{{item.videoTitle}}</router-link>
              <span>{{item.uploadTime}}</span>
            </div>
            <div class="icon-info">
              <div class="icon">
                <i class="iconfont icon-bofangliang"></i>
                <span style="margin-left: 5px;">{{item.clickNum}}</span>
              </div>
              <div style="width: 90px" class="icon">
                <i class="iconfont icon-pingfen"></i>
                <span style="margin-left: 5px;">{{item.rank}}</span>
              </div>
              <a style="text-decoration: none;" :href="item.videoUrl" download>
                <i class="el-icon-download"></i>
                <span style="margin-left: 5px;">{{parseFloat(item.size / 1048576).toFixed(2)}}MB</span>
              </a>
              
            </div>
          </div>
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
      </el-col>
      <el-col :span="6">
        <video-hotlist :collegeId="college"></video-hotlist>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getVideo } from "@/api/video";
import videoSearchbar from "@/components/video/videoSearchbar";
import videoHotList from "@/components/video/videoHotList";
import baseHeader from "@/components/common/baseHeader"
export default {
  components: {
    "video-searchbar": videoSearchbar,
    "video-hotlist": videoHotList,
    "base-header": baseHeader
  },
  data() {
    return {
      defaultImg: require("@/assets/img/default-img.jpg"),
      searchString: "",
      sortType: 1, // 排序类型，1按时间排序，2按热度排序，3按评分排序
      sortOrientation: 1, // 排序方向，1按正序排序，2按逆序排序
      timeSortOrientation: -1,
      hotSortOrientation: -1,
      rankSortOrientation: -1,
      total: 0,
      pageSize: 4,
      pageSizes: [1, 2, 3, 4],
      currentPage: 1,
      videoData: []
    };
  },
  computed: {
    college() {
      return this.$store.state.admin.college;
    },
    classroom() {
      return this.$store.state.admin.classroom;
    },
    teacher() {
      return this.$store.state.admin.teacher;
    },
    course() {
      return this.$store.state.admin.course;
    },
    grade() {
      return this.$store.state.admin.grade
    }
  },
  methods: {
    searchVideo() {
      getVideo(
        this.sortType,
        this.sortOrientation,
        this.pageSize,
        this.currentPage,
        this.college,
        this.classroom,
        this.course,
        this.teacher,
        this.searchString,
        this.grade        
      ).then(res => {
        this.videoData = res.data.result.rows;
        this.total = res.data.result.total;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchVideo();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchVideo();
    },
    sortByUploadTime() {
      this.sortType = 1;
      this.timeSortOrientation = (this.timeSortOrientation + 1) % 2;
      this.sortOrientation = this.timeSortOrientation + 1;
      this.searchVideo();
    },
    sortByClickNum() {
      this.sortType = 2;
      this.hotSortOrientation = (this.hotSortOrientation + 1) % 2;
      this.sortOrientation = this.hotSortOrientation + 1;
      this.searchVideo();
    },
    sortByRank() {
      this.sortType = 3;
      this.rankSortOrientation = (this.rankSortOrientation + 1) % 2;
      this.sortOrientation = this.rankSortOrientation + 1;
      this.searchVideo();
    },
    getSearchData() {
      this.searchString = this.$refs.searchbar.searchString;
      this.currentPage = 1;
      this.searchVideo();
    },
    getSelectData() {
      this.currentPage = 1;
      this.searchVideo();
    }
  },
  mounted() {
    this.searchVideo();
    console.log('cookie: ', window.document.cookie);
  }
};
</script>

<style lang="less" scoped>
.my-search {
  margin: 50px auto;
  width: 500px;
}
.el-col {
  padding-left: 20px;
}
.video-info {
  display: flex;
  margin-top: 20px;
}
.video-info:hover {
  border-radius: 5px;
  background: #ecf5ff;
}
.left {
  margin-right: 30px;
}
.right {
  border-bottom: 1px solid #e5e9ef;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 190px);
}
.head-info {
  display: flex;
}
.icon-info {
  display: flex;
}
.icon {
  width: 90px;
}
</style>