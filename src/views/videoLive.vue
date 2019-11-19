<template>
  <div class="my-live">
    <video-player :options="playerOptions"></video-player>
  </div>
</template>
<script>
  export default {
    data() {
      return {
         playerOptions: {
          muted: false,
          aspectRatio: '16:9',
          sources: [{
            type: "rtmp/mp4",
            // src: "rtmp://live.hkstv.hk.lxdns.com/live/hks1"
            // src: "rtmp://192.168.11.198:1935/oflaDemo/stream1551174475446",
            src: "rtmp://58.200.131.2:1935/livetv/dftv",
            // src: "rtmp://47.106.107.145/oflaDemo/33"
          }],
          techOrder: ['flash'],
          autoplay: false,
          controls: true
        }
      }
    }
  }
</script>

<style lang="less" scoped>
// .my-live {
//   background-image: url('../assets/img/live-background.jpg'); 
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: center center;
//   background-attachment: scroll;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

</style>
