<template>
  <div class="cotainer" ref="body">
    <!-- 导航 -->
			<TopNavBar/>
    <div class="main">
      <!-- 主体 -->
			<router-view v-slot="{ Component }">
				<keep-alive>
					<component :is="Component" :key="$route.name"   v-if="$route.meta.keepAlive"/>
				</keep-alive>
				<component :is="Component" :key="$route.name"  v-if="!$route.meta.keepAlive"/>
			</router-view>
    </div>
		<!-- 尾部 -->
    <FooterItem/>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="less">
@import url('@/assets/styles/Layout/Layout.less');
</style>