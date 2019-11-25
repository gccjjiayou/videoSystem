<template>
<div class="outer-box">
  <h3 class="playerTitle">视频播放器</h3>
  <div class="player">
    <div v-show="!loading" class="loading"></div>
    <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
    <div class="controls">
      <i v-if="change==='pause'" class="switch iconfont icon-zantingtingzhi" @click="handlePlayState"></i>
      <i v-else class="switch iconfont icon-bofang" @click="handlePlayState"></i>
      <i class="volume iconfont icon-yinliang" @click="handleVolume"></i>
      <div class="slider" v-if="isMouseEnter"><el-slider v-model="volume" vertical height="100px"></el-slider></div>
      <i class="expand iconfont icon-quanping" @click="handleFullScreen"></i>
      <div class="progress" ref="progress">
        <div class="bar" @click="handleJumpPlay"></div>
        <div class="loaded"></div>
        <div class="elapse" ref="elapse"></div>
      </div>
      <div class="time">
        <span class="currentTime">{{ formatCurrentTime }}</span>
        \
        <span class="totalTime">{{ formatTotalTime }}</span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      video: '',
      change: 'play',
      formatTotalTime: '00:00:00',
      formatCurrentTime: '00:00:00',
      totalTime: 0,
      isMouseEnter: false,
      volume: 0,
      buffer: 0
    }
  },
  methods: {
    handlePlayState() { //2. 实现播放与暂停的切换
      if(this.video.paused) {  //移除暂停样式，添加播放样式
        this.video.play();
        this.change = 'pause';
      }
      else {
        this.video.pause();  // 移除播放样式，添加暂停样式
        this.change = 'play';
      }
    },
    handleFullScreen() {  //3. 实现全屏操作
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
    },
    formatTime(time) {
      let hour = parseInt(time/3600);
      hour = hour < 10 ? '0'+hour : hour;
      let min = parseInt(time%3600/60);
      min = min < 10 ? '0'+min : min;
      let sec = parseInt(time%60);
      sec = sec < 10 ? '0'+sec : sec;
      return hour + ':' + min + ':' + sec;
    },
    handleJumpPlay(e) { //6.实现视频的跳播
      let offset = e.offsetX; //获取当前鼠标相对于父元素的left偏移值
      let progressWidth = window.getComputedStyle(this.$refs.progress).width; //获取父元素的宽度
      let percent = offset / parseInt(progressWidth); //计算偏移值相对于父元素宽度的比例
      let current = percent * this.totalTime; //计算这个位置对应的视频进度值
      this.video.currentTime = current; //设置当前视频的currentTime，会自动触发ontimeupdate事件
      this.video.play();  //点击之后视频要是播放状态
      this.change = 'pause';
    },
    handleVolume() {
      this.isMouseEnter = true;
      setTimeout(() => {
        this.video.volume = this.volume;
        this.isMouseEnter = false;
      }, 2000)
    },
    getBufferProgress() {
      let buffer = this.video.buffered.end(0);  //获取当前视频的缓冲进度
      let percent = buffer /  this.totalTime * 100 + '%';
      document.querySelector('.loaded').style.width = percent;
      console.log('huancun: ', document.querySelector('.loaded').style.width);
    }
  },
  mounted() {
    let video = document.querySelector('video'); //1. 获取播放器
    this.video = video;
    let self = this;
    this.video.oncanplay = function() { //4.实现播放业务逻辑，当视频文件可以播放时触发oncanplay事件
      setTimeout(() => {
        self.loading = true;
        self.video.style.display = 'block'; //将视频文件设置为显示
        self.totalTime = self.video.duration; //获取当前视频文件的总时长（以秒作单位，同时获取了小数值），计算出时分秒
        self.formatTotalTime = self.formatTime(self.totalTime);
        self.getBufferProgress();
      }, 2000);
    }
    this.video.ontimeupdate = function() {  //5.实现播放过程中的业务逻辑，视频播放过程中会触发ontimeupdate事件
      let current = self.video.currentTime;
      self.formatCurrentTime = self.formatTime(current);
      let percent = current / self.totalTime * 100 + '%';
      document.querySelector('.elapse').style.width = percent;
      self.getBufferProgress();
    }
    this.video.onended = function() {
      self.video.currentTime = 0;
      self.change = 'play';
    }
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
  background-color: #000;
  position: relative;
}
.loading {
  content: '';
  display: block;
  width: 120px;
  height: 120px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  position: absolute;
  top: 120px;
  left: 300px;
  animation: loading 2s linear infinite;
}
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
video {
  height: 100%;
  margin: 0 auto;
  display: none;
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
.controls > .slider {
  position: absolute;
  right: 44px;
  bottom: 40px;
}
.controls > .switch {
  left: 10px;
}
.controls > .stop {
  left: 40px;
}
.controls > .volume {
  right: 50px;
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
  width: 0%;
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