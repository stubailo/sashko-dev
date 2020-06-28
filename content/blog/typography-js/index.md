---
title: "Typography.js: Using scale() and rhythm()"
date: "2020-04-27"
description: "Using a musical scale to define font sizes and layout"
imgUrl: "./salty_egg.jpg"
published: true
---

I was recently working on blog blah blah

Included in default Gatsby theme -- maybe not a good idea

Refs: https://kyleamathews.github.io/typography.js/
https://github.com/KyleAMathews/typography.js/issues/156
https://github.com/KyleAMathews/typography.js/tree/master/docs
https://github.com/KyleAMathews/typography.js/blob/master/docs/what.md

## What's a scale

http://spencermortensen.com/articles/typographic-scale/

Resonates because often when I'm designing a website I feel like I'm picking random pixel numbers for both text and spacing. 8px was common

## Defining a theme

```js
import Typography from "typography";

const theme = {
  baseFontSize: "17px",
  baseLineHeight: "26px"
};
```

## Rhythm

Blah blah for spacing

Blah blah defaults

## Scale

import { ScaleExamples } from './ScaleExamples';

<ScaleExamples />

## Default styles

https://github.com/KyleAMathews/typography.js/blob/34a98113ac6117ca74a8641adab9be8994abfe9f/packages/typography/src/utils/createStyles.js

```js
// Set header sizes.
const h1 = vr.scale(5 / 5);
const h2 = vr.scale(3 / 5);
const h3 = vr.scale(2 / 5);
const h4 = vr.scale(0 / 5);
const h5 = vr.scale(-1 / 5);
const h6 = vr.scale(-1.5 / 5);

each([h1, h2, h3, h4, h5, h6], (header, i) => {
  styles = set(styles, `h${i + 1}.fontSize`, header.fontSize);
  styles = set(styles, `h${i + 1}.lineHeight`, options.headerLineHeight);
});
```

## Pros and cons

- Scale approach seems good
- Default styles look odd to me in a few places
- The library isn't as easy to use directly if you're trying to use CSS rather than CSS in JS, but could easily be modified to use CSS classes for layout
- Maybe shouldn't be included as the default gatsby starter -- very opinionated
- I learned something
