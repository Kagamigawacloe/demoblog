<template>
  <el-image :src="img" fit="cover" :lazy="isLazy">
    <template #placeholder>
      <div class="gray">
        <LoadingAnime />
      </div>
    </template>
    <template #error>
      <div class="gray">
        <img
          v-if="notFoundType === 'fang'"
          class="w-fill h-fill"
          src="@/assets/img/404img.jpg"
        />
        <img
          v-if="notFoundType === '3:4'"
          class="w-fill h-fill"
          src="@/assets/img/404img600.jpg"
        />
        <img
          v-if="notFoundType === '3:1'"
          class="w-fill h-fill"
          src="@/assets/img/404img1200.jpg"
        />
      </div>
    </template>
  </el-image>
</template>

<script lang="ts" setup>
interface MyElimageProp {
  img?: string // 图片的链接
  notFoundType?: string // 定义找不到的图片的比例和大小
  isLazy?: boolean // 是否懒加载
}
const props = withDefaults(defineProps<MyElimageProp>(), {
  img: '',
  notFoundType: 'fang',
  isLazy: false,
})
</script>

<style lang="less">
.gray {
  background-color: rgb(255, 255, 255);
  height: 100%;
  width: 100%;
  .flexbox(column);
}
.el-image {
  width: 100%;
  height: 100%;
}
</style>
