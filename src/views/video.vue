<template> 
  <div class="my-video">
    <el-row>
      <el-col :span="18">
        <el-card  shadow="hover" class="mycard">
          <div slot="header">
            <el-input style="width: 730px;" 
                v-model="searchString" 
                placeholder="请输入视频名" 
                clearable
                @keyup.enter.native="getSearchData"></el-input>
            <el-button style="margin: 10px"
              icon="el-icon-search"
              plain                   
              @click="getSearchData"></el-button>
            <el-form class="choose-condition">            
              <el-form-item>
                <el-row :gutter="10">
                  <el-col :span="6">
                    <el-select 
                      v-model="school" 
                      placeholder="请选择学校"
                      clearable
                      @change="chooseSchoolSearch">
                      <el-option 
                        v-for="item in schoolOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="6">
                    <el-select 
                      v-model="classroom" 
                      placeholder="教室"
                      clearable
                      @change="chooseClassroomSearch">
                      <el-option 
                        v-for="item in classroomOptions"
                        :key="item.id"
                        :label="item.roomCode"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="6">
                    <el-select 
                      v-model="teacher" 
                      placeholder="教师"
                      clearable
                      @change="chooseTeacherSearch">
                      <el-option
                        v-for="item in teacherOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="6">
                    <el-select 
                      v-model="course" 
                      placeholder="课程"
                      clearable
                      @change="chooseCourseSearch">
                      <el-option
                        v-for="item in courseOptions"
                        :key="item.cid"
                        :label="item.name"
                        :value="item.cid"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form> 
            <el-row>              
              <span>排序：</span>
              <el-button type="text" size="medium" @click="sortByUploadTime">时间</el-button>
              <el-button type="text" size="medium" @click="sortByClickNum">热度</el-button>
              <el-button type="text" size="medium" @click="sortByRank">评分</el-button>
            </el-row>          
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
                  </a>{{parseFloat(item.size / 1048576).toFixed(2)}}mb       
                </div>
              </div>
            </section>
          </template>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 2, 5, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>          
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{padding: '10px'}">
          <h4>热门</h4>
          <div v-for="(item, index) in hotVideoData" :key="index"  class="hot-video-info">
            <div class="hot-left">
              <i :style="[index < 3? top3Background : restBackground, rankNum]">{{index + 1}}</i>              
            </div>
            <div class="hot-middle">
              <img :src="item.coverPicUrl || defaultImg" alt="" width="80px" height="50px">
            </div>
            <div class="hot-right">       
              <router-link target="_blank" style="text-decoration: none;" :to="{name: 'videoDetail', params: {videoId: item.videoId}}">{{item.videoTitle}}</router-link>
              <div class="icon-info">
                <div class="icon">
                  <img src="@/assets/img/list/play.jpg" alt="">
                  <span>{{item.clickNum}}</span>
                </div>
                <div class="icon">
                  <img src="@/assets/img/list/rank.jpg" alt="">
                  <span>{{item.rank}}</span>
                </div>               
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>   
  </div>
</template>

<script>
import { getAllSchools, getAllTeachers, getAllClassroom, getAllCourse, getVideoInfo, getHotVideos } from '@/api/video'
export default {
  data() {
    return {
      defaultImg: require('@/assets/img/list/default-img.jpg'),
      school: '',
      classroom: '',
      teacher: '',   
      course: '',
      schoolOptions: [],
      classroomOptions: [],
      teacherOptions: [],
      courseOptions: [],
      chooseCondition: [],
      sortType: 1,  // 排序类型，1按时间排序，2按热度排序，3按评分排序
      sortOrientation: 1,  // 排序方向，1按正序排序，2按逆序排序
      timeSortOrientation: -1,  
      hotSortOrientation: -1,
      rankSortOrientation: -1,
      total: 0,
      pageSize: 2,   
      currentPage: 1, 
      videoData: [],
      hotVideoData: [],
      searchString: '',
      rankNum: {
        color: '#fff',
        height: '18px',
        'line-height': '18px',
        'font-size': '12px',
        'text-align': 'center',
        'border-radius': '4px',
        padding: '0 5px',
        'font-weight': 'bolder',
        'font-style': 'normal',   
      },
      top3Background: {
        'background-color': '#ff0d29',
      },
      restBackground: {
        'background-color': '#b8c0cc'
      },
    
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
      this.currentPage = 1
      this.searchVideo()
    },
    chooseSchoolSearch(val) {
      this.school = val
      this.currentPage = 1
      this.searchVideo()
    },
    chooseClassroomSearch(val) {
      this.classroom = val
      this.currentPage = 1
      this.searchVideo()
    },
    chooseTeacherSearch(val) {
      this.teacher = val
      this.currentPage = 1
      this.searchVideo()
    },
    chooseCourseSearch(val) {
      this.course = val
      this.currentPage = 1
      this.searchVideo()
    }
  },
  watch: {
    school: function(val, oldVal) {
      getAllTeachers(val).then(res => {
        this.teacherOptions = res.data.result
      })
      getAllClassroom(val).then(res => {
        this.classroomOptions = res.data.result
      })
      getHotVideos(this.school).then(res => {
        this.hotVideoData = res.data.result
      })
    },
    teacher: function(val, oldVal) {
      getAllCourse(val).then(res => {
        this.courseOptions = res.data.result
      })
    }
  
  },
  mounted() { 
    this.searchVideo()
    getAllSchools().then(res => {
      this.schoolOptions = res.data.result
    })
    getHotVideos().then(res => {
      this.hotVideoData = res.data.result
    })
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
.show-choose {
  padding: 10px;
  background: #f3faff;
}
.choose-condition {
  border-top: 1px solid #ddd;
  padding: 10px;
  background: #f7f7f7;
}
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
.rank-top3 {
  color: #fff;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  min-width: 12px;
  text-align: center;
  background-color: #b8c0cc;
  border-radius: 4px;
  padding: 0 3px;
  font-weight: bolder;
  font-style: normal;
}
.rank-rest {
  color: #fff;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  min-width: 12px;
  text-align: center;
  background-color: #f25d8e;
  border-radius: 4px;
  padding: 0 3px;
  font-weight: bolder;
  font-style: normal;
}
.hot-video-info {
  display: flex;
  font-size: 12px;
}
.hot-left {
  margin-right: 10px;
}
.hot-middle {
  margin-right: 20px;
}
.hot-right {
  border-bottom: 1px solid #e5e9ef;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

<style>
/* .mycard.el-card__header {
  padding: 0 20px !important;
} */

</style>

