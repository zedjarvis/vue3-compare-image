---
title: Getting Started
---

# Vue3 Compare Image

A Simple Vue 3 component to compare two images with a slider, supports vertical and horizontal modes, and Keyboard for accessibility.


## Installation

::: code-group

```bash [npm]
npm install --save vue3-compare-image
```

```bash [yarn]
yarn add vue3-compare-image
```

```bash [pnpm]
pnpm add vue3-compare-image
```
:::

## Global

You can import and register the component globally

::: code-group

```ts [main.ts] 1,5
import VueCompareImage from 'vue3-compare-image'

const app = createApp(App)

app.use(VueCompareImage)

app.mount('#app')
```

```ts [*.d.ts]
/// <reference types="vue3-compare-image/client" />
```

```json [tsconfig]
{
  "compilerOptions": {
    "types": ["vue3-compare-image/client"]
  },
  "include": ["*.d.ts"]
}
```
:::

## Component

Or use it on a case by case basis

```vue [App.vue]
<script setup lang="ts">
// cassets
import cat1 from '@assest/cat2.jpg'
import cat2 from '@assests/cat2.jpg'

// components
import { VueCompareImage } from 'vue3-compare-image'
</script>

<template>
  <div>
    <VueCompareImage :left-image="cat1" :right-image="cat2" />
  </div>
</template>
```

::: tip NOTE
If you import the component on a case by case basis, you don't have to reference its type in any of `*.d.ts` or `tsconfig` files.
:::

::: warning
This component should be wrapped inside `<client-only></client-only>` tags incase you are using `SSR`.
:::