<script setup lang="ts">
// cassets
import cat1 from "/src/assets/cat1.jpg";
import cat2 from "/src/assets/cat2.jpg";

const startCallback = (pos: number) => {
  console.log("Sliding has started ", pos)
}

const endCallback = (pos: number) => {
  console.log("Sliding has ended ", pos)
}

</script>

<template>
  <div class="container" style="max-width: 800px; width: auto; height: auto;">
    <VueCompareImage @slide-start="startCallback" @slide-end="endCallback"  :left-image="cat1" left-image-label="Left Image" :right-image="cat2" right-image-label="Right Image" handle="<div style='border: 1px solid red'>Handle</div>" />
  </div>
</template>