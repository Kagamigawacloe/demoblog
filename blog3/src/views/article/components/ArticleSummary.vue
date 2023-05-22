<template>
<!-- 	{{article.article.expand.author.head_img}} -->
	<div class="article-author-info">
	  <!-- 文章标题 -->
	  <div class="article-title">
	    <h2>{{ state.article.title }}</h2>
	    <time><i class="iconfont icon-riqi"></i>发布于{{ state.article.create_time }}</time>
	  </div>
	  <!-- 作者部分 -->
	  <div class="author">
	    <div class="img">
	      <MyElimage :img="state.author.head_img"/>
	    </div>
	    <div class="author-info">
	      <p class="author-name">{{ state.author.nickname }}</p>
<!-- 	      <p class="introduce">{{ article.authorVo.introduce }}</p> -->
	    </div>
	  </div>
	  <!-- icon group 文章点赞等信息 -->
	  <ul class="icongroup">
	    <li><i class="iconfont icon-yanjing"></i>暂无</li>
	    <li><i class="iconfont icon-good"></i>暂无</li>
	    <li><i class="iconfont icon-changyonggongneng"></i>暂无</li>
	    <li><i class="iconfont icon-pinglun"></i>暂无</li>
	  </ul>
	  <summary class="summary">
	    <i class="summary-yinhao">“</i>
	    <p class="summary-content">引言:暂无</p>
	  </summary>
<!-- 	  <div class="tip">
	    <p>本文大概字数为：{{ word }}字， 看完大概需要{{ needMin }}分钟</p>
	  </div> -->
	</div>
</template>


<script lang="ts">
// const props = defineProps({
//   article: {
//     type: Object,
//     default: () => {
//       return {}
//     }
//   }
// })
import { useRoute } from "vue-router";
import { reactive,ref, onMounted } from "vue";
import { GET } from '@/api/api'
export default {
	setup(){
		const route = useRoute();
		const state = reactive({
			article:{},
			author:{}
		});
		const methods = {
			getArticle(){
				let params = { id: route.params.id}
				GET("/article/one",{params}).then((res: any) => {
					if(res.code == 200){
						state.article = res.data
						state.author = res.data.expand.author
					}
				})
			}
		};
		onMounted(() => {
			methods.getArticle();
		});
		return{
			methods,
			state
		}
	}
}
</script>

<style lang="less" scoped>
@import url(../styles/ArticleSummary.less);
</style>