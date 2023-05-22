<template>
<el-card class="bangumi">
    <template #header>
      <div class="card-header">
        <div class="anime-logo">
          <img src="@/assets/img/每日番剧-logo.png" />
        </div>
        <ul class="week">
          <li
            v-for="(week, index) in state.anime"
            :key="index"
            @click="methods.changeDay(week.weekday.id)"
            :class="{ active: week.weekday.id == state.nowDay }"
          >
            {{ week.weekday.ja }}
            <span>{{ week.weekday.en }}</span>
          </li>
        </ul>
      </div>
    </template>
		<div v-for="(week, index) in state.anime" :key="index">
		  <section
		    class="tab-inner myscrollbar"
		    v-if="week.weekday.id == state.nowDay"
		  >
		    <AnimeCard
		      :animeInfo="item"
		      v-for="(item, index) in week.items"
		      :key="index"
		    >
		    </AnimeCard>
		  </section>
		</div>
    <!-- 底部提示消息 -->
		<AdkEmpty v-if="!state.anime" desc="网络错误 获取不到数据~"></AdkEmpty>
    <p class="tip">数据源自https://bgm.tv</p>
  </el-card>
</template>

<script lang="ts">
import {getCalendar, GET} from'@/api/buapi'
import { reactive, toRefs, ref, onMounted} from "vue";
import AnimeCard from '@/components/Bangumimini/components/AnimeCard.vue'
	export default {
		setup(){
			const state = reactive({
			anime:{},
			nowDay: 0,
			
    })
			const methods = {
				day(){
					const nowday = new Date().getDay()
					if(nowday===0){
						state.nowDay = 7
					}else{
						state.nowDay = nowday
					}
				},
				changeDay(weekid){
					state.nowDay = weekid
				},
				 calendar () {
					 GET('/calendar').then((res: any) => {
						 //单独翻开数组和object
						 // state.weekday = [].concat(...res.map(o => o.weekday));
						 // state.items = [].concat(...res.map(o => o.items));
						 state.anime =res
						 // console.log(res)
					})
				}
			};
			onMounted(() => {
				methods.calendar()
				methods.day()
			});
			return {
				state,
			  methods
			}
		}
	}
</script>

<style lang="less" scoped>
@import url(./styles/Bangumimini.less);
</style>
