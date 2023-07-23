<script setup lang="ts">
// cassets
import cat1 from "/src/assets/cat1.jpg";
import cat2 from "/src/assets/cat2.jpg";

</script>

<template>
  <div class="container" style="max-width: 800px; width: auto; height: auto;">
    <VueCompareImage :left-image="cat1" left-image-label="Left Image" :right-image="cat2" right-image-label="Right Image" />
  </div>
</template>