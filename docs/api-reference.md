---
title: API Reference
outline: deep
---

# API Reference

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `leftImage` | `string` | required | Left image URL |
| `rightImage` | `string` | required | Right image URL |
| `vertical` | `boolean` | `false` | Enables vertical slider mode |
| `keyboard` | `boolean` | `false` | Enables arrow-key navigation |
| `keyboardStep` | `number` | `0.01` | Slider movement amount per key press |
| `aspectRatio` | `'taller' \| 'wider'` | `'wider'` | Chooses ratio strategy when source images differ |
| `handle` | `string \| number \| boolean` | `undefined` | Custom handle HTML |
| `handleSize` | `number` | `40` | Handle size in px |
| `hover` | `boolean` | `false` | Moves slider on hover |
| `slideOnClick` | `boolean` | `true` | Slides to click/tap position |
| `leftImageAlt` | `string` | `''` | Alt text for left image |
| `rightImageAlt` | `string` | `''` | Alt text for right image |
| `leftImageCss` | `object` | `{}` | Additional inline styles for left image |
| `rightImageCss` | `object` | `{}` | Additional inline styles for right image |
| `leftImageLabel` | `string` | `undefined` | Label shown on left image |
| `rightImageLabel` | `string` | `undefined` | Label shown on right image |
| `skeleton` | `string \| number \| boolean` | `undefined` | Loading placeholder HTML |
| `sliderLineColor` | `string` | `'#ffffff'` | Slider line color |
| `sliderLineWidth` | `number` | `2` | Slider line width in px |
| `sliderPositionPercentage` | `number` | `0.5` | Initial slider position (`0` to `1`) |
| `onSliderPositionChange` | `(position: number) => void` | `undefined` | Callback on every slider position update |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `slideStart` | `number` | Fires when interaction starts |
| `slideEnd` | `number` | Fires when interaction ends |
| `isSliding` | `boolean` | Emits current sliding state |
