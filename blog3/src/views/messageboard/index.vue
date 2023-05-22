<template>
<div class="message">
    <div class="up-info">
      <div class="logo">
        <div style="width: 60px">
          <MyElimage :img="MessageLogo" />
        </div>
        <p class="title">留言板</p>
      </div>
      <p class="desc">输入你的昵称 联系方式 可以给我的网站留言哦~</p>
    </div>
		<MessageFrom @getMessage="getmessage"/>
		<div class="message-part">
		  <CommentItem ref="Messageref"/>
		</div>
  </div>
</template>



<script lang="ts" setup>
import {ref} from "vue"
import MessageLogo from '@/assets/img/liuyan-logo.png'
const Messageref =ref(null)
const state = reactive({
	msg:ref(null)
})
const getmessage = () => {
　Messageref.value.methods.getMesg();
}
// return { Messageref, handleClick }
</script>




<style lang="less" scoped>
@import url(./styles/MessageBoard.less);
</style>