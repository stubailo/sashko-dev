---
title: "Typography.js: Using scale() and rhythm()"
date: "2020-08-11"
description: "Using a musical scale to define font sizes and layout"
imgUrl: "./typography.png"
published: true
---

Recently I've been working on this blog, starting with the [Gatsby Starter Blog template](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/). Looking through the code, I noticed a library I wasn't super familiar with: [Typography.js](https://kyleamathews.github.io/typography.js/).

I was intrigued to learn a new way to define type styles, especially since Typography.js was built by Kyle Mathews, the creator of Gatsby. Typography.js is build on a number of design concepts that I didn't quite understand, so I decided to dive in and learn more. This post is my attempt to explain what Typography.js does, why it's useful and interesting, and how to use it.

The two most important ideas in Typography.js are scale and rhythm, and we'll discuss each in turn.

## Scale

The first core concept behind Typography.js is that of a "typographic scale". Essentially, a typographic scale is like a musical scale, but for font sizes. You can read about it in detail in [this article by Spencer Mortensen](https://spencermortensen.com/articles/typographic-scale/), but I'll try to explain in short here.

### Why a typographic scale?

Every design needs lots of font sizes: body text, several levels of headings, smaller captions, footnotes, titles, etc. You can fiddle with numbers until you get something that looks good, but a typographic scale offers a different approach. You simply put in two parameters -- a base size and a scale ratio -- and then a harmonious set of font sizes is selected for you. This means you don't need to manually select sizes for every heading level, since you automatically get a set that works well together.

### How does it work?

You start with a base font size and a scale ratio. Then, instead of defining other font sizes by using an absolute point value, you instead set the size by referring to a power of the scale ratio.

So, for example, if your base font size is 17, and your scale ratio is 2, then:

```
scale(0)  = 17 * 2^0  = 17.0
scale(1)  = 17 * 2    = 34.0
scale(-1) = 17 * 2^-1 =  8.5
scale(2)  = 17 * 2^2  = 68.0
```

Let's refer to one multiple of a scale ratio as an "octave" -- just like in a musical scale, where a note double the frequency is called an octave away. Much like each octave in a musical scale is split into 12 notes, we can introduce options in between these sizes to have more sizes to pick from. Let's say that we want to split each octave into 5 notes:

import { ScaleExamples } from './ScaleExamples';

<ScaleExamples />

Now, we've got a selection of sizes that all have consistent ratios between themselves. I'm not sure whether or not these sizes are more pleasing to the eye than hand-picked ones, but it is convenient that we can easily generate additional font sizes without worrying about keeping consistency across all parts of our design.

### Using the scale() function

The above table is generated directly by passing values into the `scale()` function from Typography.js. Here's how you use it:

```js
import Typography from "typography";

const theme = {
  baseFontSize: "17px",
  baseLineHeight: "26px",
  scaleRatio: 2
};

const typography = new Typography(theme);
const { scale, rhythm } = typography;

const { fontSize, lineHeight } = scale(3 / 5);
// fontSize = 1.51572rem
// lineHeight = 2.29412rem
```

If you want to use this to style a node in React, you can use spreading to apply both the `fontSize` and `lineHeight` at once:

```js
import { scale } from "../my/utils/typography.js";

const el = <div style={{ ...scale(3 / 5) }}>Some content</div>;
```

This means we can easily pick out a font size for any element on our page that will be consistent with all of our other typography, and we can easily update our base font size and line height later on if we change our mind.

### Generating typographic styles for the whole page

Most of the time, we don't have to call `scale()` directly. For most content, we can use semantic elements like headings to do the work for us. So in the `gatsby-blog-starter`, you'll see this line:

```js
typography.injectStyles();
```

What this does is generate sizes for your headings based on a 5-note scale. Here's an excerpt from the [Typography.js source code](https://github.com/KyleAMathews/typography.js/blob/d07359cc0c3f0ba8d1f350d3bb861866cb981b8b/packages/typography/src/utils/createStyles.js#L248) where the scale values are selected for different headings:

```js
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

And that's how the font sizes for this blog post and website were set!

It's interesting that these values are hard-coded into the library. To be honest, I'm not sure if there's some science to how these numbers were picked out. Why `3 / 5` for h2 instead of `4 / 5`? I don't know, but it looks generally good so I haven't messed with it.

## Rhythm

The second core concept in Typography.js is "vertical rhythm". As the docs say:

> Typography.js provides a new dynamic unit called rhythm. This is taken from the line-height. One rhythm equals one line-height. When you change your line-height, every other spacing in your site will respond in turn.

You can read about vertical rhythm in detail in [Zell Liew's article here](https://zellwk.com/blog/why-vertical-rhythms/), but essentially it comes down to this: Your design looks more professional if all of your page elements have consistent height and spacing. And if that spacing is based on the line height of your text, then all of your font sizes, line heights, and spacing will fit together nicely. Bringing all these elements together is the magical part of Typography.js.

### The rhythm() function

Let's look again at our theme, and now also use the `rhythm()` function:

```js
import Typography from "typography";

const theme = {
  baseFontSize: "17px",
  baseLineHeight: "26px",
  scaleRatio: 2
};

const typography = new Typography(theme);
const { scale, rhythm } = typography;

const { fontSize, lineHeight } = scale(0);
// fontSize = 1rem
// lineHeight = 1.52941rem

const one = rhythm(1);
// one = 1.52941rem
```

As expected, one rhythm unit is equal to one line height. As opposed to `scale()`, `rhythm()` is quite simple:

```js
rhythm(x) = x * baseLineHeight;
```

So basically `rhythm()` is just a way for us to define other measurements in terms of our line-height. For example, we can use it to set height or margin:

```js
const el = (
  <div style={{ height: rhythm(1), marginBottom: rhythm(1.5) }}>Content</div>
);
```

If we do this consistently, then whenever we stack elements on top of each other they'll follow the overall rhythm of the page, and you'll have a nice vertical grid going based on your line height.

### When scale() interacts with rhythm()

If we want our whole page to have a consistent rhythm, this means our line heights need to snap to that rhythm as well. That's where the `lineHeight` part of `scale()` comes in -- it scales up the line height proportional to the font size, and then [rounds it to the nearest 1/2 rhythm](https://github.com/KyleAMathews/typography.js/blob/master/docs/what.md#adhere-to-a-vertical-rhythm-when-possible).

So, with a base line height of 26px, we get these line heights:

import { LineHeights } from './ScaleExamples';

<LineHeights />

As you can see, no matter what scale value or font size we select, Typography.js will snap the line height to a multiple of 13, to keep to a vertical rhythm of 1/2 of the base line height.

### Rhythm in the injected styles

As mentioned above, you usually use Typography.js to inject styles for the whole page at once:

```js
typography.injectStyles();
```

This doesn't just add some default font sizes for headings; in fact, it modifies the padding, borders, and margin of almost all HTML elements to align to your vertical rhythm. Below are some examples [from the source code](https://github.com/KyleAMathews/typography.js/blob/d07359cc0c3f0ba8d1f350d3bb861866cb981b8b/packages/typography/src/utils/createStyles.js#L148).

It makes `hr` elements not take up any space, to not offset the rhythm by an extra pixel:

```js
styles = setStyles(styles, "hr", {
  background: gray(80),
  border: "none",
  height: "1px",
  marginBottom: `calc(${blockMarginBottom} - 1px)`
});
```

It sets margin on list elements to match the rhythm:

```js
// ol, ul.
styles = setStyles(styles, ["ol", "ul"], {
  listStylePosition: "outside",
  listStyleImage: "none",
  marginLeft: vr.rhythm(1)
});
```

And more! [Check out the code](https://github.com/KyleAMathews/typography.js/blob/d07359cc0c3f0ba8d1f350d3bb861866cb981b8b/packages/typography/src/utils/createStyles.js#L148) to see all the things it does for you.

## Bringing it all together

After using `injectStyles` to set default styles for semantic HTML components, you can use `scale()` and `rhythm()` together to style complex components. Here's a snippet of code from this website:

```js
<header
  style={{
    maxWidth: rhythm(20),
    marginBottom: rhythm(2)
  }}
>
  <div style={{ display: "flex", alignItems: "baseline" }}>
    <h1
      style={{
        marginBottom: 0,
        marginRight: rhythm(1 / 2),
        ...scale(3 / 5)
      }}
    >
      {data.site.siteMetadata.title}
    </h1>
    <SocialIcons {...data.site.siteMetadata.social} />
  </div>

  <p style={{ marginBottom: rhythm(1 / 2) }}>
    {data.site.siteMetadata.description}
  </p>
</header>
```

If you use these methods to define your sizing and spacing, then your fonts, paddings, and margins will stay pleasingly consistent.

## Conclusion

I'm really glad that I dove into understanding Typography.js. I learned a ton of new design concepts, including type scales, vertical rhythm, and more. I'll definitely keep these concepts in mind for the future, and I'm glad that my blog is now built on top of these principles.

I should note that in addition to setting up scale and rhythm, Typography.js also allows you to set font weights, typefaces, and more -- however, I don't think these parts are as surprising and interesting as the concepts above, so I won't elaborate on them.

After going on this journey, I'm not sure it's helpful for new Gatsby users to include Typography.js in the official `gatsby-blog-starter` template. WI suspect that many people first learning Gatsby will see it as yet another thing they have to learn, or will simply ignore it. Typography.js is a valuable part of a web designer's toolbox, but given Gatsby's popularity I think it's worthwhile to keep the blog starter as simple as possible.

Overall, Typography.js is a great contribution to the space of web design. Thanks Kyle for the great library, and for all I learned while exploring it!
