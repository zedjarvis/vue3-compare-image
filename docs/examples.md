---
title: Examples

outline: deep
---

<script setup lang="ts">

// utilities
import { ref } from "vue"

// cassets
import cat1 from "./assets/cat1.jpg"
import cat2 from "./assets/cat2.jpg"

// components
import { VueCompareImage } from '../src/components'

const hover = ref(false)
const sliding = ref(false)

function startCallback(pos: number) {
  console.log('sliding started at ', pos)
}

function endCallback(pos: number) {
  console.log(`sliding has ended at: ${pos}`)
}

function slideCallback(state: boolean) {
  sliding.value = state
}
</script>

## Simple component

<div
    style="max-width: 500px; width: auto; height: auto; margin: 50px auto;"
  >
    <VueCompareImage
      :left-image="cat1" :right-image="cat2"
    />
</div>

::: details View source

::: code-group

```vue [template]
<template>
  <div style="max-width: 500px; width: auto; height: auto; margin: 50px auto;">
    <VueCompareImage :left-image="cat1" :right-image="cat2" />
  </div>
</template>
```

```vue [script]
<script setup lang="ts">
import { VueCompareImage } from 'vue3-compare-image'

// cassets
import cat1 from '@assets/cat1.jpg'
import cat2 from '@assets/cat2.jpg'
</script>
```

```vue [style]
<style>
/* styles */
</style>
```
:::

## Custom handle

To use custom handle, Just pass a valid html `<div />` element as handle prop.

In this example, you can also move the slider by pressing keyboard left and right arrow keys.
<div
    style="max-width: 500px; width: auto; height: auto; margin: 50px auto;"
  >
    <VueCompareImage
      :left-image="cat1" :right-image="cat2" keyboard handle="<div style='border: 1px solid white'>I am Custom Handle</div>" slider-line-color="red"
    />
</div>

::: details View source

::: code-group

```vue [template]
<template>
  <div style="max-width: 500px; width: auto; height: auto; margin: 50px auto;">
    <VueCompareImage
      :left-image="cat1" :right-image="cat2" keyboard handle="<div style='border: 1px solid white'>I am Custom Handle</div>" slider-line-color="red"
    />
  </div>
</template>
```

```vue [script]
<script setup lang="ts">
import { VueCompareImage } from 'vue3-compare-image'

// cassets
import cat1 from '@assets/cat1.jpg'
import cat2 from '@assets/cat2.jpg'
</script>
```

```vue [style]
<style>
/* styles */
</style>
```
:::

## Emmitted events

<button @click="hover = !hover" v-html="hover ? 'Disable Hover' : 'Enable Hover'" style="border: 1px solid white; padding: 2px 20px"></button>

<p v-html="sliding ? 'Sliding: true' : 'Sliding: false'"></p>

Open browsers console to view event logs.

<div
    style="max-width: 500px; width: auto; height: auto; margin: 50px auto;"
  >
    <VueCompareImage
      :left-image="cat1" :right-image="cat2" :hover="hover" @is-sliding="slideCallback" @slide-start="startCallback" @slide-end="endCallback"
    />
</div>


::: details View source

::: code-group

```vue [template]
<template>
  <div style="max-width: 500px; width: auto; height: auto; margin: 50px auto;">
    <VueCompareImage
      :left-image="cat1" :right-image="cat2" @is-sliding="slideCallback" @slide-start="startCallback" @slide-end="endCallback"
    />
  </div>
</template>
```

```vue [script]
<script setup lang="ts">
import { VueCompareImage } from 'vue3-compare-image'

// cassets
import cat1 from '@assets/cat1.jpg'
import cat2 from '@assets/cat2.jpg'

const hover = ref(false)
const sliding = ref(false)

function startCallback(pos: number) {
  console.log('sliding started at ', pos)
}

function endCallback(pos: number) {
  console.log(`sliding has ended at: ${pos}`)
}

function slideCallback(state: boolean) {
  sliding.value = state
}
</script>
```

```vue [style]
<style>
/* styles */
</style>
```
:::