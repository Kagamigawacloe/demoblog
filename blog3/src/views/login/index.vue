<template>
  <div class="login">
    <!-- github 联系方式  -->
    <ul class="absolute top-2 left-2 flex">
      <li>
        <a href="https://github.com/ADKcodeXD" target="_blank"
          ><i class="iconfont icon-github"></i
        ></a>
      </li>
      <li>
        <a href="https://space.bilibili.com/2988768" target="_blank"
          ><i class="iconfont icon-bilibili-line"></i
        ></a>
      </li>
      <li>
        <a href="https://twitter.com/ADKinsoMaD" target="_blank"
          ><i class="iconfont icon-tuite"></i
        ></a>
      </li>
    </ul>
		<transition 
		name="rightout" 
		mode="out-in">
		   <div class="login-box" v-if="isLogin">
          <div class="loginform">
            <div class="w-48 my-5 label--big">
              <p class="zh">登录</p>
              <p class="en">Login to ADKBLOG</p>
            </div>
            <el-form label-position="left" ref="ruleFormRef" :model="form">
              <el-form-item prop="username">
                <div class="w-32 h-10 mr-5 label">
                  <p class="zh">用户名</p>
                  <p class="en">Username</p>
                </div>
                <el-input v-model="form.account"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <div class="w-32 h-10 mr-5 label">
                  <p class="zh">密 &nbsp; 码</p>
                  <p class="en">Password</p>
                </div>
                <el-input type="password" v-model="form.password"></el-input>
              </el-form-item>
            </el-form>
            <div class="btn">
              <div class="register-btn" @click="isLogin = false"></div>
              <div class="login-btn" @click="LoginUser.login"></div>
            </div>
						<!-- logo -->
						<div class="w-10 w-72 relative ">
							<MyElimage :img="Logo" />
						</div>
						<!-- 直接看看 -->
						<div class="goin" @click="$router.push('/index')"></div>
          </div>
			 </div>
			 <div v-else class="temp">
				 <div class="login-box">
					 <div class="loginform">
						 <div class="my-5 flex items-center">
							 <div class="flex flex-col reg">
								 <p class="register">
									 欢迎注册到<span class="cartoon"><span>ADK</span>-Blog</span>
								 </p>
								 <p class="shita">Register to ADK-Blog</p>
							 </div>
						 </div>
						 <ElForm
							 label-position="left"
							 ref="registerFormRef"
							 :model="form"
						 >
							 <ElFormItem prop="username">
								 <div class="w-32 h-10 mr-5 label">
									 <p class="zh">用户名</p>
									 <p class="en">Username</p>
								 </div>
								 <ElInput></ElInput>
							 </ElFormItem>
							 <ElFormItem prop="nickname">
								 <div class="w-32 h-10 mr-5 label">
									 <p class="zh">昵&nbsp;&nbsp;称</p>
									 <p class="en">Nickname</p>
								 </div>
								 <ElInput></ElInput>
							 </ElFormItem>
							 <ElFormItem prop="password">
								 <div class="w-32 h-10 mr-5 label">
									 <p class="zh">密 &nbsp; 码</p>
									 <p class="en">Password</p>
								 </div>
								 <ElInput type="password"></ElInput>
							 </ElFormItem>
							 <ElFormItem prop="repassword">
								 <div class="w-32 h-10 mr-5 label">
									 <p class="zh">确认密码</p>
									 <p class="en">Confirm</p>
								 </div>
								 <ElInput type="password"></ElInput>
							 </ElFormItem>
						 </ElForm>
						 <div class="btn">
							 <div class="login-btn" @click="isLogin = true">s</div>
							 <div class="register-btn" @click="isLogin = false">s</div>
						 </div>
					 </div>
					<div class="w-10 md:w-72 relative bottom-4 left-4">
						 <MyElimage :img="Logo" />
					 </div>
					 <!-- 直接看看 -->
					 <div class="goin" @click="$router.push('/index')"></div>
				 </div>
			 </div>
		</transition>
  </div>
	
</template>

<script setup lang="ts">
import Logo from '@/assets/img/new-logo.png'
import LogoIcon from '@/assets/img/logo-icon.png'
import Jieshao from './imgs/介绍.png'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { POST } from "@/api/api"
import { useUserStore } from '@/store/user'
import gsap from 'gsap'
const router = useRouter()
const isLogin = ref(true)
const userStore = useUserStore()
const form = reactive({
	account: 'admin',
	password: '123456'
})
const LoginUser ={
	async login () {
		await POST("/users/login", form).then((res: any) => {
			// console.log(res)
		  if (res.code == 200) {
		    ElMessage({ message: "登陆成功！", type: "success" });
				//储存登录信息
				userStore.setUser(res.data)
				router.push('/index')
				// window.localStorage.setItem("login",JSON.stringify(res.data.user))
		  } else ElMessage({ message: res.msg, type: "warning" });
		});
	}
}
</script>

<style scoped lang="less">
@import url(./styles/Login.less);
</style>