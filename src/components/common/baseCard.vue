<template>
  <div>
    <el-card v-if="this.showSearch === true" class="my-search">
      <div slot="header">
        <span>根据条件查询视频</span>
      </div>
      <el-form ref="searchForm" label-width="80px">
        <el-form-item label="学校">
          <el-select v-model="school" placeholder="请选择学校">
            <el-option 
              v-for="item in schoolOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教室">
          <el-select v-model="classroom" placeholder="请选择教室">
            <el-option
              v-for="item in classroomOptions"
              :key="item.id"
              :label="item.roomCode"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教师">
          <el-select v-model="teacher" placeholder="请选择教师">
            <el-option
              v-for="item in teacherOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程">
          <el-select v-model="course" placeholder="请选择课程">
            <el-option
              v-for="item in courseOptions"
              :key="item.cid"
              :label="item.name"
              :value="item.cid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button @click="resetForm('searchForm')">取消</el-button>
          <el-button type="primary" @click="searchVideo">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div v-else class="my-video">
      <el-row>
        <el-col :span="18">
          <el-card  shadow="hover">
            <div slot="header">
              <el-row>
                <el-col :span="16">
                  <el-button type="text" size="medium" @click="sortByUploadTime">按上传时间排序</el-button>
                  <el-button type="text" size="medium" @click="sortByClickNum">按视频热度排序</el-button>
                  <el-button type="text" size="medium" @click="sortByRank">按评分排序</el-button>
                </el-col>
                <el-col :span="8">
                  <el-input style="width: 200px;" 
                    v-model="searchString" 
                    placeholder="请输入视频名" 
                    clearable
                    @keyup.enter.native="getSearchData"></el-input>
                  <el-button
                    icon="el-icon-search"
                    plain                   
                    @click="getSearchData"></el-button>
                </el-col>
              </el-row>
              
              
            </div>
            <template v-for="(item, index) in showData">
              <section :key="index" class="video-info">
                <div class="left">
                  <img :src="item.coverPicUrl" alt="" width="160px" height="100px">
                </div>
                <div class="right">
                  <div class="head-info">
                    <a style="text-decoration: none;" href="#">{{item.videoTitle}}</a>
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
                  </div>
                </div>

              </section>
            </template>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <h4>热门</h4>
            <template v-for="(item, index) in hotVideoData">
              <section :key="index" class="hot-video-info">
                <el-row>
                  <el-col :span="10">
                    <i :style="[index < 3? top3Background : restBackground, rankNum]">{{index + 1}}</i>   
                  </el-col>
                  <el-col :span="14">
                    <img :src="item.url" alt="">
                  </el-col>
                </el-row>
              </section>
            </template>
          </el-card>
        </el-col>
      </el-row>
      
    </div>
  </div>
</template>

<script>
import { getAllSchools, getAllTeachers, getAllClassroom, getAllCourse, getVideoInfo } from '@/api/video'
export default {
  data() {
    return {
      showSearch: true,
      school: '',
      classroom: '',
      teacher: '',   
      course: '',
      schoolOptions: [],
      classroomOptions: [],
      teacherOptions: [],
      courseOptions: [],
      total: 0,
      videoData: [],
      showData: [],
      hotVideoData: [
        { url: require('../assets/img/hotVideo/list1.jpg'),
          description: '那时, 他才15岁。即使现在, 也只不过才16岁。但重重压在他身上的现实, 却总是比他的躯体更巨大 内心满怀期待, 希望结交许多好朋友的七美开始了高中的生活。据说班中有三分之二的女生都喜欢',
          play: '6.6万',
          collect: '177'
        },
        { url: require('../assets/img/hotVideo/list2.jpg'),
          description: '某科学の补档 字幕为华盟的简体版 感谢字幕组制作的字幕 中世纪，人类与魔族持续着征战。某日，拥有着强大力量的“勇者”闯入了魔王的城堡，为了拯救人类世界而向魔王挑战。等着他的却是',
          play: '3.0万',
          collect: '1128'

        },
        { url: require('../assets/img/hotVideo/list3.jpg'),
          description: '感谢枫叶字幕组译制。 在人类与风共同生活的城市 「风来城」，每年会举行一年一度的「风节」。在「风节」的最后一天，传说的宝可梦洛奇亚会现身，为人类送上「恩惠之风」。这是人类',
          play: '1.8万',
          collect: '742'
        },
        { url: require('../assets/img/hotVideo/list4.jpg'),
          description: '直传 人与风共同生活的都市·风来城， 正在举办一年一度的"风节"。 根据自古流传至今的传说， 祭典最后一天传说中的宝可梦·洛奇亚将会现身， 为人们带来恩惠之风。 封面https://www.pixiv.net/m',
          play: '1.5万',
          collect: '649'
        },
        { url: require('../assets/img/hotVideo/list5.jpg'),
          description: '来源网络 来源网络 感谢VRAINSTORM字幕组',
          play: '1.3万',
          collect: '308'
        },
        { url: require('../assets/img/hotVideo/list6.jpg'),
          description: '感谢@hungry小浩纸 的片源，92版OVA请关注小浩纸 翻译：Augustus·Xzavier；时间轴：起名费劲太郎 森田真法漫画改',
          play: '9127',
          collect: '187'
        },
         { url: require('../assets/img/hotVideo/list1.jpg'),
          description: '那时, 他才15岁。即使现在, 也只不过才16岁。但重重压在他身上的现实, 却总是比他的躯体更巨大 内心满怀期待, 希望结交许多好朋友的七美开始了高中的生活。据说班中有三分之二的女生都喜欢',
          play: '6.6万',
          collect: '177'
        },
        { url: require('../assets/img/hotVideo/list2.jpg'),
          description: '某科学の补档 字幕为华盟的简体版 感谢字幕组制作的字幕 中世纪，人类与魔族持续着征战。某日，拥有着强大力量的“勇者”闯入了魔王的城堡，为了拯救人类世界而向魔王挑战。等着他的却是',
          play: '3.0万',
          collect: '1128'

        },
        { url: require('../assets/img/hotVideo/list3.jpg'),
          description: '感谢枫叶字幕组译制。 在人类与风共同生活的城市 「风来城」，每年会举行一年一度的「风节」。在「风节」的最后一天，传说的宝可梦洛奇亚会现身，为人类送上「恩惠之风」。这是人类',
          play: '1.8万',
          collect: '742'
        },
        { url: require('../assets/img/hotVideo/list4.jpg'),
          description: '直传 人与风共同生活的都市·风来城， 正在举办一年一度的"风节"。 根据自古流传至今的传说， 祭典最后一天传说中的宝可梦·洛奇亚将会现身， 为人们带来恩惠之风。 封面https://www.pixiv.net/m',
          play: '1.5万',
          collect: '649'
        },
      ],
      currentPage: 1,
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
      sortType: 1,  // 排序类型，1按时间排序，2按热度排序，3按评分排序
      sortOrientation: 1,  // 排序方向，1按正序排序，2按逆序排序
    }
   
  },
  methods: {
    searchVideo() {
      this.showSearch = false
      let searchForm = {
        school: this.school,
        classroom: this.classroom,
        teacher: this.teacher,
        course: this.course
      }
      getVideoInfo(this.sortType, this.sortOrientation, null, null, searchForm, this.searchString).then(res => {
        this.videoData = res.data.result.rows
        console.log(this.videoData)
        // let data = res.data.result.rows
        // data.forEach(item => {
        //   let obj = item
        //   if(obj.coverPicUrl === '') {
        //     obj.coverPicUrl = '@/assets/img/list/no-image.jpg'
        //     this.videoData.push(obj)
        //   } else {
        //     this.videoData.push(item)
        //   }
        //   console.log(this.videoData)
        // })
        this.showData = this.videoData
        this.total = this.showData.length
      })
      
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    sortByUploadTime() {
      this.sortType = 1
      this.searchVideo()
    },
    sortByClickNum() {
      this.sortType = 2
      this.searchVideo()
    },
    sortByRank() {
      this.sortType = 3
      this.searchVideo()
    },
    getSearchData() {
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
    },
    teacher: function(val, oldVal) {
      getAllCourse(val).then(res => {
        this.courseOptions = res.data.result
      })
    }
  
  },
  mounted() { 
    getAllSchools().then(res => {
      this.schoolOptions = res.data.result
    })
  }
  
}
</script>

<style lang="less" scoped>
.my-search {
  margin: 50px auto;
  width: 500px;
}

span {
  color: #27a;
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
.hot-video-info {
  display: flex;
  // justify-content: space-between;
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
</style>
