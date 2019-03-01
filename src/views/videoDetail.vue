<template>
  <div class="video-detail">
    <el-row>
      <el-col :span="18">
        <el-card shadow="hover">
          <div slot="header">
            <h3>{{videoDetail.videoTitle}}</h3>
            <div class="video-info">            
              <div class="item">{{videoDetail.schoolName}}>{{videoDetail.courseName}} | {{videoDetail.teacherName}} | {{videoDetail.deviceMac}}</div>            
              <div class="item">{{videoDetail.uploadTime}}</div>
            </div>
            <div class="icon-info">
              <div class="icon">
                <img src="@/assets/img/list/play.jpg" alt="">
                <span>{{videoDetail.clickNum}}</span>
              </div>
              <div class="icon">
                <img src="@/assets/img/list/rank.jpg" alt="">
                <span>{{videoDetail.rank}}</span>
              </div>
            </div>
          </div>
          <video-player  class="video-player-box"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="true"
            customEventName="customstatechangedeventname"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            @ended="onPlayerEnded($event)"
            @waiting="onPlayerWaiting($event)"
            @playing="onPlayerPlaying($event)"
            @loadeddata="onPlayerLoadeddata($event)"
            @timeupdate="onPlayerTimeupdate($event)"
            @canplay="onPlayerCanplay($event)"
            @canplaythrough="onPlayerCanplaythrough($event)"
            @statechanged="playerStateChanged($event)"
            @ready="playerReadied">
          </video-player>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{padding: '10px'}">
          <h4>其它视频</h4>
          <div v-for="(item, index) in teacherVideos" :key="index" class="teacher-videos">
            <div class="left">
              <img :src="item.coverPicUrl || defaultImg" alt="" width="100px" height="60px">
            </div>
            <div class="right">
              <router-link tag="a" target="_blank" style="text-decoration: none;" :to="{name: 'videoDetail', params: {videoId: item.videoId}}">{{item.videoTitle}}</router-link>
              <div class="icon-wrap">
                <div class="right-icon">
                  <img src="@/assets/img/list/play.jpg" alt="">
                  <span>{{item.clickNum}}</span>
                </div>
                <div class="right-icon">
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
import { getVideoDetail, getTeacherOtherVideos } from '@/api/video'
export default {
  data() {
    return {
      defaultImg: require('@/assets/img/list/default-img.jpg'),
      videoDetail: {},
      teacherVideos: [],
      playerOptions: {
        // videojs options
        autoPlay: false,  // 如果true,浏览器准备好时开始回放
        muted: false,  // 默认情况下将会消除任何音频
        loop: false,  
        language: 'zh-CN',
        aspectRatio: '16:9',  // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值，值应该代表一个比例，用冒号分割的两个数字，（例如"16:9"或"4:3"）
        fluid: true,  
        playbackRates: [0.7, 1.0, 1.5, 2.0],  // 播放速度
        sources: [{
          type: "video/mp4",
          src: '',
        }],
        // poster: '',  // 你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          // remainingTimeDisplay: false,
          fullscreenToggle: true,
        }

      },
    }
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      
    },
    onPlayerPause(player) {
    
    },
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {
      
    },

    // player is ready
    playerReadied(player) {
      // you can use it to do something...
      // player.[methods]
    },
    onPlayerEnded(player) {

    },
    onPlayerWaiting(player) {

    },
    onPlayerPlaying(player) {

    },
    onPlayerLoadeddata(player) {

    },
    onPlayerTimeupdate(player) {

    },
    onPlayerCanplay(player) {

    },
    onPlayerCanplaythrough(player) {

    },
    getDetail() {
      getVideoDetail(this.$route.params.videoId).then(res => {
        let data = res.data.result
        this.playerOptions.sources[0].src = data.videoUrl
        // this.playerOptions.poster = data.coverPicUrl
        this.videoDetail = data
        getTeacherOtherVideos(this.videoDetail.teacherId).then(res => {
          this.teacherVideos = res.data.result
          console.log(res)
        })
      })    
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  mounted() {
    this.getDetail()
  }
  
}
</script>

<style lang="less" scoped>
.video-info {
  display: flex;
}
.item {
  color: #666;
  font-size: 12px;
  line-height: 16px;
  margin-right: 30px;
}
.icon-info {
  display: flex;
  margin-top: 20px;
}
.icon {
  width: 70px;
}
.teacher-videos {
  display: flex;
  font-size: 12px;
}
.left {
  margin-right: 10px;
}
.right {
  border-bottom: 1px solid #e5e9ef;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.icon-wrap {
  display: flex;
}
.right-icon {
  width: 50px;
}



</style>
