<template>
    <el-row :gutter="20">
        <el-col :xs="0" :sm="1" :md="1" :lg="3" :xl="4">
            <!-- 左侧间隙 -->
        </el-col>
        <el-col :xs="24" :sm="22" :md="22" :lg="18" :xl="16">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
									<!-- 走马灯/轮播图 -->
									<Carousel></Carousel>
									<!-- 最新文章 -->
									<RecentPosts></RecentPosts>
                </el-col>
                <el-col class="hidden-sm-and-down" :md="6" :lg="6" :xl="6">
                    <!-- 搜索功能 -->
                    <SearchCard></SearchCard>
                    <!-- 文章分类 -->
                    <ArticleCategories></ArticleCategories>
                </el-col>
            </el-row>
        </el-col>
        <el-col :xs="0" :sm="1" :md="1" :lg="3" :xl="4">
            <!-- 右侧间隙 -->
        </el-col>
    </el-row>
</template>
<script>
    import axios from "axios";
    // 引入走马灯/轮播图
    import Carousel from './content/banner/Carousel.vue';
    // 引入搜索功能
    import SearchCard from '../../otherModules/searchCard/index.vue';
    // 引入RecentPosts展示文章
    import RecentPosts from './content/center/recentPosts.vue'
    // 引入ArticleCategories文章分类
    import ArticleCategories from '../../otherModules/articleCategories/index.vue';

    export default {
        components: {
            Carousel,
            SearchCard,
            RecentPosts,
            ArticleCategories
        }
    }
</script>

<style scoped>
    .el-col {
        overflow: hidden;
    }

    .el-col>div {
        border-radius: 10px;
    }

    .el-row {
        margin-bottom: 20px;
    }
</style>