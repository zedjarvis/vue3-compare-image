# vue3-compare-image

[![CI](https://github.com/zedjarvis/vue3-compare-image/actions/workflows/ci.yml/badge.svg)](https://github.com/zedjarvis/vue3-compare-image/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/vue3-compare-image)](https://www.npmjs.com/package/vue3-compare-image)
[![npm downloads](https://img.shields.io/npm/dm/vue3-compare-image)](https://www.npmjs.com/package/vue3-compare-image)
[![Coverage](https://img.shields.io/codecov/c/github/zedjarvis/vue3-compare-image?label=coverage)](https://codecov.io/gh/zedjarvis/vue3-compare-image)
[![License](https://img.shields.io/npm/l/vue3-compare-image)](./LICENSE)

Vue 3 component for before/after image comparison with drag, hover mode, keyboard navigation, and vertical or horizontal layouts.

> This project is a Vue 3-focused fork of [vue-compare-image](https://github.com/junkboy0315/vue-compare-image), with behavior parity improvements inspired by [react-compare-image](https://github.com/junkboy0315/react-compare-image).

## Features

- Vue 3 + TypeScript
- Horizontal and vertical comparison
- Keyboard accessibility (`ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`)
- Optional hover-driven interaction
- Custom handle and labels
- CI-gated lint, typecheck, test, build, docs build

## Documentation

- Website: https://vue3-compare-image.vercel.app
- Guide: [`docs/getting-started.md`](./docs/getting-started.md)
- API: [`docs/api-reference.md`](./docs/api-reference.md)
- Examples: [`docs/examples.md`](./docs/examples.md)

## Installation

```bash
pnpm add vue3-compare-image
# or
npm i vue3-compare-image
# or
yarn add vue3-compare-image
```

## Usage

### Global registration

```ts
import { createApp } from 'vue'
import VueCompareImage from 'vue3-compare-image'
import App from './App.vue'

createApp(App).use(VueCompareImage).mount('#app')
```

### Local registration

```vue
<script setup lang="ts">
import { VueCompareImage } from 'vue3-compare-image'
</script>

<template>
  <VueCompareImage
    left-image="/before.jpg"
    right-image="/after.jpg"
  />
</template>
```

### Type reference (optional)

```ts
/// <reference types="vue3-compare-image/client" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `leftImage` (required) | `string` | - | Left image URL |
| `rightImage` (required) | `string` | - | Right image URL |
| `vertical` | `boolean` | `false` | Use vertical comparison mode |
| `keyboard` | `boolean` | `false` | Enable keyboard navigation |
| `keyboardStep` | `number` | `0.01` | Slider step per keyboard press |
| `aspectRatio` | `'taller' \| 'wider'` | `'wider'` | Aspect ratio strategy |
| `handle` | `string \| number \| boolean` | `undefined` | Custom handle markup |
| `handleSize` | `number` | `40` | Handle size in px |
| `hover` | `boolean` | `false` | Move slider with hover/mousemove |
| `slideOnClick` | `boolean` | `true` | Move slider on click/tap |
| `leftImageAlt` | `string` | `''` | Left image alt text |
| `rightImageAlt` | `string` | `''` | Right image alt text |
| `leftImageCss` | `Record<string, string>` | `{}` | Inline styles for left image |
| `rightImageCss` | `Record<string, string>` | `{}` | Inline styles for right image |
| `leftImageLabel` | `string` | `undefined` | Left image label |
| `rightImageLabel` | `string` | `undefined` | Right image label |
| `skeleton` | `string \| number \| boolean` | `undefined` | Loading placeholder HTML |
| `sliderLineColor` | `string` | `'#ffffff'` | Slider line color |
| `sliderLineWidth` | `number` | `2` | Slider line width in px |
| `sliderPositionPercentage` | `number` | `0.5` | Initial slider position from `0` to `1` |
| `onSliderPositionChange` | `(position: number) => void` | `undefined` | Callback on slider position updates |

## Events

- `slideStart(position: number)`
- `slideEnd(position: number)`
- `isSliding(state: boolean)`

## Development

```bash
pnpm install
pnpm dev
```

### Quality gates

```bash
pnpm lint
pnpm typecheck
pnpm test:run
pnpm coverage
pnpm build
pnpm docs:build
```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md), [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md), and [SECURITY.md](./SECURITY.md) before contributing.
