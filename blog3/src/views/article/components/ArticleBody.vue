<template>
  <section>
    <div v-html="html" v-highlight class="markdown-body"></div>
  </section>
</template>

<script setup lang="ts">
const prop = defineProps({
  html: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped>
.markdown-body {
  margin: @margin-general 0;
  padding: @padding-general;
}

</style>
