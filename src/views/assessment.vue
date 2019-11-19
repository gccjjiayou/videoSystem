<template>
<div class="outer-box">
  <h3 class="playerTitle">视频播放器</h3>
  <div class="player">
    <video src="https://media.w3.org/2010/05/sintel/trailer.mp4"></video>
    <div class="controls">
      <!-- <a href="#" class="switch fa fa-play"></a>
      <a href="#" class="expand fa fa-expand"></a> -->
      <i v-if="change==='pause'" class="switch iconfont icon-zantingtingzhi" @click="handlePlayState"></i>
      <i v-else class="switch iconfont icon-bofang" @click="handlePlayState"></i>
      <i class="expand iconfont icon-quanping" @click="handleFullScreen"></i>
      <div class="progress">
        <div class="bar"></div>
        <div class="loaded"></div>
        <div class="elapse"></div>
      </div>
      <div class="time">
        <span class="currentTime">00:00:00</span>
        \
        <span class="totalTime">00:00:00</span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      video: '',
      change: 'play'
    }
  },
  methods: {
    handlePlayState() { //2. 实现播放与暂停的切换
      console.log('this.video.paused: ', this.video.paused);
      if(this.video.paused) {  //移除暂停样式，添加播放样式
        this.video.play();
        this.change = 'pause';
      }
      else {
        this.video.pause();  // 移除播放样式，添加暂停样式
        this.change = 'play';
      }
      console.log('this.video.paused: ', this.video.paused);
    },
    handleFullScreen() {  //3. 实现全屏操作
      console.log('this.video: ', this.video);
      //不同的浏览器需要添加不同的前缀，能力测试
      if(this.video.requestFullScreen) {
        this.video.requestFullScreen();
      } else if(this.video.webkitRequestFullScreen) {
        this.video.webkitRequestFullScreen();
      } else if(this.video.mozRequestFullScreen) {
        this.video.mozRequestFullScreen();
      } else if(this.video.msRequestFullScreen) {
        this.video.msRequestFullScreen();
      }
    }
  },
  mounted() {
    var video = document.querySelector('video'); //1. 获取播放器
    this.video = video;
    console.log('this.video.paused: ', this.video.paused);
  }
}
</script>
<style lang="less" scoped>
.playerTitle {
  width: 100%;
  margin: 0 auto;
  line-height: 100px;
  font-size: 40px;
  text-align: center;
}
.player {
  width: 720px;
  height: 360px;
  margin: 0 auto;
  background: url('../assets/img/cover.jpg') center no-repeat;
  background-size: cover;
  position: relative;
}
video {
  height: 100%;
  margin: 0 auto;
  // display: none;
}
.controls {
  width: 720px;
  height: 40px;
  position: absolute;
  left: 0px;
  bottom: -40px;
  background-color: #000;
}
.controls > .switch, .controls > .expand {
  width: 20px;
  height: 20px;
  display: block;
  position: absolute;
  top: 10px;
}
.controls > .switch {
  left: 10px;
}
.controls > .expand {
  right: 10px;
}
.icon-zantingtingzhi, .icon-bofang, .icon-quanping {
  font-size: 20px;
  color: #fff;
}
.controls > .progress {
  width: 430px;
  height: 10px;
  background-color: #555;
  position: absolute;
  left: 40px;
  bottom: 15px;
}
.controls > .progress > .bar {
  width: 100%;
  height: 100%;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  left: 0px;
  top: 0px;
  opacity: 0;
  z-index: 999;
}
.controls > .progress > .loaded {
  width: 60%;
  height: 100%;
  background-color: #999;
  border-radius: 3px;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 2;
}
.controls > .progress > .elapse {
  width: 0%;
  height: 100%;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
}
.controls > .time {
  height: 20px;
  position: absolute;
  left: 490px;
  top: 10px;
  color: #fff;
  font-size: 14px;
}
</style>