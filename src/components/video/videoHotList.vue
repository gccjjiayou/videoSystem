<template>
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
</template>

<script>
import { getHotVideos } from "@/api/video"
export default {
  props: {
    collegeId: Number,
  },
  data() {
    return {
      defaultImg: require('@/assets/img/list/default-img.jpg'),
      hotVideoData: [],
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
  watch: {
    collegeId: function(val, oldVal) {
      getHotVideos(this.collegeId).then(res => {
        this.hotVideoData = res.data.result
      })
    }
  }, 
  mounted() {
    getHotVideos(this.collegeId).then(res => {
      this.hotVideoData = res.data.result
    })
  }
}
</script>

<style lang="less" scoped>
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
.icon-info {
  display: flex;
}
.icon {
  width: 50px;
}

</style>
