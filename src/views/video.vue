<template> 
  <div class="my-video">
    <el-row>
      <el-col :span="18">
        <el-card  shadow="hover" class="mycard">
          <div slot="header">
            <video-searchbar ref="searchbar"
              @search-data="getSearchData"
              @select-school="getSelectData"
              @select-classroom="getSelectData"
              @select-teacher="getSelectData"
              @select-course="getSelectData"></video-searchbar>         
          </div>
          <template v-for="(item, index) in videoData">
            <section :key="index" class="video-info">
              <div class="left">
                <img :src="item.coverPicUrl || defaultImg" alt="" width="160px" height="100px">
              </div>
              <div class="right">
                <div class="head-info">
                  <router-link target="_blank" style="text-decoration: none;" :to="{name: 'videoDetail', params: {videoId: item.videoId}}">{{item.videoTitle}}</router-link>
                  <span>{{item.uploadTime}}</span>
                </div>
                <div class="icon-info">
                  <div class="icon">
                    <img src="@/assets/img/list/play.jpg" alt="">
                    <span>{{item.clickNum}}</span>
                  </div>
                  <div class="icon">
                    <img src="@/assets/img/list/rank.jpg" alt="">
                    <span>{{item.rank}}</span>
                  </div>
                  <a style="text-decoration" :href="item.videoUrl">
                    <i class="el-icon-download"></i>
                  </a>{{parseFloat(item.size / 1048576).toFixed(2)}}MB
                </div>
              </div>
            </section>
          </template>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>          
        </el-card>
      </el-col>
      <el-col :span="6">
        <video-hotlist :schoolId="school"></video-hotlist>
      </el-col>
    </el-row>   
  </div>
</template>

<script>
import {  getVideoInfo } from '@/api/video'
import videoSearchbar from "@/components/video/videoSearchbar"
import videoHotList from "@/components/video/videoHotList"
export default {
  components: {
    "video-searchbar": videoSearchbar,
    "video-hotlist": videoHotList,
  },
  data() {
    return {
      defaultImg: require('@/assets/img/list/default-img.jpg'),
      searchString: '',
      sortType: 1,  // 排序类型，1按时间排序，2按热度排序，3按评分排序
      sortOrientation: 1,  // 排序方向，1按正序排序，2按逆序排序
      timeSortOrientation: -1,  
      hotSortOrientation: -1,
      rankSortOrientation: -1,
      total: 0,
      pageSize: 2, 
      pageSizes: [1, 2, 5, 30, 40], 
      currentPage: 1, 
      videoData: [],
    }  
  },
  methods: {
    searchVideo() {
      getVideoInfo(this.sortType, this.sortOrientation, this.pageSize, this.currentPage, this.school, this.classroom, this.teacher, this.course, this.searchString).then(res => {
        this.videoData = res.data.result.rows
        this.total = res.data.result.total
      })   
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.searchVideo()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.searchVideo()
    },
    sortByUploadTime() {
      this.sortType = 1
      this.timeSortOrientation = (this.timeSortOrientation + 1) % 2
      this.sortOrientation = this.timeSortOrientation + 1
      this.searchVideo()
    },
    sortByClickNum() {
      this.sortType = 2
      this.hotSortOrientation = (this.hotSortOrientation + 1) % 2
      this.sortOrientation = this.hotSortOrientation + 1
      this.searchVideo()
    },
    sortByRank() {
      this.sortType = 3
      this.rankSortOrientation = (this.rankSortOrientation + 1) % 2
      this.sortOrientation = this.rankSortOrientation + 1
      this.searchVideo()
    },
    getSearchData() {
      this.searchString = this.$refs.searchbar.searchString
      this.currentPage = 1
      this.searchVideo()
    },
    getSelectData() {
      this.currentPage = 1
      this.searchVideo()
    },
  },
  computed: {
    school() {
      return this.$store.state.superAdmin.school
    },
    classroom() {
      return this.$store.state.superAdmin.classroom
    },
    teacher() {
      return this.$store.state.superAdmin.teacher
    },
    course() {
      return this.$store.state.superAdmin.course
    }
  },
  mounted() { 
    this.searchVideo()
  }
  
}
</script>

<style lang="less" scoped>
.my-search {
  margin: 50px auto;
  width: 500px;
}
// span {
//   color: #27a;
// }
.video-info {
  display: flex;  
  margin-bottom: 20px;
}
.left {
  margin-right: 20px;
}
.right {
  border-bottom: 1px solid #e5e9ef;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 180px);
}
.head-info {
  display: flex;
  justify-content: space-between;
}
.icon-info {
  display: flex;
}
.icon {
  width: 70px;
}
</style>