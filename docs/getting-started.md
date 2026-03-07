---
title: Getting Started
outline: deep
---

# Getting Started

## Installation

::: code-group

```bash [pnpm]
pnpm add vue3-compare-image
```

```bash [npm]
npm i vue3-compare-image
```

```bash [yarn]
yarn add vue3-compare-image
```
:::

## Register globally

```ts
import { createApp } from 'vue'
import VueCompareImage from 'vue3-compare-image'
import App from './App.vue'

createApp(App).use(VueCompareImage).mount('#app')
```

## Register locally

```vue
<script setup lang="ts">
import { VueCompareImage } from 'vue3-compare-image'

import afterImage from './assets/after.jpg'
import beforeImage from './assets/before.jpg'
</script>

<template>
  <VueCompareImage
    :left-image="beforeImage"
    :right-image="afterImage"
  />
</template>
```

## Optional TypeScript reference

If you register the component globally and want IDE autocompletion:

```ts
/// <reference types="vue3-compare-image/client" />
```

Or in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["vue3-compare-image/client"]
  }
}
```

## SSR note

If your framework renders on the server, wrap usage in a client-only guard (for example Nuxt's `<ClientOnly>`).
