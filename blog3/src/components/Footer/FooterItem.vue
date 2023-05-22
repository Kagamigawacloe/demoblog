<template>
  <footer class="footer">
    <aside class="left">
      <p class="one">Adk-blog</p>
      <p class="two">仅供学习使用 本博客为个人用途 无任何盈利用途</p>
<!--      <p class="three">
        备案/许可证编号:<a href="" target="_blank"></a>
      </p> -->
    </aside>
    <div class="right">
      <p>本项目基于vue3进行编写</p>
      <p>
        项目地址:<a href="" target="_blank">Github</a>
      </p>
      <p></p>
      <p class="link" @click="$router.push('/index/friendslink')">友情链接 还没写</p>
    </div>
  </footer>
</template>

<style lang="less" scoped>
@media screen and(min-width: @mobile-device) {
  .footer {
    width: 100%;
    display: flex;
    color: @textColor;
    padding: @padding-general;
    text-align: center;
    align-items: center;
		justify-content: space-between;
		flex-direction: row;
    background-color: @bgColor;
    flex-wrap: wrap;
    margin-top: 20px;
		padding: 0.5rem 5rem;
    .shadow(-1px, 2px);
    .font-normal();

    .one {
      font-size: @big-text;
    }

    .two {
      font-size: @small-text;
    }

    .three {
      font-size: @very-samll-text;
    }

    .right {
      flex-shrink: 0;
      font-size: @very-samll-text;
			text-align: right;
      .link {
        color: @linkColor;
      }
    }
  }
}
</style>
