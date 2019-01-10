<template>
  <div class="video-detail">
    <el-row>
      <el-col :span="18">
        <el-card>
          <div slot="header">
            <h3>{{videoDetail.videoTitle}}</h3>
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
      <!-- <el-col :span="6">
        <el-card></el-card>
      </el-col> -->
    </el-row>
    
  </div>
  
</template>

<script>
// import { getVideoDetail } from '@/api/video'
export default {
  data() {
    return {
      videoDetail: {},
      playerOptions: {
        // videojs options
        muted: false,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: '',
          // src: 'http://pkqjrone7.bkt.clouddn.com/7140000001220_test.avi',
          // src: "http://pkqjrone7.bkt.clouddn.com/8560000001220.mp4",
          // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        }],
        poster: "/static/images/author.jpg",
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
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  mounted() {
    // getVideoDetail(this.$route.params.videoId).then(res => {
    //   this.videoDetail = res.data.result
    // })
    this.$http.get(`/video/detail/${this.$route.params.videoId}`).then(res => {
      console.log(res)
      let data = res.data.result
      this.playerOptions.sources[0].src = data.videoUrl
      this.videoDetail = data
      
    })
  }
  
}
</script>

<style lang="less" scoped>
.icon-info {
  display: flex;
}
.icon {
  width: 70px;
}

</style>
