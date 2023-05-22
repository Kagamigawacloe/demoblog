<template>
	<div class="cotainer" ref="body">
	  <div class="filter"></div>
	  <TopNavBar />
	  <main class="main">
			<article class="article">
				<div class="main-body">
<!-- 				  <transition name="onlyopacity">
				    <ToolBars/>
				  </transition> -->
					<div class="article-container" ref="articleContainer">
					  <ArticleSummary />
					  <!-- 主体部分 -->
					  <ArticleBody :html="state.content"/>
					  <!-- 结束部分 显示查看数 点赞数 以及评论数 -->
					  <ElDivider />
					</div>
				</div>
			</article>
	  </main>
	</div>
</template>

<script lang="ts">
// import ToolBars from './components/ToolBars.vue'
import ArticleSummary from './components/ArticleSummary.vue'
import ArticleBody from './components/ArticleBody.vue'
import { useRoute } from "vue-router";
import { reactive,ref, onMounted } from "vue";
import { GET } from '@/api/api'
export default {
	components: {ArticleSummary,ArticleBody},
	setup(){
		const route = useRoute();
		const state = reactive({
			article:{},
			content:''
		});
		const methods = {
			getArticle(){
				let params = { id: route.params.id}
				GET("/article/one",{params}).then((res: any) => {
					if(res.code == 200){
						state.article = res.data
						state.content = res.data.content
					}
				})
			}
		};
		const article = ref(state);
		onMounted(() => {
			methods.getArticle();
		});
		return{
			methods,
			state,
			article
		}
	}
}
</script>

<style scoped lang="less">
@import url(@/assets/styles/Layout/Layout.less);
@import url(./styles/Article.less);
</style>