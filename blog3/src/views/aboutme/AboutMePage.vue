<template>
  <div class="container">
    <div class="out" id="out">
      <div class="avatar" id="avatar">
        <MyElimage :img="Touxiang" />
      </div>
      <h1 class="welcome" id="welcome">你好 访客</h1>
      <h2 class="adk" id="adk">我是写这个博客的程序员</h2>
      <div class="profile" id="profile">
        <p class="label-1" :data-index="0">我来自 广东江门 今年23岁 是一名程序员</p>
        <p class="label-1" :data-index="1">
                        兴趣是看动漫、玩游戏和前端开发
				这个是我写的一个练手项目，但是由于缺少后端api所以很多功能无法实现。
				目前有完整页面的只有主页(index)、留言页(message)、登录和文章内容页
				             (虽然想写完但是写静态和我预期不符合)所以估计止步于此 
        </p>
        <p class="label-1" :data-index="2">这个博客完全参考一位B站up 视频可以搜索BV1wN4y1g7GU</p>
        <p class="label-1" :data-index="3">说一下这个项目</p>
        <p class="label-1" :data-index="4">
         这个是我第一个写的项目(也有是练手的原因)
        </p>
        <p class="label-1" :data-index="4">
          所以代码逻辑写的不是很好，中途还学了新东西就往里面放
        </p>
        <p class="label-1" :data-index="4">
          导致代码风格不一样(你会发现函数有几种风格)不过大体实现方法是一样的
        </p>
        <p class="label-1" :data-index="5">
         总之这个东西就是记录一下，如果你和我一样是新手也可以参考一下
        </p>
        <p class="label-1" :data-index="6">
          后续我会学习后端
        </p>
        <p class="label-1" :data-index="7">
          完整的写一个前后端项目
        </p>
        <p class="label-1" :data-index="8">嘛——总之很感谢你能看到这里</p>
        <p class="label-1" :data-index="9">2023.5.10</p>
      </div>
      <div class="logo">
        <div class="logo-img">
          <MyElimage :img="Logo" />
        </div>
        <p class="logo2" :data-index="1">一个基于vue3和Vite的练手项目~</p>
        <p class="logo2" :data-index="2">
          开源地址:<a href="https://github.com/Kagamigawacloe/demoblog/tree/main/blog3" target="_blank"
            >https://github.com/Kagamigawacloe/demoblog/tree/main/blog3</a
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from '@/assets/img/new-logo.png'
import Touxiang from './img/touxiang.jpg'
import gsap from 'gsap'

onMounted(() => {
  let timeline = gsap.timeline({ defaults: { duration: 1 } })
  gsap.set('#avatar', { y: '50%', scale: 0 })
  gsap.set('.logo-img', { scale: 0 })
  gsap.set('#welcome', { y: '50%' })
  gsap.set('#adk', { y: '50%' })
  gsap.set('.label-1', { y: 10, opacity: 0 })
  timeline
    .to('#avatar', {
      opacity: 1,
      scale: 1,
      ease: 'elastic.out(1, 0.4)',
      duration: 1.5
    })
    .to('#avatar', { y: 0, ease: 'power4.out', opacity: 1 })
    .to('#welcome', { y: 0, ease: 'power4.out', opacity: 1 }, '-=0.4')
    .to('#adk', { y: 0, ease: 'power4.out', opacity: 1 }, '-=0.6')
    .to(
      '.label-1',
      {
        y: 0,
        ease: 'power1.out',
        opacity: 1,
        duration: 1,
        delay: index => 0.2 * index
      },
      '-=0.0'
    )
    .to('.logo-img', {
      opacity: 1,
      ease: 'elastic.out(1, 0.4)',
      scale: 1,
      y: 0
    })
    .to('.logo2', {
      y: 0,
      ease: 'power1.out',
      opacity: 1,
      duration: 1,
      delay: index => 0.2 * index
    })
})
</script>

<style lang="less" scoped>
@import url(./styles/AboutMe.less);
</style>
