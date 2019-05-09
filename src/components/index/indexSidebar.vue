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
                <i class="iconfont icon-yonghu"></i>
                <span style="{display: inline-block; margin-left: 5px;}">用户信息管理</span>
            </el-menu-item>
            <el-menu-item index="/college">
                <i class="iconfont icon-xueyuan"></i>
                <span class="sidebar-span">学院管理</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="iconfont icon-jiaoshi"></i>
                    <span class="sidebar-span">教室管理</span>                   
                </template>
                <el-menu-item class="menu-item" index="2-1">选项1</el-menu-item>
                <el-menu-item class="menu-item" index="2-2">选项2</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="iconfont icon-gonghao"></i>
                    <span class="sidebar-span">工号管理</span> 
                </template>
                <el-menu-item class="menu-item" index="3-1">选项1</el-menu-item>
                <el-menu-item class="menu-item" index="3-2">选项2</el-menu-item>
                <el-menu-item class="menu-item" index="3-3">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="iconfont icon-kecheng"></i>
                    <span class="sidebar-span">课程管理</span> 
                </template>
                <el-menu-item class="menu-item" index="4-1">选项1</el-menu-item>
                <el-menu-item class="menu-item" index="4-2">选项2</el-menu-item>
                <el-menu-item class="menu-item" index="4-3">选项3</el-menu-item>
                <el-menu-item class="menu-item" index="4-4">选项4</el-menu-item>
            </el-submenu>
            <el-menu-item index="/video">
                <i class="iconfont icon-shipin"></i>
                <span class="sidebar-span">视频管理</span>
            </el-menu-item>  
            <el-menu-item index="/videoLive">      
                <i class="iconfont icon-zhibo"></i>
                <span class="sidebar-span">视频直播</span>    
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
