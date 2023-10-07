<template>
    <el-menu :default-active="route.path" @select="handleSect" class="el-menu-vertical-demo" text-color="#646464"
        active-text-color="#2FA7B9" :router="true">
        <el-menu-item index="/" @click="closeDrawer">
            <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/article" @click="closeDrawer">
            <span>文章</span>
        </el-menu-item>
        <el-menu-item index="/website" @click="closeDrawer">
            <span>友链</span>
        </el-menu-item>
        <el-menu-item index="/about" @click="closeDrawer">
            <span>关于</span>
        </el-menu-item>
        <el-menu-item index="/login" v-show="!userInfo" @click="closeDrawer">
            <span>登录/注册</span>
        </el-menu-item>
        <el-menu-item index="/backstageHome" v-show="userInfo" @click="closeDrawer">
            <span>已登录，进入后台</span>
        </el-menu-item>
        <el-menu-item v-show="userInfo">
            <el-dropdown style="width:100%;height: 100%;cursor: pointer;">
                <div class="el-dropdown-link" style="width:100%;margin: auto;">
                    <img v-if="userInfo.userIcon !== null && userInfo.userIcon !== ''" :src="url+userInfo.userIcon" style="width: 30px;margin-right: 10px;vertical-align:middle;border-radius: 50px;"/>
                    <img v-if="userInfo.userIcon === null || userInfo.userIcon === ''" src="../../../../assets/default_avatar.svg"
                        style="width: 30px;margin-right: 10px;vertical-align:middle;border-radius: 50px;">
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
        </el-menu-item>
    </el-menu>
</template>

<script>
    import {
        ref,
        reactive,
        toRefs,
        onMounted,
        watch,
    } from "vue"
    import {
        useRoute
    } from "vue-router"
    export default {
        emits: ["onCloseDrawer"],
        setup(props, {
            emit
        }) {
            const route = useRoute();
            const state = reactive({
                //获取当前访问的协议/:IP/端口
                loginUrl: location.protocol + '//' + location.host + '/login.html',
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

            // 关闭抽屉
            const closeDrawer = ()=>{
                emit("onCloseDrawer", false);
            }
            return {
                ...toRefs(state),
                route,
                exit,
                toPath,
                closeDrawer
            }
        }
    }
</script>

<style scoped>
    :global(.el-drawer__body) {
        padding: 0px !important;
    }

    .el-menu-item:hover {
        background-color: rgba(47, 167, 185, 0.1);
    }

    .el-menu-item.is-active {
        border-left: 5px solid #2fa7b9;
    }

    :deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
        background-color: rgba(47, 167, 185, 0.1);
        color: #2fa7b9;
    }

    .el-menu-item * {
        vertical-align: baseline;
    }
</style>