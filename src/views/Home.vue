<template>
<div>
  <div class="first-row">
    <el-row>
      <el-col :span="6">
        <video-player  class="video-player-box"
                 ref="videoPlayer"
                 :options="playerOptions1"
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
      </el-col>
    </el-row>
  </div>
   

</div>

 
</template>

<script>
  // Similarly, you can also introduce the plugin resource pack you want to use within the component
  // import 'some-videojs-plugin'
  export default {
    data() {
      return {
        playerOptions1: {
          // videojs options
          muted: false,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          poster: "/static/images/author.jpg",
        },
        playerOptions2: {
          // videojs options
          muted: false,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: "https://www.bilibili.com/video/av763485?spm_id_from=333.334.b_62696c695f646f756761.3"
          }],
          poster: "/static/images/author.jpg",
        }
      }
    },
    mounted() {
     
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
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
    }
  }
</script>