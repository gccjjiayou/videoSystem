<template>
  <div class="video-detail">
    <el-row :gutter="20">
      <el-col :span="14">
        <el-card shadow="hover">
          <div slot="header">
            <h3>{{videoDetail.videoTitle}}</h3>
            <div class="video-info">
              <div
                class="item"
              >{{videoDetail.collegeName}}>{{videoDetail.courseName}} | {{videoDetail.teacherName}} | {{videoDetail.deviceMac}}</div>
              <div class="item">{{videoDetail.uploadTime}}</div>
            </div>
            <div class="icon-info">
              <div class="icon">
                <img src="@/assets/img/list/play.jpg" alt>
                <span>{{videoDetail.clickNum}}</span>
              </div>
              <div class="icon">
                <img src="@/assets/img/list/rank.jpg" alt>
                <span>{{videoDetail.rank}}</span>
              </div>
            </div>
          </div>
          <video-player
            class="video-player-box"
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
            @ready="playerReadied"
          ></video-player>
          <div class="stateProgressBar">
            <div
              class="mark0"
              v-for="(item, index) in stateList[0].time"
              :key="index"
              v-show="item==currentTime"
              :style="getStyle(item)"
            ></div>
          </div>
          <div class="stateProgressBar">
            <div
              class="mark1"
              v-for="(item, index) in stateList[1].time"
              :key="index"
              v-show="item==currentTime"
              :style="getStyle(item)"
            ></div>
          </div>
          <div class="stateProgressBar">
            <div
              class="mark2"
              v-for="(item, index) in stateList[2].time"
              :key="index"
              v-show="item==currentTime"
              :style="getStyle(item)"
            ></div>
          </div>
          <div class="stateProgressBar">
            <div
              class="mark3"
              v-for="(item, index) in stateList[3].time"
              :key="index"
              v-show="item==currentTime"
              :style="getStyle(item)"
            ></div>
          </div>
          <div class="stateProgressBar">
            <div
              class="mark4"
              v-for="(item, index) in stateList[4].time"
              :key="index"
              v-show="item==currentTime"
              :style="getStyle(item)"
            ></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-row>
          <el-card shadow="hover" :body-style="{padding: '10px'}">
            <h4>其它视频</h4>
            <div v-for="(item, index) in teacherVideos" :key="index" class="teacher-videos">
              <div class="left">
                <img :src="item.coverPicUrl || defaultImg" alt width="100px" height="60px">
              </div>
              <div class="right">
                <router-link
                  tag="a"
                  target="_blank"
                  style="text-decoration: none;"
                  :to="{name: 'videoDetail', params: {videoId: item.videoId}}"
                >{{item.videoTitle}}</router-link>
                <div class="icon-wrap">
                  <div class="right-icon">
                    <img src="@/assets/img/list/play.jpg" alt>
                    <span>{{item.clickNum}}</span>
                  </div>
                  <div class="right-icon">
                    <img src="@/assets/img/list/rank.jpg" alt>
                    <span>{{item.rank}}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-card shadow="hover" :body-style="{padding: '10px'}">
            <div id="myBar" ref="myBar" :style="{width: '550px', height: '450px'}"></div>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
import { getVideoDetail, getTeacherOtherVideos } from "@/api/video";
export default {
  data() {
    return {
      defaultImg: require("@/assets/img/list/default-img.jpg"),
      videoDetail: {},
      teacherVideos: [],
      playerOptions: {
        // videojs options
        autoPlay: false, // 如果true,浏览器准备好时开始回放
        muted: false, // 默认情况下将会消除任何音频
        loop: false,
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值，值应该代表一个比例，用冒号分割的两个数字，（例如"16:9"或"4:3"）
        fluid: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        sources: [
          {
            type: "video/mp4",
            src: "",
          }
        ],
        // poster: '',  // 你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true,
        }
      },
      stateList: [
        { condition: 1, time: [], },
        { condition: 2, time: [], },
        { condition: 3, time: [], },
        { condition: 4, time: [], },
        { condition: 5, time: [], }
      ],
      current: "",
      currentTime: "",
      videoTotalTime: "",
    };
  },
  methods: {
    // listen event
    onPlayerPlay(player) {},
    onPlayerPause(player) {},
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {},

    // player is ready
    playerReadied(player) {
      // you can use it to do something...
      // player.[methods]
    },
    onPlayerEnded(player) {},
    onPlayerWaiting(player) {},
    onPlayerPlaying(player) {},
    onPlayerLoadeddata(player) {},
    onPlayerTimeupdate(player) {
      this.current = player;
      let currentFormattedTime = player.controlBar.currentTimeDisplay.formattedTime_,
          timeArray = currentFormattedTime.split(":"),
          len = timeArray.length;
      if (len === 1) this.currentTime = parseInt(timeArray[0]);
      else if (len === 2)
        this.currentTime = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
      else if (len === 3)
        this.currentTime =
          parseInt(timeArray[0]) * 3600 +
          parseInt(timeArray[1]) * 60 +
          parseInt(timeArray[2]);
    },
    onPlayerCanplay(player) {},
    onPlayerCanplaythrough(player) {},
    async getDetail() {
      const videoDetailRes = await getVideoDetail(this.$route.params.videoId),
            videoDetailData = videoDetailRes.data.result,
            videoConditionPerTime = videoDetailData.videoConditionPerTimes;
      this.playerOptions.sources[0].src = videoDetailData.videoUrl;
      this.videoDetail = videoDetailData;
      this.videoTotalTime = videoDetailData.duration / 1000;   
      videoConditionPerTime.forEach(item => {
        let index = parseInt(item.condition) - 1;
        this.stateList[index].time.push(item.time);                          
      });
      const teacherOtherVideosRes = await getTeacherOtherVideos(data.teacherId)
      this.teacherVideos = teacherOtherVideosRes.data.result;
    },

    drawBar() {
      let myBar = echarts.init(this.$refs.myBar);
      myBar.setOption({
        title: {
          text: "教学评估柱状图"
        },
        tooltip: {},
        xAxis: {
          name: "状态",
          data: ["站着面向", "坐着面向", "坐着面向", "站着背向", "教师离开"],
          axisLabel: {
            formatter: function(value) {
              return value.split("").join("\n");
            }
          }
        },
        yAxis: {
          name: "时长统计（帧数）"
        },
        series: [
          {
            name: "教师状态",
            type: "bar",
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    "#c33531",
                    "#efe42a",
                    "#64bd3d",
                    "#ee9201",
                    "#29aae3"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            },
            data: [5, 20, 36, 10, 40]
          }
        ]
      });
    },
    getStyle(time) {
      const pos = (this.currentTime / this.videoTotalTime).toFixed(10) * 500
      return "transform: translateX(" + pos + "px)";
    },
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  mounted() {
    this.getDetail();
    this.drawBar();
  }
};
</script>

<style lang="less" scoped>
.video-detail {
  margin: 0 auto;
  max-width: 1660px;
  min-width: 988px;
  width: 90%;
}
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
.stateProgressBar {
  margin: 20px 0;
  height: 3px;
  background: black;
  position: relative;
}
.stateColor {
  height: 100px;
  width: 1px;
  background: #334252;
}
.mark0,
.mark1,
.mark2,
.mark3,
.mark4 {
  width: 10px;
  height: 20px;
  position: absolute;
  bottom: -5px;
}
.mark0 {
  background: blue;
}
.mark1 {
  background: cadetblue;
}
.mark2 {
  background: cornflowerblue;
}
.mark3 {
  background: grey;
}
.mark4 {
  background: hotpink;
}
</style>
