---
slug: 2023-eoy-reflections
title: Reflecting on my first 1/2 year of engineering
authors: [kg]
tags: [front-end, career]
---

I started working full-time as a front-end engineer in TikTok at the start of June this year! Its been about half a year since then, and seems like a good time to reflect on the takeaways of the past 1/2 year.

## Dichotomy between Code Quality and meeting product deadlines

The codebase I inherit wasn't the best but not exactly the most un-readable code.

Some examples of the code I saw was prop-drilling over > 3 layers of components, when a Context was already created. There were even some files with more than 500 lines of codes which can be abstracted into seperate components.

More often than not, I feel that this was probably due to the need to rush project deadlines which resulted in such cases.

Very often, the code review would only be done less than 2 days before the deployment or even on the deployment day itself, which resulted in reviewers hastily approving the code review without checking for the proper practices. There seems to be a belief that the QA would ensure the quality of the code by ensuring the feature works as expected.

Over the past 6 months, my team has implemented proper Code Review practices and even ensuring a weekly meeting to review each other's code which has been great! We learn a lot of neat tricks and common mistakes that one might miss when writing the code.

:::info

Do you see whats wrong with this line of code?

```tsx
<>{rows.length && rows.map((row) => <Row />)}</>
```

When `rows` is evaluated as an empty array(`[]`), `rows.length` evaluates to `0` and in React, `0` is not ignored [on render](https://legacy.reactjs.org/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored), which causes the component to render "0" as opposed to not evaluating the JSX.

An alternative approach:

```tsx
<>{rows.length > 0 && rows.map((row) => <Row />)}</>
```

:::

## Think about how others will read your code

Nowadays when i write production-ready code, I try to think of how my colleagues will review my code. Writing clean code is very opinionated and even for us React developers, we each have our own ways of implementing the same component. Writing the most optimised and abstracted solution might not always be the best and in a product driven environment, one might not simply have the luxury of refactoring pre-existing components. Write code that is **agreeable** and readable.

Fundamentals matter of course, the principles of DRY should strongly be adhered to, and to some extent the SOLID framework we learnt in college.

:::info
While I do think bugs are a matter of life and happen to everyone, there are ways we can avoid writing less bug-prone code.

Lets take a look at this for example:

```ts
const handleComplexFields = (url: string, body: string, users: Users[], isEditable: boolean) => {...}
```

A common bug that might arise in the future when re-using this function would be the developer passing in the body instead of the url in the first parameter, since both are typed as string, the Typescript compiler will not complain and everything compiles just fine.

My general rule of thumb when writing parameters for functions is to abstract it as an object when there are more than 2 parameters.
For example,

```ts
const handleComplexFields = ({url,body,users,isEditable}:
{url: string, body: string, users: Users[], isEditable: boolean}) => {...}
```

This ensures that our input parameters are mapped correctly and also allow us to introduce optional parameters done the road without refactoring the entire function.

```ts
const handleField = (body?: FormBody, optional: boolean) => {...}
// this is illegal in javascript as a required parameter cannot follow an optional parameter
```

:::

## Communication

Communication as a soft-skill is probably the most important trait behind writing code.

:::note
These are the people that I work with on a day-to-day basis:

- Back-end
- QA
- Product Manager
- Users (sometimes)
- Managers
- Other Front-ends

:::

More often than not, the person you are communicating might not know the issue that you might be facing.

For example, it's probably not a good idea to tell your product manager that supporting dark mode would not be possible in this requirement because you guys are using CSS-in-JS solution such as styled components to write CSS. It might be better to let them know that "this would require a decent amount of effort from the front-end side as our current solution does not have an optimal way of handling this right now".

Also, having a great working relationship with the back-end make less more simpler when we won't have to deal to blockers from either side.

## Infrastructure is a massive quality of life factor

When I first joined, the deployment infrastructure a massive headache to work with. I had a colleague that had to stay up till 11pm in the office and ultimately still couldn't deploy normally due to inherent issues with the deployment infrastructure.

The issues was mainly due to the fact that we worked with a monolithic codebase with over 30+ developers working on the same repository, as such, every time someone merge into master, the person deploying / getting approvals for their code review would have to rebase and restart the process. This was a nightmare to work with and made people dread deployment due to having to rebase several times and ensure their build passes.

A few months in, we switched to a [trunk-based approach](https://trunkbaseddevelopment.com/) which made the deployment process so much faster and efficient. Once the code review is done and following QA approval, our code can be merged within the build time (~10mins) and deployment would be done later on rather than Code Merge -> Deployment. The window for merge conflicts and possibility of having to rebase on each other's merges was reduced greatly and overall the deployment process was just that much more optimal to work with.

## Imposter Syndrome is real

Especially in the workplace where everyone has been an engineer for a while. Its probably for the best that we adopt a healthy attitude towards it and take it as a journey and not a competition. I do believe that software engineering is an amazing job that rewards creativity and passion, everything will be fine if we believe in ourselves.

## That's all for now

It been a pretty good journey so far in TikTok and I am blessed with amazing colleagues (for Singapore-based at least), excited for what 2024 will bring next and the stuff I will build next year!

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*zFDTdDonxDR5Rh-2rSDo9w.png"/>
