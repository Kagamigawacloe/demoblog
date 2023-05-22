<template>
 <div class="paixu">
	<h2>留言列表</h2>
	<p @click="methods.order(0)" :class="{ active: state.orderRole === 0 }">默认</p>
	<p @click="methods.order(1)" :class="{ active: state.orderRole === 1 }">正序</p>
 </div>
 <div class="comment-item" v-if="state.commentList!==null">
	 <div class="content" v-for="(item,index) in state.commentList">
		 <div class="info">
			 <div class="user">
				 <!-- 头像 -->
				 <div class="user-avatar">
				   <MyElimage :img="item.expand.head_img" style="width: ;"/>
				 </div>
				 <p class="nickname">{{item.nickname}}</p>
			 </div>
			 <div>
				 <div class="floor flex-1">{{item.id }}楼</div>
				 <span>{{ item.create_time }}</span>
			 </div>
		 </div>
		 <ElDivider />
		 <div class="flex comment-content">
			 {{item.content}}
		 </div>
	 </div>
  </div>
	<AdkEmpty v-else desc="暂时没有留言哦~"></AdkEmpty>
</template>

<script lang="ts">
	import { reactive,onMounted,defineExpose} from "vue";
	import { GET } from '@/api/api';
	export default {
		setup(){
			const state = reactive({
					commentList: [],
					orderRole:0
			})
			const methods = {
				getMesg(){
					GET("/comments/all").then((res: any) => {
						if(res.code == 200){
							state.commentList = res.data.data
						}

					})
				},
				order(orderType){
						state.commentList.sort(function (a,b){
							let obj1 = a['create_time']
							let obj2 = b['create_time']
							const val1 = Math.floor(new Date(obj1).getTime() / 1000)
							const val2 = Math.floor(new Date(obj2).getTime() / 1000)
							if(orderType==0){
								state.orderRole = 0
								return val2 - val1
							}else{
								state.orderRole = 1
								return val1 - val2
							}
						})
						console.log(state.commentList)
				}
			};
			defineExpose({methods});
			onMounted(() => {
			  methods.getMesg();
			});
			return {
				state,
			  methods
			}
		}
	}
</script>

<style lang="less" scoped>
@import url(./styles/CommentItem.less);
</style>