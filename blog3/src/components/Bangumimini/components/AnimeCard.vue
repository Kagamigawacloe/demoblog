<template>
  <div
    class="anime-card"
    ref="nowcard"
    v-if="animeInfo"
    @mouseenter="requestInfo"
    @mouseleave="detailInfoShow = false"
  >
	<div class="card">
		<el-image :src="animeInfo.images && animeInfo.images.large" fit="cover" class="elimg">
		<template #placeholder>
			<div class="w-full h-full bg-white">
				<LoadingAnime />
			</div>
		</template>
		<template #error>
			<div class="w-fill">
				<img class="w-fill h-fill" src="@/assets/img/404img.jpg" />
			</div>
		</template>
		</el-image>
		<transition @enter="infoXenter" @leave="infoXleave">
		        <div v-if="detailInfoShow" class="info-detail-container">
		          <transition @enter="infoXenter" @leave="infoXleave">
		            <div v-if="animeDetailData" class="info-detail">
		              <div :key="1" :data-index="0">
		                <div class="flex justify-between">
		                  <p class="title text-line-show-2">
		                    {{ animeInfo.name_cn ? animeInfo.name_cn : animeInfo.name }}
		                  </p>
		                  <p class="shrink-0">
		                    排名:<span class="rank text-blue-600">{{
		                      animeInfo.rank ? animeInfo.rank : '暂无数据'
		                    }}</span>
		                  </p>
		                </div>
		                <p class="hanyaku text-line-show-2" v-if="animeInfo.name_cn">
		                  {{ animeInfo.name }}
		                </p>
		                <p>开播日期:{{ animeInfo.air_date }}</p>
		              </div>
		              <p class="desc" :key="2" :data-index="1">简介:暂无</p>
		              <div :key="3" :data-index="2">
		                <p class="m-1">总集数:暂无</p>
		                <p class="text-red-500" v-if="animeInfo.rating">
		                  评分:{{ animeInfo.rating.score ? animeInfo.rating.score : '暂无评分' }}&nbsp;<span
		                    >({{ animeInfo.rating.total }}人参加评分)</span
		                  >
		                </p>
		                <div class="lex justify-between items-end flex-wrap">
<!-- 		                  <div class="tw-flex tw-items-center tw-flex-shrink-0">
		                    相关tag:
		                    <ElTag v-for="tag in tagsInfoThree" :key="tag.id" effect="dark" class="tw-m-1">
		                      {{ tag.name }}
		                    </ElTag>
		                  </div> -->
		                  <router-link
		                    class="cursor-pointer underline font-bold text-xl flex-shrink-0"
		                    :to="`/index/animedetail/${animeInfo.id}`"
		                  >
		                    查看更多
		                  </router-link>
		                </div>
		              </div>
		            </div>
		            <LoadingAnime v-else />
		          </transition>
		        </div>
		      </transition>
		<div class="info">
		  <p class="title text-line-show-2 truncate md:overflow-clip ..." :alt="animeInfo.name">
		    {{ animeInfo.name_cn ? animeInfo.name_cn : animeInfo.name }}
		  </p>
		  <div class="rating">
		    <p class="man" v-if="animeInfo.collection">{{ animeInfo.collection.doing }}人在看</p>
		    <p>
		      #<span class="rank">{{ animeInfo.rank ? animeInfo.rank : '暂无数据' }}</span>
		    </p>
		  </div>
		</div>
	</div>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
	const props = defineProps({
	  //子组件接收父组件传递过来的值
	  animeInfo: {
	    type: Object,
	  }
	})
	const detailInfoShow = ref(false)
	const animeDetailData = ref(false)
	  // list 延迟入场
	  const infoXenter = (el, done) => {
	    gsap.set(el, {
	      x: -20,
	      opacity: 0,
	      position: 'absolute'
	    })
	    gsap.to(el, {
	      opacity: 1,
	      duration: 0.6,
	      x: 0,
	      position: 'static',
	      ease: 'power1.inOut',
	      delay: 0.3,
	      onComplete: done
	    })
	  }
	  // info 出场
	  const infoXleave = (el, done) => {
	    gsap.to(el, {
	      opacity: 0,
	      duration: 0.3,
	      x: 30,
	      ease: 'power1.inOut',
	      onComplete: done
	    })
	  }
	// const tagsInfoThree = computed(() => {
	// 	console.log(props.animeinfo)
	// })
	const requestInfo = async () => {
	  detailInfoShow.value = true
		animeDetailData.value = true
	}
</script>

<style lang="less" scoped>
@import url(../styles/AnimeCard.less);
</style>
