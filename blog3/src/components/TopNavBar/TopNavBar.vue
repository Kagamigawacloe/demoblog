<template>  
    <!-- 导航组件 -->
    <el-header>
      <el-row :gutter="20">
        <!-- logo -->
        <el-col :span="4">
         <Logo/>
        </el-col>
        <!-- list -->
        <el-col :span="16">
         <PcMenu />
        </el-col>
        <!-- myinfo -->
        <el-col :span="4">
         <RightInfoBox/>
        </el-col>
      </el-row>
    </el-header>
</template>

<script lang="ts">
</script>

<style lang="less" scoped>
@import url(./styles/Index.less);
</style>