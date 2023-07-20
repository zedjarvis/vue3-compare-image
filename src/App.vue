<script setup lang="ts">
// componets
import VueCompareImage from './components';

const code1 = `
<div :style="{ maxWidth: '200px' }">
  <VueCompareImage
    leftImage="/cat1.jpg"
    rightImage="/cat2.jpg"
  />
</div>`;

const code2 = `
<div :style="{ maxWidth: '300px' }">
  <VueCompareImage
    leftImage="/cat1.jpg"
    rightImage="/cat2.jpg"
    :sliderPositionPercentage="0.2"
    leftLabel="Forest 1"
    rightLabel="Forest 2"
  />
</div>`;

const code3 = `
<div :style="{ maxWidth: '500px' }">
  <VueCompareImage
    leftImage="/cat1.jpg"
    rightImage="/cat2.jpg"
    hover
  />
</div>`;

const code4 = `
<div :style="{ maxWidth: '100%' }">
  <VueCompareImage
    leftImage="/cat1.jpg"
    rightImage="/cat2.jpg"
    :sliderLineWidth="5"
    :handleSize="80"
  />
</div>`;
</script>

<template>
  <div class="demo-page">
    <h1>
      <a href="https://github.com/zedjarvis/vue3-compare-image" target="_blank">Vue3 Compare Image</a>
    </h1>
    <pre v-highlightjs="code1">
      <code class="jsx">
      </code>
    </pre>
    <vue-compare-image />

    <pre v-highlightjs="code2">
      <code class="jsx">
      </code>
    </pre>
    <vue-compare-image />

    <pre v-highlightjs="code3">
      <code class="jsx">
      </code>
    </pre>
    <vue-compare-image />

    <pre v-highlightjs="code4">
      <code class="jsx">
      </code>
    </pre>
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
