<!-- eslint-disable no-console -->
<script setup lang="ts">
// utilities
import { ref } from 'vue';

// cassets
import cat1 from '/src/assets/cat1.jpg';
import cat2 from '/src/assets/cat2.jpg';

const hover = ref(false)

function startCallback(pos: number) {
  console.log('component  started at ', pos)
}

function endCallback(pos: number) {
  console.log(`component has ended at: ${pos}`)
}
</script>

<template>
  <button @click="hover = !hover">
    Click me
  </button>
  <div
    class="container"
    style="max-width: 500px; width: auto; height: auto; margin: 50px auto; display: flex; flex-direction: column;"
  >
    <VueCompareImage
      :hover="hover" skeleton="<div style='background-color: black; color: white'>HELLO WORLD</div>"
      :slide-on-click="false" vertical :left-image="cat1" left-image-label="Left Image" :right-image="cat2"
      right-image-label="Right Image" @slide-start="startCallback" @slide-end="endCallback"
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
      hover keyboard :left-image="cat1" left-image-label="Left Image" :right-image="cat2"
      right-image-label="Right Image" @slide-start="startCallback" @slide-end="endCallback"
    />
  </div>
</template>
