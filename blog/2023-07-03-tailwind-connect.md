---
slug: tailwind-connect
title: Takeaways from Tailwind Connect 2023
authors: [kg]
tags: [front-end, tailwind]
---

I recently came across the Keynote of Tailwind Connect 2023 which was a physical event featuring the Tailwind CSS team and discussions about the new stuff that the team is working on. I felt that there were alot of key takeaways from the event and shall try to compile the new stuff I've learnt in this post.

Heres the [link](https://youtu.be/CLkxRnRQtDE) to the keynote.

## Tailwind with Modern CSS

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
  return (
    <div className="flex justify-center items-center p-4">
      <div className="grid grid-cols-3 gap-4">
        {[...Array(10)].map((_, index) => (
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
