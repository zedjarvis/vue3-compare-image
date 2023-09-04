<!-- eslint-disable @typescript-eslint/semi -->
<!-- eslint-disable no-console -->
<script setup lang="ts">
// utilities
import { ref } from 'vue';

// cassets
import cat1 from '/src/assets/cat1.jpg';
import cat2 from '/src/assets/cat2.jpg';

// components
import { VueCompareImage } from 'vue3-compare-image';

const hover = ref(false)
const sliding = ref(false)

function startCallback(pos: number) {
  console.log('component  started at ', pos)
}

function endCallback(pos: number) {
  console.log(`component has ended at: ${pos}`)
}

function slideCallback(state: boolean) {
  sliding.value = state
}
</script>

<template>
  <button @click="hover = !hover">
    Click me
  </button>
  <p>is sliding: {{ sliding }}</p>
  <div
    class="container"
    style="max-width: 500px; width: auto; height: auto; margin: 50px auto; display: flex; flex-direction: column;"
  >
    <VueCompareImage
      :hover="hover"
      :slide-on-click="false" vertical :left-image="cat1" left-image-label="Left Image" :right-image="cat2"
      right-image-label="Right Image" slider-line-color="aquamarine" @is-sliding="slideCallback" @slide-start="startCallback" @slide-end="endCallback"
    />
  </div>
  <div class="container" style="max-width: 500px; width: auto; height: auto; margin: 10px auto;">
    <VueCompareImage
      keyboard vertical :left-image="cat1" left-image-label="Left Image" :right-image="cat2"
      right-image-label="Right Image" @slide-start="startCallback" @slide-end="endCallback"
    />
  </div>
  <div class="container" style="max-width: 500px; width: auto; height: auto; margin: 10px auto;">
    <VueCompareImage
      class="awesome"
      hover keyboard :left-image="cat1" left-image-label="Left Image" :right-image="cat2"
      right-image-label="Right Image" @slide-start="startCallback" @slide-end="endCallback"
    />
  </div>
</template>

<style>
.awesome .vci--right-label {
  color: red;
}
</style>
