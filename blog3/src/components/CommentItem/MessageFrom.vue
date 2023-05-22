<template>
	<el-form>
	<div class="edit-part">
	  <div class="liuyan-info">
	    <div class="name">
	      <span>您的昵称：</span>
	      <ElInput size="large"  show-word-limit maxlength="16" v-model="state.postForm.nickname">
				</ElInput>
	    </div>
			<div class="name">
			  <span>您的联系方式：</span>
			  <ElInput
			    class="contact"
			    size="large"
			    show-word-limit
			    maxlength="64"
			    placeholder="123456@qq.com"
					v-model="state.postForm.email"
			  >
			  </ElInput>
			</div>
	  </div>
		<ElDivider />
		<div class="main-content">
		  <div class="edit-area">
		    <V3Emoji
		     :textArea="true"
				 v-model="state.postForm.content"
				 />
		  </div>
		</div>
		<div class="button">
		  <ElButton @click="methods.postmessage" class="buttonself" type="success">发布留言</ElButton>
		</div>
	</div>
	</el-form>
</template>

<script lang="ts">
import V3Emoji from 'vue3-emoji'
import 'vue3-emoji/dist/style.css'
import { reactive,onMounted,defineExpose} from "vue";
import { ElMessage } from 'element-plus'
import { POST } from '@/api/api'
export default {
	     components: {
	      'V3Emoji': V3Emoji
	    },
			setup(props,ctx){
				const state = reactive({
					postForm: {
					  content: "",
					  nickname: "",
					  email: "",
					}
				})
				const methods = {
					async postmessage(){
						let params = {
							content: state.postForm.content,
							nickname:state.postForm.nickname,
							email:state.postForm.email,
						}
						await POST("/comments/add",params).then((res: any) => {
						  if(res.code == 200) {
								state.postForm.content = ""
						    ElMessage({message: '留言成功',type: 'success'})
								ctx.emit('getMessage')
						  }
						  else {
								console.log(res)
								ElMessage({message: res.msg,type: 'error',})
							}
							
						})
						
					}
				};
				onMounted(() => {
				});
				return {
					state,
				  methods
				}
			}
}
</script>

<style lang="less" scoped>
@import url(./styles/MessageFrom.less);
</style>