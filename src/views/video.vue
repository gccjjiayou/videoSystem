<template>
  <div>
    <el-card v-if="this.showSearch === true" class="my-search">
      <div slot="header">
        <span>根据条件查询视频</span>
      </div>
      <el-form ref="searchForm" :model="searchForm" label-width="80px">
        <el-form-item label="学校">
          <el-select v-model="searchForm.school" placeholder="请选择学校">
            <el-option 
              v-for="item in schoolOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教室">
          <el-select v-model="searchForm.classroom" placeholder="请选择教室">
            <el-option
              v-for="item in classroomOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教师">
          <el-select v-model="searchForm.user" placeholder="请选择教师">
            <el-option
              v-for="item in userOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频名称">
          <el-select v-model="searchForm.videoTitle" placeholder="请选择视频名称">
            <el-option
              v-for="item in videoTitleOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id"></el-option>
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
                  <el-button type="text" size="medium">发布时间排序</el-button>
                  <el-button type="text" size="medium">视频热度排序</el-button>
                </el-col>
                <el-col :span="8">
                  <el-input style="width: 200px;" 
                    v-model="searchString" 
                    placeholder="请输入视频名" 
                    @keyup.enter.native="getSearchVideo"></el-input>
                  <el-button
                    icon="el-icon-search"
                    plain
                    clearable
                    @click="getSearchVideo"></el-button>
                </el-col>
              </el-row>
              
              
            </div>
            <template v-for="(item, index) in videoData">
              <section :key="index" class="video-info">
                <div class="left">
                  <img :src="item.url" alt="">
                </div>
                <div class="right">
                  <div class="head-info">
                    <a href="#">{{item.name}}</a>
                    <span>{{item.date}}</span>
                  </div>
                  <p>{{item.description}}</p>
                  <div class="icon-info">
                    <div class="icon">
                      <img src="@/assets/img/list/play.jpg" alt="">
                      <span>{{item.play}}</span>
                    </div>
                    <div class="icon">
                      <img src="@/assets/img/list/collect.jpg" alt="">
                      <span>{{item.collect}}</span>
                    </div>
                  </div>
                </div>

              </section>
            </template>
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSearch: true,
      searchForm: {
        school: '',
        classroom: '',
        user: '',
        videoTitle: '',
      },
      schoolOptions: [
        {
          label: '华中科技大学',
          value: 1,
        },
        {
          label: '武汉大学',
          value: 2,
        },
        {
          label: '武汉理工大学',
          value: 3,
        },
        {
          label: '中国地质大学',
          value: 4,
        }
      ],
      classroomOptions: [
        {
          label: '001',
          value: 1,
        },
        {
          label: '002',
          value: 2,
        },
        {
          label: '003',
          value: 3,
        },
        {
          label: '004',
          value: 4,
        }
      ],
      userOptions: [
        {
          label: '赵老师',
          value: 1,
        },
        {
          label: '王老师',
          value: 2,
        },
        {
          label: '孙老师',
          value: 3,
        },
        {
          label: '李老师',
          value: 4,
        }
      ],
      videoTitleOptions: [
        {
          label: '高级软件工程',
          value: 1,
        },
        {
          label: '高级操作系统',
          value: 2,
        },
        {
          label: '面向对象技术',
          value: 3,
        },
        {
          label: '先进软件开发技术与工具',
          value: 4,
        }
      ],
      total: 0,
      videoData: [
        { 
          name: '【合集】我们的存在',
          date: '2018-12-20 18:06:08',
          url: require('../assets/img/list/list1.jpg'),
          description: '那时, 他才15岁。即使现在, 也只不过才16岁。但重重压在他身上的现实, 却总是比他的躯体更巨大 内心满怀期待, 希望结交许多好朋友的七美开始了高中的生活。据说班中有三分之二的女生都喜欢',
          play: '6.6万',
          collect: '177'
        },
        { 
          name: '【BD1080p】魔王勇者 【华盟字幕组】',
          date: '2018-12-21 10:37:59',
          url: require('../assets/img/list/list2.jpg'),
          description: '某科学の补档 字幕为华盟的简体版 感谢字幕组制作的字幕 中世纪，人类与魔族持续着征战。某日，拥有着强大力量的“勇者”闯入了魔王的城堡，为了拯救人类世界而向魔王挑战。等着他的却是',
          play: '3.0万',
          collect: '1128'

        },
        {
          name: '【BD1080P+/2018剧场版】精灵宝可梦：我们的故事【枫叶】',
          date: '2018-12-21 19:12:36',
          url: require('../assets/img/list/list3.jpg'),
          description: '感谢枫叶字幕组译制。 在人类与风共同生活的城市 「风来城」，每年会举行一年一度的「风节」。在「风节」的最后一天，传说的宝可梦洛奇亚会现身，为人类送上「恩惠之风」。这是人类',
          play: '1.8万',
          collect: '742'
        },
        { 
          name: '【BD1080P+/2018剧场版】精灵宝可梦：我们的故事【枫叶】',
          date: '2018-12-21 19:12:36',
          url: require('../assets/img/list/list4.jpg'),
          description: '直传 人与风共同生活的都市·风来城， 正在举办一年一度的"风节"。 根据自古流传至今的传说， 祭典最后一天传说中的宝可梦·洛奇亚将会现身， 为人们带来恩惠之风。 封面https://www.pixiv.net/m',
          play: '1.5万',
          collect: '649'
        },
        { 
          name: '【BD1080P+/2018剧场版】精灵宝可梦：我们的故事【枫叶】',
          date: '2018-12-21 19:12:36',
          url: require('../assets/img/list/list5.jpg'),
          description: '来源网络 来源网络 感谢VRAINSTORM字幕组',
          play: '1.3万',
          collect: '308'
        },
        { 
          name: '【BD1080P+/2018剧场版】精灵宝可梦：我们的故事【枫叶】',
          date: '2018-12-21 19:12:36',
          url: require('../assets/img/list/list6.jpg'),
          description: '感谢@hungry小浩纸 的片源，92版OVA请关注小浩纸 翻译：Augustus·Xzavier；时间轴：起名费劲太郎 森田真法漫画改',
          play: '9127',
          collect: '187'
        },
        { 
          name: '【BD1080P+/2018剧场版】精灵宝可梦：我们的故事【枫叶】',
          date: '2018-12-21 19:12:36',
          url: require('../assets/img/list/list1.jpg'),
          description: '那时, 他才15岁。即使现在, 也只不过才16岁。但重重压在他身上的现实, 却总是比他的躯体更巨大 内心满怀期待, 希望结交许多好朋友的七美开始了高中的生活。据说班中有三分之二的女生都喜欢',
          play: '6.6万',
          collect: '177'
        },
        { 
          name: '【BD1080P+/2018剧场版】精灵宝可梦：我们的故事【枫叶】',
          date: '2018-12-21 19:12:36',
          url: require('../assets/img/list/list2.jpg'),
          description: '某科学の补档 字幕为华盟的简体版 感谢字幕组制作的字幕 中世纪，人类与魔族持续着征战。某日，拥有着强大力量的“勇者”闯入了魔王的城堡，为了拯救人类世界而向魔王挑战。等着他的却是',
          play: '3.0万',
          collect: '1128'

        },
        { 
          name: '【BD1080P+/2018剧场版】精灵宝可梦：我们的故事【枫叶】',
          date: '2018-12-21 19:12:36',
          url: require('../assets/img/list/list3.jpg'),
          description: '感谢枫叶字幕组译制。 在人类与风共同生活的城市 「风来城」，每年会举行一年一度的「风节」。在「风节」的最后一天，传说的宝可梦洛奇亚会现身，为人类送上「恩惠之风」。这是人类',
          play: '1.8万',
          collect: '742'
        },
        { 
          name: '【BD1080P+/2018剧场版】精灵宝可梦：我们的故事【枫叶】',
          date: '2018-12-21 19:12:36',
          url: require('../assets/img/list/list4.jpg'),
          description: '直传 人与风共同生活的都市·风来城， 正在举办一年一度的"风节"。 根据自古流传至今的传说， 祭典最后一天传说中的宝可梦·洛奇亚将会现身， 为人们带来恩惠之风。 封面https://www.pixiv.net/m',
          play: '1.5万',
          collect: '649'
        },
        { 
          name: '【BD1080P+/2018剧场版】精灵宝可梦：我们的故事【枫叶】',
          date: '2018-12-21 19:12:36',
          url: require('../assets/img/list/list5.jpg'),
          description: '来源网络 来源网络 感谢VRAINSTORM字幕组',
          play: '1.3万',
          collect: '308'
        },
        { 
          name: '【BD1080P+/2018剧场版】精灵宝可梦：我们的故事【枫叶】',
          date: '2018-12-21 19:12:36',
          url: require('../assets/img/list/list6.jpg'),
          description: '感谢@hungry小浩纸 的片源，92版OVA请关注小浩纸 翻译：Augustus·Xzavier；时间轴：起名费劲太郎 森田真法漫画改',
          play: '9127',
          collect: '187'
        },
      ],
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
      }
    }
   
  },
  methods: {
    searchVideo() {
      this.showSearch = false
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    getVideoData() {

    },
    getSearchVideo() {
      
    }

  },
  mounted() { 
    let videoList = []
    this.videoData.map(item => {
      let descriptionChars = item.description.split(" ")
      let max = 2
      let overflow = descriptionChars.length > max
      let description = overflow ? descriptionChars.slice(0, max).join(" ") + "..." : descriptionChars.join(" ")
      videoList.push({
        name: item.name,
        date: item.date,
        url: item.url,
        description: description,
        play: item.play,
        collect: item.collect
      })    
    })
    this.videoData = videoList
    this.total = this.videoData.length
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
