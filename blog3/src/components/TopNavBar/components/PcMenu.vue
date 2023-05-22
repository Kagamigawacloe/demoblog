<template>
	<nav class="menu">
	  <ul class="menu-list">
	    <li @click="$router.push('/index')">
	      <p>首页</p>
	      <span>Index</span>
	    </li>
	    <li @click="$router.push('/index/articlelist')">
	      <p>文章</p>
	      <span>Article</span>
	    </li>
	    <li @click="$router.push('/index/messageboard')">
	      <p>留言板</p>
	      <span>Message</span>
	    </li>
	    <li @click="$router.push('/index/anime')">
	      <p>动漫</p>
	      <span>Anime</span>
	    </li>
	    <li @click="$router.push('/index/edit')">
	      <p>写文</p>
	      <span>Edit</span>
	    </li>
	    <li>
	      <el-dropdown>
	        <p>更多</p>
	        <span>More</span>
	        <template #dropdown>
	          <el-dropdown-menu>
	            <el-dropdown-item>
	              <div
	                class="flex justify-between items-center"
	                @click="$router.push('/index/picture')"
	              >
	                <SvgIcon name="tupian" class="w-8 h-8 m-2" />
	                <p>画廊</p>
	              </div>
	            </el-dropdown-item>
	            <el-dropdown-item>
	              <div
	                class="flex justify-between items-center"
	                @click="$router.push('/index/aboutme')"
	              >
	                <SvgIcon name="yonghu" class="w-8 h-8 m-2" />
	                <p>关于我</p>
	              </div>
	            </el-dropdown-item>
	            <el-dropdown-item>
	              <div
	                class="flex justify-between items-center"
	                @click="$router.push('/index/friendslink')"
	              >
	                <SvgIcon name="link" class="w-8 h-8 m-2" />
	                <p>友链</p>
	              </div>
	            </el-dropdown-item>
	          </el-dropdown-menu>
	        </template>
	      </el-dropdown>
	    </li>
	  </ul>
	</nav>
</template>

<script lang="ts">
</script>

<style lang="less" scoped>
@import url(../styles/PcMenu.less);
</style>