<template>
    <el-menu :default-active="route.path" class="el-menu-vertical-mode" color="white" text-color="#67879b" router
        :unique-opened="false" unique-opened :default-openeds="[route.path]">
        <div class="imgBox hidden-xs-only" >
						<span style="font-weight: 1000;font-size: 45px;color:#009698;">MUIK</span>
        </div>
        <template v-for="v in menuData" :key="v.id" style="width:100%;">
            <el-sub-menu v-if="v.childMenu.length>0" index="/articleOperation">
                <template #title >
                    <el-icon>
                        <component :is="v.icon"></component>
                    </el-icon>
                    {{v.chineseName}}
                </template>
                <el-menu-item v-for="vite in v.childMenu" :key="vite.id" :index="vite.path"  @click="byValue">
                    <template #title>
                        <el-icon>
                            <component :is="vite.icon"></component>
                        </el-icon>{{vite.chineseName}}
                    </template>
                </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="v.path"  @click="byValue">
                <template #title>
                    <el-icon>
                        <component :is="v.icon"></component>
                    </el-icon>{{v.chineseName}}
                </template>
            </el-menu-item>
        </template>
    </el-menu>
</template>
<script>
    import {
        reactive,
        ref,
        onMounted
    } from 'vue'

    import {
        useRoute
    } from "vue-router"
    import axios from "axios"

    import {
        ElMessage,
        ElLoading
    } from 'element-plus'

    export default {
        components: {},
        emits: ["onDrawerVisible"],
        setup(props, {
            emit
        }) {
            const route = useRoute();
            const menuData = ref();
            onMounted(() => {
                const tokenStr = sessionStorage.getItem("userInfo");
                if (tokenStr) {
                    const userInfo = JSON.parse(tokenStr);
                    menuData.value = userInfo.menuInfo
                }
            });

            const byValue = () =>{
                emit("onDrawerVisible", false);
            }
            return {
                route,
                onMounted,
                menuData,
                byValue
            };
        }
    }
</script>

<style scoped>
    .imgBox {
        width: 100%;
        height: 70px;
    }

    .imgBox span {
        width: 80%;
        height: 100%;
        margin: 0 10%;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .el-menu {
        height: 100%;
        border: 0px;
    }

    /* 选中 */
    :deep(.el-menu-item.is-active) {
        color: white;
        background: linear-gradient(to right, #535b9a, #30bcd7);
    }
</style>