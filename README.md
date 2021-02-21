# Next Portfolio Starter
A portfolio starter using:

- `next.js`
- `tailwindcss`
- `storybook`
- `netlify cms`

:warning: __READ THIS__ :warning:
This starter is intended for exported static sites. Think of it like an opinionated hybrid of `11ty` with `React`. It's intended to be used with `Netlify`. That gives us the opportunity to use all of the Netlify "perks" such as `CMS`, `forms`, `functions`, `analytics`, etc. with ease. All that whilst still being able to use the DX of Next.js.
## Image Optimisation Options
Image optimisation __isn't__ straight forward.
You've got options here. I've tried to cover the bases how I might go about it. The cool thing is, you can use both. They're not mutually exclusive. But, they do work differently.

### Using `Image` with `sharp` optimisation
Going with this option means that you use images normally as you would by putting them inside `/public`. However, you use the `Image` component located at `@/components/image`.

```jsx
<Image
  className="w-24 h-24"
  src="/images/awesome.jpg"
  alt="An awesome picture"
  width={250}
  height={250}
  sizes={['(max-width: 400px) 100px', '250px']}
/>
```
It's like a normal `img` but you can pass it `sizes`. And these sizes get applied to `source` elements within a `picture` element. At build time, any images that need to be, get optimised. Under the hood, `sharp` processes images in the `public` folder that use this component. The output directory defaults to `enhanced/images`.

For example, at build time, the component above renders.

```html
<picture data-sizes="(max-width: 400px) 100px,250px" class="block w-24 h-24">
  <source
    type="image/avif"
    srcset="/enhanced/images/awesome_100.avif 100w,/enhanced/images/awesome_250.avif 250w"
    sizes="(max-width: 400px) 100px,250px">
  <source
    type="image/webp"
    srcset="/enhanced/images/awesome_100.webp 100w,/enhanced/images/awesome_250.webp 250w"
    sizes="(max-width: 400px) 100px,250px">
  <source
    type="image/png"
    srcset="/enhanced/images/awesome_100.png 100w,/enhanced/images/awesome_250.png 250w"
    sizes="(max-width: 400px) 100px,250px">
  <img
    src="/images/awesome.jpg"
    alt="An awesome picture"
    class="h-full w-full object-cover"
    loading="lazy"
    decoding="async"
    width="250"
    height="250">
</picture>
```

Need to pass styles down to that nested image? Use the `imgProps` prop to pass things down.

```jsx
<Image
  className="w-24 h-24"
  imgProps={{
    className: "h-full w-full object-cover",
  }}
  src="/images/awesome.jpg"
  alt="An awesome picture"
  width={250}
  height={250}
  sizes={['(max-width: 400px) 100px', '250px']}
/>
```
You can optimise in various formats supported by `sharp`. Export a config from `n3xt.config.js` with the formats you want to use.

```javascript
module.exports = {
  images: {
    types: ['avif', 'webp', 'png'],
  },
}
```

__NOTE::__ This is all __very__ opinionated. I'd recommend digging into the components and the image optimisation code. Tweak `transforms/img-optimisation.js` to your tastes.

---

This method works by building the project using `next build` as normal. But, it then scrapes the build output and generates  optimised assets before export. Assets are only generated when needed. If they already exist, they aren't generated again unless deleted.

### Using `next/image`
Now for `next/image`. It works the same as usual. But, you'll hit issues if you try exporting with the `default` loader. Using a CDN for images that use `next/image` is the option here. But, you don't want to use up all your bandwidth whilst working on your site!

For this, use environment variables. Store the path for your CDN provider in `.env.local`.

And then switch between loader based on `process.env.NODE_ENV`. For example, with `cloudinary`.

```javascript
module.exports = {
  images: {
    loader: process.env.NODE_ENV !== 'production' ? 'default' : 'cloudinary',
    domains: ['res.cloudinary.com', 'localhost'],
    ...(process.env.NODE_ENV === 'production' && {
      path: process.env.CLOUDINARY_PATH,
    }),
  },
}
```

The caveat here is that you must mirror the media paths from your CDN provider to your public folder.

For example,
```
https://res.cloudinary.com/<username>/image/upload/images/awesome.png
```

Would map to.
```
/public/images/awesome.png
```