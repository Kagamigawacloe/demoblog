<template>
	<router-link class="box" :to="`/article/${articleItem.id}`">
	  <figure class="image" style="width: 100px;height: 100px;">
	    <MyElimage :img="articleItem.img_src"/>
	  </figure>
	  <article class="content">
	    <section class="up">
	      <div class="left">
	        <title class="title">{{ articleItem.title }}</title>
	      </div>
	      <time class="right flex-shrink-0">
	        <time class="time">{{ articleItem.create_time }}</time>
	      </time>
	    </section>
	    <section class="down">
	      <div class="leftcontent">
	        <div class="flex items-center">
	          <div class="8 h-8 rounded-full overflow-hidden mr-2">
	            <MyElimage :img="articleItem.expand.author.head_img"/>
	          </div>
	          <p class="author">{{ articleItem.expand.author.nickname }}</p>
	        </div>
	      </div>
	      <div>
	        <div class="icongroup">
	          <i class="iconfont icon-yanjing">暂无</i>
	          <i class="iconfont icon-pinglun">暂无</i>
	          <i class="iconfont icon-good">暂无</i>
	          <i class="iconfont icon-changyonggongneng">暂无</i>
	        </div>
	      </div>
	    </section>
	  </article>
	</router-link>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
const props = defineProps({
  articleItem: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>
<style lang="less" scoped>
@import url('./styles/Index.less');
</style>
