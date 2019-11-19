<template>
<div>
  <div class="title">
    <i class="iconfont icon-remen"></i>
    <h3 style="margin-left: 8px;">热门</h3>
  </div>
  <div v-for="(item, index) in hotVideoData" :key="index"  class="hot-video-info">
    <div class="hot-left">
      <i :style="[index < 3? top3Background : restBackground, rankNum]">{{index + 1}}</i>              
    </div>
    <div class="hot-middle">
      <img :src="item.coverPicUrl || defaultImg" alt="" width="80px" height="50px">
    </div>
    <div class="hot-right">       
      <router-link target="_blank" class="video-title" style="text-decoration: none;" :to="{name: 'videoDetail', params: {videoId: item.videoId}}">{{item.videoTitle}}</router-link>
      <div class="icon-info">
        <div class="icon">
          <i class="iconfont icon-bofangliang"></i>
          <span style="margin-left: 5px;">{{item.clickNum}}</span>
        </div>
        <div class="icon">
          <i class="iconfont icon-pingfen"></i>
          <span style="margin-left: 5px;">{{item.rank}}</span>
        </div>               
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { getHotVideos } from "@/api/video"
export default {
  props: {
    collegeId: Number,
  },
  data() {
    return {
      defaultImg: require('@/assets/img/default-img.jpg'),
      hotVideoData: [],
      rankNum: {
        color: '#fff',
        display: 'inline-block',
        width: '22px',
        'line-height': '18px',
        'font-size': '12px',
        'text-align': 'center',
        'border-radius': '4px',
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
  margin-bottom: 5px;
}
.hot-middle {
  margin-left: 20px;
  margin-right: 20px;
}
.hot-right {
  border-bottom: 1px solid #e5e9ef;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.video-title:hover {
  font-size: 17px;
  color: red;
}
.icon-info {
  display: flex;
}
.icon {
  width: 50px;
}
.title {
  display: flex;
  align-items: center;
}
.icon-remen {
  color: red;
}
</style>
