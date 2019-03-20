<template>
	<video-player :options="playerOptions"></video-player>
</template>
<script>
  export default {
    data() {
      return {
        playerOptions: {
          muted: false,
          aspectRatio: '3:1',
          sources: [{
            type: "rtmp/mp4",
            src: "rtmp://live.hkstv.hk.lxdns.com/live/hks1"
          }],
          techOrder: ['flash'],
          autoplay: false,
          controls: true
        }
      }
    },
   
  }
</script>