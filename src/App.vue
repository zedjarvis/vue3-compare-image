<script setup lang="ts">
// utilities
import { ref } from "vue";

import { VueCompareImage } from "./components"
// cassets
import cat1 from "/src/assets/cat1.jpg";
import cat2 from "/src/assets/cat2.jpg";

const hover = ref(false)

const startCallback = (pos: number) => {
  console.log("component  started at ", pos)
}

const endCallback = (pos: number) => {
  console.log("component has ended at ", pos)
}

</script>

<template>
  <button @click="hover = !hover">Click me</button>
  <div class="container"
    style="max-width: 500px; width: auto; height: auto; margin: 50px auto; display: flex; flex-direction: column;">
    <VueCompareImage :hover="hover" skeleton="<div style='background-color: black; color: white'>HELLO WORLD</div>"
      :slide-on-click="false" vertical @slide-start="startCallback" @slide-end="endCallback" :left-image="cat1"
      left-image-label="Left Image" :right-image="cat2" right-image-label="Right Image" />
  </div>
  <div class="container" style="max-width: 500px; width: auto; height: auto; margin: 10px auto;">
    <VueCompareImage keyboard vertical @slide-start="startCallback" @slide-end="endCallback" :left-image="cat1"
      left-image-label="Left Image" :right-image="cat2" right-image-label="Right Image" />
  </div>
  <div class="container" style="max-width: 500px; width: auto; height: auto; margin: 10px auto;">
    <VueCompareImage hover keyboard @slide-start="startCallback" @slide-end="endCallback" :left-image="cat1"
      left-image-label="Left Image" :right-image="cat2" right-image-label="Right Image" />
  </div>
</template>