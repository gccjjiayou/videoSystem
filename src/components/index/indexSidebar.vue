<template>
<div class="sidebar-box">
    <el-card :body-style="{ padding: '0px'}" shadow="never">
        <el-menu class="el-menu-vertical-demo" 
            :collapse="isCollapse" 
            :unique-opened="true" 
            active-text-color="#303133"
            :default-active="$route.path"
            router>
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
            <!-- <el-menu-item index="5">
                <router-link target="_blank" style="text-decoration: none;" :to="{name: 'videoLive'}">
                    <img src="@/assets/img/sidebar-live.jpg" alt="">
                    <span class="sidebar-span">视频直播</span>
                </router-link>
            </el-menu-item>     -->
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
