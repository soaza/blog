---
slug: tailwind-connect
title: Takeaways from Tailwind Connect 2023
authors: [kg]
tags: [front-end, tailwind]
---

I recently came across the Keynote of Tailwind Connect 2023 which was a physical event featuring the Tailwind CSS team and discussions about the new stuff that the team is working on. I felt that there were alot of key takeaways from the event and shall try to compile the new stuff I've learnt in this post.

Heres the [link](https://youtu.be/CLkxRnRQtDE) to the keynote.

## Tailwind with Modern CSS

[Sam Selikoff](https://samselikoff.com/) spoke on modern CSS pseudo-classes and its (future) implementations in Tailwind which I felt was very helpful!

### Accent colors

Many times when we attempt to change the color of checkboxes or radio groups we attempt to use background color property and find out that it doesn't work. This is where accent colors come in, its changes accented color of a form control.

```jsx
<label>
  <input type="checkbox" checked> Browser default
</label>
<label>
  <input type="checkbox" class="accent-pink-500" checked> Customized
</label>
```

We get this:
<img src="https://res.cloudinary.com/ds94rr8md/image/upload/v1688914102/portfolio/nf6meczoq2iog1kn5vkv.png"/>

### `first` and `last` pseudo-class

Imagine that you have a grid display of cards to show on your page, but you want the additional logic of being able to have the first and and last cards to take up 2/3rd and 1 whole of the grid row respectively, something like this:

<img src="https://res.cloudinary.com/ds94rr8md/image/upload/v1688901598/portfolio/moomc1qkp2tj2guegqxd.png"/>

You would probably have to conditionally render the tailwind classes for the first and the last element with an approach similar to this:

```jsx
export const test = () => {
  const ARRAY_LENGTH = 6;
  const getColSpan = (index: number) => {
    return index === 0
      ? "col-span-2"
      : index === ARRAY_LENGTH - 1
      ? "col-span-3"
      : "col-span-1";
  };
  return (
    <div className="flex justify-center items-center p-4">
      <div className="grid grid-cols-3 gap-4">
        {[...Array(ARRAY_LENGTH)].map((_, index) => (
          <div
            className={`h-40 aspect-square rounded-md bg-slate-300 ${getColSpan(
              index
            )} w-full text-center`}
          >
            Card
          </div>
        ))}
      </div>
    </div>
  );
};
```

We can actually shorten our code using css pseudo-classes `first` and `last` which refers to the first and last child of the parents which would allow us to shift the logic purely into the css without any need for javascript logic:

```jsx
export const test2 = () => {
  const ARRAY_LENGTH = 6;

  return (
    <div className="flex justify-center items-center p-4">
      <div className="grid grid-cols-3 gap-4">
        {[...Array(ARRAY_LENGTH)].map((_, index) => (
          <div
            className={`h-80 aspect-square rounded-md bg-slate-300
            first:col-span-2 last:col-span-3 w-full text-center`}
          >
            Card
          </div>
        ))}
      </div>
    </div>
  );
};
```

### `even` and `odd` pseudo-class

Similar to the above, what if we wanted to apply conditional logic based on even/odd child? We can use `even` and `odd` pseudo-classes:

```jsx
const FRUITS = ["apple", "orange", "pear", "pineapple", "durian"];

return (
  <div className="flex flex-col h-screen items-center justify-center border-black border-2 w-1/4 place-self-center">
    {FRUITS.map((fruit) => (
      <div className="flex items-center mb-4 rounded-md border border-slate-300 border-solid p-4 even:bg-slate-300 w-full">
        {fruit}
      </div>
    ))}
  </div>
);
```

And this is the result:
<img src="https://res.cloudinary.com/ds94rr8md/image/upload/v1688913757/portfolio/vjugrkbl2w2gubuguom0.png"/>

### `@container` queries

<i>To be continued when Tailwind release support officially.</i>

## Oxide

Adam spoke about Oxide, which is v3.4 of Tailwind. Currently, experimental, many updates in this upcoming release which is quite exciting and massive improvements to the tailwind development experience.

### Improved performance

The parsing layer of tailwind which looks at all the HTML,JSX files and fine usage of Tailwind CSS classes and generates all the CSS is a parallelizable task which can be split across all the cores of the PC.

The new oxide engine reduces the compile time by almost two-fold.

### Simplified Configuration

QOL improvement: Simply importing tailwind css.

From this:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

To:

```css
@import "tailwindcss";
```

### Migrating CSS configs into CSS

Currently, tailwind manages all the themes-related CSS in tailwind.config.js.

For example, for fonts:

```js
 theme: {
    extend: {
      fontFamily: {
        sans: ["Inter","sans-serif"],
        display:["Satoshi","sans-serif"],
      }
    },
 }
```

In Oxide, we can remove this and migrate it onto the global css file:

```css
:theme {
  --font-family-sans: "Inter", "sans-serif";
  --font-family-display: "Satoshi", "sans-serif";
}
```

## Catalyst, React UI kit for Tailwind

Catalyst, a headless React UI was introduced which is a scaffolded boilerplate UI kit, similar to shadcn/ui. It gives dev more control over the UI components and customisation.

Won't cover it further in this post until it has been released officially very exciting for it as it integrates the best design frameworks from native designs.

## Thanks for reading!

I am a big fan of tailwindCSS and it has really made me a better front-end developer and improved my mastery of CSS. Hopefully, I get to attend a conference which features a tailwind keynote one day :D
