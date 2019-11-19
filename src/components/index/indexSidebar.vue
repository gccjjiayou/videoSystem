<template>
<div class="sidebar-box">
    <el-card :body-style="{ padding: '0px'}" shadow="never">
        <el-menu class="el-menu-vertical-demo" 
            :collapse="isCollapse" 
            :unique-opened="true" 
            active-text-color="#303133"
            :default-active="$route.path"
            router>
            <el-menu-item index="/video">
                <i class="iconfont icon-shipin"></i>
                <span class="sidebar-span">视频列表</span>
            </el-menu-item>  
            <el-menu-item index="/paihang">
                <i class="iconfont icon-shipin"></i>
                <span class="sidebar-span">视频排行</span>
            </el-menu-item>  
            <el-menu-item index="/videoLive">      
                <i class="iconfont icon-zhibo"></i>
                <span class="sidebar-span">视频直播</span>    
            </el-menu-item>    
            <el-menu-item index="/college">
                <i class="iconfont icon-xueyuan"></i>
                <span class="sidebar-span">个人中心</span>
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
