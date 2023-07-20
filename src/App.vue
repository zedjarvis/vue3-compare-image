<script setup lang="ts">
// componets
import VueCompareImage from './components';
</script>

<template>
  <div class="demo-page">
    <h1>
      <a href="https://github.com/zedjarvis/vue3-compare-image">Vue3 Compare Image</a>
    </h1>
    <vue-compare-image />
  </div>
</template>

<style lang="scss">
*, body, html {
  box-sizing: border-box;
  margin: 0;
}
</style>

<style lang="scss" scoped>
.container {
  background: gray;
}
pre {
  margin-top: 8rem;
  &:first-of-type {
    margin-top: 0;
  }
}
</style>
