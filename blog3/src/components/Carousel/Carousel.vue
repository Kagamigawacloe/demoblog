<template>
  <div class="carousel-container">
    <el-carousel
      pause-on-hover
      v-loading="items.length === 0"
      arrow="hover"
    >
      <el-carousel-item v-for="item in items" style="display: block" :key="item.id">
        <div class="content" @click="$router.push(`/article/${item.id}`)">
          <div class="desc">
            <p class="title">{{ item.title }}</p>
            <p class="summary">{{ item.summary }}</p>
          </div>
          <MyElimage :img="item.expand.img_src" notFoundType="3:1"/>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="less" scoped>
@import url(./styles/Carousel.less);
</style>
