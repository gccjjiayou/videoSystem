<template>
<div class="sidebar-box">
    <el-radio-group v-model="isCollapse">
        <el-radio-button :label="true"></el-radio-button>
    </el-radio-group>
    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" :collapse="isCollapse" unique-opened="true">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>Home</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-menu-item index="1-4">选项4</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>Home</span>
            </template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-menu-item index="2-4">选项4</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>Home</span>
            </template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
            <el-menu-item index="3-3">选项3</el-menu-item>
            <el-menu-item index="3-4">选项4</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>Home</span>
            </template>
            <el-menu-item index="4-1">选项1</el-menu-item>
            <el-menu-item index="4-2">选项2</el-menu-item>
            <el-menu-item index="4-3">选项3</el-menu-item>
            <el-menu-item index="4-4">选项4</el-menu-item>
        </el-submenu>      
    </el-menu>
</div>
    
</template>

<script>
export default {
    
}
</script>

<style>

</style>
