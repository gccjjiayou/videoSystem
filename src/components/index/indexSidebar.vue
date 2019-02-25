<template>
<div class="sidebar-box">
    <el-card :body-style="{ padding: '0px'}" shadow="never">
        <!-- <div slot="header">
            <el-row :gutter="30">
                <el-col :span="8"><img class="user-avatar" src="@/assets/img/avatar-1.jpg" alt=""></el-col>
                <el-col :span="16"><h3>Steena Ben</h3></el-col>
            </el-row>
        </div> -->
        <el-menu class="el-menu-vertical-demo" 
            :collapse="isCollapse" 
            :unique-opened="true" 
            active-text-color="#303133"
            :default-active="$route.path"
            router>
            <!-- <el-submenu  :index="index + ''" v-for="index in 7" :key="index">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>Home{{index}}</span>
                </template>
                <el-menu-item class="menu-item" index="/">选项1</el-menu-item>
                <el-menu-item class="menu-item" index="1-2">选项2</el-menu-item>
                <el-menu-item class="menu-item" index="1-3">选项3</el-menu-item>
                <el-menu-item class="menu-item" index="1-4">选项4</el-menu-item>
            </el-submenu> -->
            <el-menu-item index="/">
                <img src="@/assets/img/sidebar-user.jpg" alt="">
                <span style="{display: inline-block; margin-left: 5px;}">用户信息管理</span>
            </el-menu-item>
            <el-menu-item index="/school">
                <img src="@/assets/img/sidebar-school.jpg" alt="">
                <span class="sidebar-span">学校管理</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <img src="@/assets/img/sidebar-classroom.jpg" alt="">
                    <span class="sidebar-span">教室管理</span>                   
                </template>
                <el-menu-item class="menu-item" index="2-1">选项1</el-menu-item>
                <el-menu-item class="menu-item" index="2-2">选项2</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <img src="@/assets/img/sidebar-number.jpg" alt="">
                    <span class="sidebar-span">工号管理</span> 
                </template>
                <el-menu-item class="menu-item" index="3-1">选项1</el-menu-item>
                <el-menu-item class="menu-item" index="3-2">选项2</el-menu-item>
                <el-menu-item class="menu-item" index="3-3">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <img src="@/assets/img/sidebar-course.jpg" alt="">
                    <span class="sidebar-span">课程管理</span> 
                </template>
                <el-menu-item class="menu-item" index="4-1">选项1</el-menu-item>
                <el-menu-item class="menu-item" index="4-2">选项2</el-menu-item>
                <el-menu-item class="menu-item" index="4-3">选项3</el-menu-item>
                <el-menu-item class="menu-item" index="4-4">选项4</el-menu-item>
            </el-submenu>
            <el-menu-item index="/video">
                <img src="@/assets/img/sidebar-video.jpg" alt="">
                <span class="sidebar-span">视频管理</span>
            </el-menu-item>      
        </el-menu>
    </el-card>
</div>
    
</template>

<script>
export default {
    data() {
        return {
            isCollapse: false
        }
    },
    methods: {
        changeCollapse() {
            this.label = !this.label
        }
    }
}
</script>

<style lang="less" scoped>
.user-avatar {
    border-radius: 50%;
}
.sidebar-span {
    display: inline-block;
    margin-left: 5px;
}





</style>
