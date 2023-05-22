<template>
  <main class="main">
<!--    <div class="h-24 ghost"></div> -->
    <SubTitle>
      最近更新
      <template #right> welcome to Adkblog </template>
    </SubTitle>
		<Carousel :items="state.banner"/>
		<SubTitle> 看看新番 </SubTitle>
		<section class="bangumi">
		  <Bangumimini/>
		</section>
		<SubTitle> 我的文章 </SubTitle>
    <section class="view-content">
      <aside class="article">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <div class="title">
                <div class="tw-flex tw-flex-col few">
                  <p>近期更新文章</p>
                  <span>Update in few days</span>
                </div>
              </div>
              <AdkButton
                :x="8"
                :y="3.3"
                :mainTextsize="1.3"
                :subTextsize="0.7"
                @click="$router.push('/index/articlelist')"
              >
                更多
                <template #endesc> more </template>
              </AdkButton>
            </div>
          </template>
					<ArticleItem
						v-for="articleItem in state.articles"
						:key="articleItem.id"
						:articleItem="articleItem"
					/>
          <AdkEmpty v-if="state.articles.length === 0" desc="暂时没有文章发表哦~"></AdkEmpty>
        </el-card>
      </aside>
    </section>
  </main>
</template>

<script lang="ts">
import { GET } from '@/api/api'
import { reactive, toRefs, ref, onMounted} from "vue";
import SubTitle from './components/SubTitle.vue'
export default {
components : { SubTitle},
		setup(){
			const state = reactive({
	  	articles:[],
			banner:[]
	  })
			const methods = {
			 async getArticles () {
				await GET("/article/all").then((res: any) => {
					if(res.code == 200){
					state.articles = res.data.data.slice(0,4)
					state.banner = res.data.data
					}else {
					console.log("Error")
				}
				})
			}
			};
			onMounted(() => {
				methods.getArticles()
			});
			return {
				state,
			  methods
			}
		}
	}
</script>

<style lang="less" scoped>
@import url(./styles/Index.less);
</style>
