<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path: '/video'}">视频管理</el-breadcrumb-item>
      <el-breadcrumb-item>视频详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="top-wrap-container" type="flex">
      <el-col :span="3" :xs="24" class="timeline-box">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp"
          >{{activity.state}}</el-timeline-item>
        </el-timeline>
      </el-col>

      <el-col :span="16" :xs="24" class="video-player-box">
        <div>
          <video-player
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
        </div>
      </el-col>

      <el-col :span="5" :xs="24" class="info-box">
        <div class="desc-info-box">
          <h3>{{videoDetail.videoTitle}}</h3>
          <div class="icon-layout">
            <div class="icon">
              <i class="iconfont icon-bofangliang"></i>
              <span style="margin-left: 5px;">{{videoDetail.clickNum}}</span>
            </div>
            <div class="icon">
              <i class="iconfont icon-pingfen"></i>
              <span style="margin-left: 5px;">{{videoDetail.rank}}</span>
            </div>
          </div>
          <div
            class="desc-info"
          >{{videoDetail.collegeName}}>{{videoDetail.courseName}} | {{videoDetail.teacherName}} | {{videoDetail.deviceMac}}</div>
          <div class="desc-info">{{videoDetail.uploadTime}}</div>
        </div>
        <div>
          <h4 style>相关视频</h4>
          <div v-for="(item, index) in teacherVideos" :key="index" class="related-video-box">
            <div style="margin-right: 10px;">
              <img :src="item.coverPicUrl || defaultImg" alt width="100px" height="60px">
            </div>
            <!-- <div class="related-video"> -->
            <router-link
              tag="a"
              target="_blank"
              style="text-decoration: none;"
              :to="{name: 'videoDetail', params: {videoId: item.videoId}}"
            >
              <div class="video-title">{{item.videoTitle}}</div>
              <div class="icon-click-rank">
                <div class="icon-click">
                  <i class="iconfont icon-bofangliang"></i>
                  <span style="margin-left: 5px;">{{item.clickNum}}</span>
                </div>
                <div class="icon-rank">
                  <i class="iconfont icon-pingfen"></i>
                  <span style="margin-left: 5px;">{{item.rank}}</span>
                </div>
              </div>
            </router-link>

            <!-- </div> -->
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="center-wrap-container">
      <el-button-group>
        <el-button>
          <i class="chart-icon" :class="[tabShow === 1? 'chart-pie':'chart-pie-gray']"></i>
        </el-button>
        <el-button>
          <i class="chart-icon" :class="[tabShow === 2? 'chart-column':'chart-column-gray']"></i>
        </el-button>
        <el-button>
          <i class="chart-icon" :class="[tabShow === 3? 'chart-table':'chart-table-gray']"></i>
        </el-button>
      </el-button-group>
    </div>

    <el-row>
      <el-col :span="12" :xs="24">
        <el-card class="state-chart-box" shadow="hover" :body-style="{padding: '10px'}">
          <div id="histogram" ref="histogram" :style="{width: '550px', height: '450px'}"></div>
        </el-card>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-card  class="recommend-video-box" shadow="hover" :body-style="{padding: '10px'}">
          <div v-for="(item, index) in teacherVideos" :key="index" class="recommend-video">
            <div style="margin-right: 10px;">
              <img :src="item.coverPicUrl || defaultImg" alt width="100px" height="60px">
            </div>
            <div class="recommend-video-info">
              <router-link
                tag="a"
                target="_blank"
                style="text-decoration: none;"
                :to="{name: 'videoDetail', params: {videoId: item.videoId}}"
              >{{item.videoTitle}}</router-link>
              <div style="display: flex;">
                <div style="width: 50px;">
                  <i class="iconfont icon-bofangliang"></i>
                  <span style="margin-left: 5px;">{{item.clickNum}}</span>
                </div>
                <div style="width: 50px;">
                  <i class="iconfont icon-pingfen"></i>
                  <span style="margin-left: 5px;">{{item.rank}}</span>
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
import echarts from "echarts";
import { getVideoDetail, getTeacherOtherVideos } from "@/api/video";
export default {
  data() {
    return {
      defaultImg: require("@/assets/img/default-img.jpg"),
      videoDetail: {},
      teacherVideos: [],
      playerOptions: {
        // videojs options
        autoplay: false, // 如果true,浏览器准备好时开始回放
        muted: false, // 默认情况下将会消除任何音频
        loop: false,
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值，值应该代表一个比例，用冒号分割的两个数字，（例如"16:9"或"4:3"）
        fluid: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        sources: [
          {
            type: "video/mp4",
            src: ""
          }
        ],
        // poster: '',  // 你的封面地址
        width: document.documentElement.clientWidth,
        // notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true
        }
      },
      activities: [
        {
          state: "站着面向",
          timestamp: "",
          size: "large"
        },
        {
          state: "坐着面向",
          timestamp: ""
        },
        {
          state: "坐着低头",
          timestamp: "",
          size: "large"
        },
        {
          state: "站着背向",
          timestamp: ""
        },
        {
          state: "教师离开",
          timestamp: ""
        }
      ],
      stateList: [
        { time: [] },
        { time: [] },
        { time: [] },
        { time: [] },
        { time: [] }
      ],
      currentTime: "",
      totalTime: "",
      videoTotalTime: "",
      videoSources: [],
      tabShow: 1
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
      let currentFormattedTime =
          player.controlBar.currentTimeDisplay.formattedTime_,
        [second, minute, hour] = currentFormattedTime.split(":").reverse();
      this.currentTime =
        parseInt(second) +
        parseInt(minute || 0) * 60 +
        parseInt(hour || 0) * 3600;
      this.videoTotalTime = parseInt(
        player.controlBar.durationDisplay.duration_
      );
    },
    onPlayerCanplay(player) {},
    onPlayerCanplaythrough(player) {},

    async getDetail() {
      const videoDetailRes = await getVideoDetail(this.$route.params.videoId),
        videoDetailData = videoDetailRes.data.result,
        videoConditionPerTime = videoDetailData.videoConditionPerTimes;
      videoDetailData.videoUrls.forEach((item, index) => {
        this.playerOptions.sources.push({ type: "video/mp4", src: item });
      });
      this.videoSources = videoDetailData.videoUrls;
      this.videoDetail = videoDetailData;
      this.totalTime = videoDetailData.duration / 1000;
      videoConditionPerTime.forEach(item => {
        let index = parseInt(item.condition) - 1;
        this.stateList[index].time.push(item.time);
      });
      const teacherOtherVideosRes = await getTeacherOtherVideos(
        videoDetailData.teacherId
      );
      this.teacherVideos = teacherOtherVideosRes.data.result;
    },

    drawHistogram() {
      let histogram = echarts.init(this.$refs.histogram);
      histogram.setOption({
        title: {
          text: "教学评估柱状图"
        },
        tooltip: {},
        xAxis: {
          name: "状态",
          data: ["站着面向", "坐着面向", "站着背向", "站着背向", "教师离开"],
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
    // drawHistogram() {
    //   let piechart = echarts.init(this.$refs.histogram);
    //   piechart.setOption({
    //     // backgroundColor: "#2c343c",

    //     title: {
    //       text: "Customized Pie",
    //       left: "center",
    //       top: 20,
    //       textStyle: {
    //         color: "#ccc"
    //       }
    //     },

    //     tooltip: {
    //       trigger: "item",
    //       formatter: "{a} <br/>{b} : {c} ({d}%)"
    //     },

    //     visualMap: {
    //       show: false,
    //       min: 80,
    //       max: 600,
    //       inRange: {
    //         colorLightness: [0, 1]
    //       }
    //     },
    //     series: [
    //       {
    //         name: "访问来源",
    //         type: "pie",
    //         radius: "55%",
    //         center: ["50%", "50%"],
    //         data: [
    //           { value: 335, name: "直接访问" },
    //           { value: 310, name: "邮件营销" },
    //           { value: 274, name: "联盟广告" },
    //           { value: 235, name: "视频广告" },
    //           { value: 400, name: "搜索引擎" }
    //         ].sort(function(a, b) {
    //           return a.value - b.value;
    //         }),
    //         roseType: "radius",
    //         label: {
    //           normal: {
    //             textStyle: {
    //               color: "rgba(255, 255, 255, 0.3)"
    //             }
    //           }
    //         },
    //         labelLine: {
    //           normal: {
    //             lineStyle: {
    //               color: "rgba(255, 255, 255, 0.3)"
    //             },
    //             smooth: 0.2,
    //             length: 10,
    //             length2: 20
    //           }
    //         },
    //         itemStyle: {
    //           normal: {
    //             color: "#c23531",
    //             shadowBlur: 200,
    //             shadowColor: "rgba(0, 0, 0, 0.5)"
    //           }
    //         },

    //         animationType: "scale",
    //         animationEasing: "elasticOut",
    //         animationDelay: function(idx) {
    //           return Math.random() * 200;
    //         }
    //       }
    //     ]
    //   });
    // },
    getStyle(time) {
      const pos = (this.currentTime / this.videoTotalTime).toFixed(10) * 500;
      return "transform: translateX(" + pos + "px)";
    }
  },
  watch: {
    currentTime() {
      for (let i = 0; i < 5; i++) {
        if (this.stateList[i].time.includes(this.currentTime.toString())) {
          this.activities[i].color = "#6495ED";
          this.activities[i].timestamp = this.currentTime;
        } else {
          this.activities[i].color = "#E4E7ED";
          this.activities[i].timestamp = "";
        }
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  mounted() {
    this.getDetail();
    this.drawHistogram();
  }
};
</script>

<style lang="less" scoped>
.top-wrap-container {
  background-color: #000;
}
.timeline-box {
  // background-color: #1c1f21;
  padding: 30px;
  // background-color: #fff;
  background-color: #a9a9a9;
}
.video-player-box {
  padding: 16px 0;
}
.info-box {
  color: #fff;
  background-color: #1c1f21;
  padding: 30px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
}
.info-box::-webkit-scrollbar {
  width: 0; // 修改滚动条的样式，使其不显示
}
.desc-info-box {
  height: 30%;
}
h3 {
  margin-bottom: 10px;
}
.icon-layout {
  display: flex;
  // margin-top: 20px;
}
.icon {
  width: 50px;
}
.desc-info,
.icon span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 22px;
}
h4 {
  font: 14px/1.5 "PingFang SC" "微软雅黑", "Microsoft YaHei", Helvetica,
    "Helvetica Neue", Tahoma, Arial, sans-serif;
}
.related-video-box {
  display: flex;
  font-size: 12px;
  margin-bottom: 20px;
}
.video-title {
  margin-bottom: 10px;
}
.icon-click-rank {
  display: flex;
  color: rgba(255, 255, 255, 0.4);
}
.icon-click-rank:hover {
  color: #fff;
}
.icon-click, .icon-rank {
  width: 50px;
}
.center-wrap-container {
  height: 68px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(28, 31, 33, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding-left: 15px;
}
.state-chart-box,
.recommend-video-box {
  margin: 15px;
  height: 550px;
}
.recommend-video-box {
  overflow-y: auto;
}
.recommend-video {
  display: flex;
  margin-bottom: 20px;
}
.recommend-video:hover {
  background-color: #ecf5ff;
}
.recommend-video-info {
  display: flex; 
  flex-direction: column; 
  justify-content: space-between;
}


</style>
