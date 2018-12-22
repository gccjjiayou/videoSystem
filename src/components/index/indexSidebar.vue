<template>
<div class="sidebar-box">
    <el-card :body-style="{ padding: '0px'}" shadow="never">
        <div slot="header">
            <el-row :gutter="30">
                <el-col :span="8"><img class="user-avatar" src="@/assets/img/avatar-1.jpg" alt=""></el-col>
                <el-col :span="16"><h3>Steena Ben</h3></el-col>
            </el-row>
        </div>
        <el-menu class="el-menu-vertical-demo" 
            :collapse="isCollapse" 
            :unique-opened="true" 
            active-text-color="#303133"
            :default-active="$route.path"
            router>
            <!-- <el-submenu class="sub-menu" :index="index + ''" v-for="index in 7" :key="index">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>Home{{index}}</span>
                </template>
                <el-menu-item class="menu-item" index="/">选项1</el-menu-item>
                <el-menu-item class="menu-item" index="1-2">选项2</el-menu-item>
                <el-menu-item class="menu-item" index="1-3">选项3</el-menu-item>
                <el-menu-item class="menu-item" index="1-4">选项4</el-menu-item>
            </el-submenu> -->
            <el-menu-item class="sub-menu" index="/">
                <i class="el-icon-location"></i>
                <span>Home1</span>
            </el-menu-item>
            <el-submenu class="sub-menu" index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>Home2</span>                   
                </template>
                <el-menu-item class="menu-item" index="2-1">选项1</el-menu-item>
                <el-menu-item class="menu-item" index="2-2">选项2</el-menu-item>
            </el-submenu>
            <el-submenu class="sub-menu" index="3">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>Home3</span> 
                </template>
                <el-menu-item class="menu-item" index="3-1">选项1</el-menu-item>
                <el-menu-item class="menu-item" index="3-2">选项2</el-menu-item>
                <el-menu-item class="menu-item" index="3-3">选项3</el-menu-item>
            </el-submenu>
            <el-submenu class="sub-menu" index="4">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>Home4</span> 
                </template>
                <el-menu-item class="menu-item" index="4-1">选项1</el-menu-item>
                <el-menu-item class="menu-item" index="4-2">选项2</el-menu-item>
                <el-menu-item class="menu-item" index="4-3">选项3</el-menu-item>
                <el-menu-item class="menu-item" index="4-4">选项4</el-menu-item>
            </el-submenu>
            <el-submenu class="sub-menu" index="5">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>Home5</span> 
                </template>
                <el-menu-item class="menu-item" index="5-1">选项1</el-menu-item>
                <el-menu-item class="menu-item" index="5-2">选项2</el-menu-item>
                <el-menu-item class="menu-item" index="5-3">选项3</el-menu-item>
                <el-menu-item class="menu-item" index="5-4">选项4</el-menu-item>
                <el-menu-item class="menu-item" index="5-4">选项5</el-menu-item>
            </el-submenu>
        
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
// @import url('../assets/less/common.less');
.user-avatar {
    border-radius: 50%;
}





</style>
