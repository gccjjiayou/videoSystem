<template>
  <div class="outer-box">
    <div class="top-box">
      <ul>
        <li v-for="(item, index1) in 5" :key="index1">
          <span v-for="(item, index2) in 4" :key="index2"></span>
        </li>
      </ul>
      <span class="pre" @click="choose('pre')">&lt;</span>
      <span class="next" @click="choose('next')">&gt;</span>
    </div>
    <div class="bottom-box">
      <p class="hot-title inblk">热门视频</p>
      <router-link class="text-more" to="/video">更多<i class="el-icon-arrow-right"></i></router-link>
      <el-row>
        <el-col :span="4" :xs="12" v-for="(item, index) in hotArr" :key="index">
          <router-link to="/video">
            <p><img :src="item.url" width="188px" alt=""></p>
            <p class="txt">{{ item.title }}</p>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      handleCbk: true,
      hotArr: [
       { url: require("../assets/img/3.jpg"), title: '亲爱的热爱的'},
       { url: require("../assets/img/4.jpg"), title: '陈情令'},
       { url: require("../assets/img/5.jpg"), title: '亲爱的客栈'},
       { url: require("../assets/img/6.jpg"), title: '奇葩说'},
       { url: require("../assets/img/7.jpg"), title: '少年的你'},
       { url: require("../assets/img/1.jpg"), title: '哪吒之魔童降世'}
      ]
    };
  },
  methods: {
    choose(opt) {
      let div = document.querySelector(".outer-box");
      let allLi = div.querySelectorAll("li");
      if (this.handleCbk) {
        //增加节流操作，true说明本次点击会有响应
        this.handleCbk = false;
        opt === "pre" ? this.index++ : this.index--;
        allLi.forEach((item, key) => {
          item.style.transform = `rotateX(${this.index * 90}deg)`;
          item.style.transitionDelay = key * 0.2 + "s";
        });
        setTimeout(() => {
          this.handleCbk = true;
        }, 1000);
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.test {
  background-image: url('../assets/img/5.jpg');
  background-size: cover;
}
.outer-box {
  margin: 0 50px;
}
.top-box {
  width: 70%;
  height: 350px;
  position: relative;
  margin: 0 auto;
}
ul {
  width: 100%;
  height: 100%;
  list-style: none;
  padding: 0;
  // transform: rotate3d(1, 1, 0, -30deg);
  transform-style: preserve-3d; //保留3d效果，在要保留3d效果的元素的父元素上添加该属性
}
ul > li {
  width: 20%;
  height: 100%;
  float: left;
  position: relative;
  transform-style: preserve-3d;
}
ul > li > span {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
ul > li > span:nth-of-type(1) {
  background: url("../assets/img/1.jpg");
  transform: translateZ(150px);
}
ul > li > span:nth-of-type(2) {
  background: url("../assets/img/2.jpg");
  transform: translateY(-150px) rotateX(90deg);
}
ul > li > span:nth-of-type(3) {
  background: url("../assets/img/3.jpg");
  transform: translateZ(-150px) rotateX(180deg);
}
ul > li > span:nth-of-type(4) {
  background: url("../assets/img/4.jpg");
  transform: translateY(150px) rotateX(-90deg);
}
//设置每一个li元素的span显示图片的位置
ul > li:nth-of-type(2) > span {
  background-position: -100% 0;
}
ul > li:nth-of-type(3) > span {
  background-position: -200% 0;
}
ul > li:nth-of-type(4) > span {
  background-position: -300% 0;
}
ul > li:nth-of-type(5) > span {
  background-position: -400% 0;
}
.pre,
.next {
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  position: absolute;
  top: 50%;
  font-size: 40px;
  transform: translate(0, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}
.pre {
  left: 0;
}
.next {
  right: 0;
}
.hot-title {
  height: 30px;
  border-left: 5px solid #409EFF;
  padding-left: 19px;
  font: 25px bolder 楷体,楷体_GB2312;
}
.text-more {
  color: #999;
  font-size: 13px;
  text-decoration: none;
  padding-left: 30px;
}
.txt {
  height: 50px;
  overflow: hidden;
  font-size: 15px;
  line-height: 22px;
  text-overflow: ellipsis;
}
.txt:hover {
  color: #409EFF;
}
</style>