<template>
    <div class="hidden-xs-only header-menu">
        <el-menu :default-active="route.path" @select="handleSect" :router="true" :ellipsis="false" class="el-menu-demo"
            mode="horizontal" active-text-color='#009698'>
						<span style="font-weight: 1000;font-size: 45px;color:#009698;pointer;width:140px;" @click="router.push({path:'/'})">MUIK</span>
            <div class="flex-grow" />
            <el-menu-item index="/">
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/article">
                <span>文章</span>
            </el-menu-item>
            <el-menu-item index="/website">
                <span>友链</span>
            </el-menu-item>
            <el-menu-item index="/about">
                <span>关于</span>
            </el-menu-item>
            <a href="/login" target="_blank" class="loginA" v-show="!userInfo">
                登录/注册
            </a>
            <el-dropdown v-show="userInfo" style="cursor: pointer;">
                <div class="el-dropdown-link" style="margin: auto;">
                    <img v-if="userInfo.userIcon !== null && userInfo.userIcon !== ''" :src="url+userInfo.userIcon"
                    style="width: 30px;margin: 0px 10px;vertical-align:middle;border-radius: 50px;" />
                    <img v-if="userInfo.userIcon === null || userInfo.userIcon === ''" src="../../../assets/default_avatar.svg"
                        style="width: 30px;margin: 0px 10px;vertical-align:middle;border-radius: 50px;">
                    <span>
                        {{userInfo.userName}}
                    </span>

                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="toPath('/addArticle')">新建文章</el-dropdown-item>
                        <el-dropdown-item @click="toPath('/articleManager')">文章管理</el-dropdown-item>
                        <el-dropdown-item @click="toPath('/commentManager')">评论管理</el-dropdown-item>
                        <el-dropdown-item @click="toPath('/personSetup')">个人设置</el-dropdown-item>
                        <el-dropdown-item divided @click="exit">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-menu>
    </div>

   <div class="hidden-sm-and-up header-logo">
			 <p style="font-weight: 1000;font-size: 45px;color:#009698;cursor: pointer;width:140px;margin: 0 auto;" @click="router.push({path:'/'})">MUIK</p>
    </div>

</template>

<script>
    import {
        ref,
        reactive,
        toRefs,
        watch,
        onMounted
    } from 'vue'

    import {
        useRoute,
        useRouter
    } from "vue-router"

    export default {
        setup() {
            const route = useRoute();
            const router = useRouter();
            const state = reactive({
                // 当前登录的用户信息
                userInfo: '',
                // 服务器路径
                url: process.env.VUE_APP_URL,
            });
            onMounted(() => {
                // 获取用户信息
                const tokenStr = sessionStorage.getItem("userInfo");
                if (tokenStr) {
                    const userInfo = JSON.parse(tokenStr);
                    state.userInfo = userInfo.data[0];
                    console.log(state.userInfo)
                }
            });
            // 退出登录
            const exit = () => {
                // 清除用户登录信息
                window.sessionStorage.removeItem("userInfo");
                // 刷新界面
                window.location.reload(true);
            }
            // 前往某个界面
            const toPath = (path) => {
                window.location.href = path
            }
            return {
                ...toRefs(state),
                route,
                router,
                exit,
                toPath,
            }
        }
    }
</script>

<style scoped>
    /* 顶部菜单栏 */
    .flex-grow {
        flex-grow: 1;
    }

    .el-menu--horizontal {
        border-bottom: none;
    }

    .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
    .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
        color: #2FA7B9;
        background-color: rgba(47, 167, 185, 0.1);
    }

    .header-logo {
        display: flex;
        align-items: center;
        text-align: center;
    }

    .el-menu--horizontal>.el-menu-item a {
        color: #303133;
    }

    .el-menu--horizontal>.el-menu-item a:hover {
        color: #2FA7B9;
    }

    .loginA {
        line-height: 56px;
        font-size: 14px;
        margin-left: 10px;
    }

    .example-showcase .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
    }

    :deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
        background-color: rgba(47, 167, 185, 0.1);
        color: #2fa7b9;
    }
</style>