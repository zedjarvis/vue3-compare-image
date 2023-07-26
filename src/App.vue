<script setup lang="ts">
// cassets
import cat1 from "/src/assets/cat1.jpg";
import cat2 from "/src/assets/cat2.jpg";

const startCallback = ( pos: number) => {
  console.log("component  started at ", pos)
}

const endCallback = ( pos: number) => {
  console.log("component has ended at ", pos)
}

</script>

<template>
  <div class="container" style="max-width: 500px; width: auto; height: auto; margin: 50px auto;">
    <VueCompareImage keyboard :slide-on-click="false" vertical @slide-start="startCallback" @slide-end="endCallback"  :left-image="cat1" left-image-label="Left Image" :right-image="cat2" right-image-label="Right Image" handle="<div style='border: 1px solid red'>Handle</div>" />
  </div>
  <div class="container" style="max-width: 500px; width: auto; height: auto; margin: 10px auto;">
    <VueCompareImage keyboard vertical @slide-start="startCallback" @slide-end="endCallback"  :left-image="cat1" left-image-label="Left Image" :right-image="cat2" right-image-label="Right Image" handle="<div style='border: 1px solid red'>Handle</div>" />
  </div>
  <div class="container" style="max-width: 500px; width: auto; height: auto; margin: 10px auto;">
    <VueCompareImage hover keyboard @slide-start="startCallback" @slide-end="endCallback"  :left-image="cat1" left-image-label="Left Image" :right-image="cat2" right-image-label="Right Image" handle="<div style='border: 1px solid red'>Handle</div>" />
  </div>
</template>