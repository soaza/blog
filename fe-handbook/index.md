---
slug: /
title: Learning Front-End
authors: [kg]
tags: [front-end]
---

Just my documentation on all the front-end concepts I have came across as a developer.

## Javascript

### Arrow vs Non-Arrow

```jsx
class Person {
  constructor(name) {
    this.name = name;
  }

  printNameArrow() {
    setTimeout(() => console.log(this.name));
  }

  printNameFunction() {
    setTimeout(function () {
      console.log(this.name);
    });
  }
}

let person = new Person("Bob");
person.printNameArrow();
// prints 'Bob'
person.printNameFunction();
// prints nothing

//Arrow function does not redefine this keyword.
// this value inside of an arrow function always equals
// this value from the outer function
```

→ Arrow function does not redefine this keyword.
→ _this_ value inside of an arrow function always equals _this_ value from the outer function

### Binding

```jsx
let obj = {
  x: 5,
};

function printCoord() {
  console.log(this.x);
}

let callF = printCoord.bind(obj);
callF();
//prints 5
```

→ Binds a function to an object for _this_ to be referenced

→ cannot rebind this in an arrow function. It will always be defined as the context in which it was defined.

### Debounce in Javascript

```jsx
const debounce = (fn, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, timeout);
  };
};
const saveInput = () => {
  console.log("hi");
};
const change = debounce(() => saveInput(), 3000);
```

### DOM Event Delegation

When an event is triggered on an element, the following occurs:

The event is dispatched to its target `EventTarget`and any event listeners found there are triggered.

_Bubbling_ events will then trigger any additional event listeners found by following the `EventTarget`'s parent chain *upward*, checking for any event listeners registered on each successive EventTarget. This upward propagation will continue up to and including the `Document`.

```jsx
<ul onclick="alert(event.type + '!')">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>

// any click on the child <li> nodes will trigger the alert

// by binding the event handler to a single parent element, the handle will be executed whenever the event occurs on any of the child nodes
```

### Function Expression vs Function Declaration

_Function Declaration:_ a function, declared as a separate statement, in the main code flow:

```jsx
// Function Declaration
function sum(a, b) {
  return a + b;
}
```

```jsx
// Function Expression
let sum = function (a, b) {
  return a + b;
};
```

**A Function Expression is created when the execution reaches it and is usable only from that moment.**

Once the execution flow passes to the right side of the assignment `let sum = function…` – here we go, the function is created and can be used (assigned, called, etc. ) from now on.

Function Declarations are different.

**A Function Declaration can be called earlier than it is defined.**

For example, a global Function Declaration is visible in the whole script, no matter where it is.

That’s due to internal algorithms. When JavaScript prepares to run the script, it first looks for global Function Declarations in it and creates the functions. We can think of it as an “initialization stage”.

And after all Function Declarations are processed, the code is executed. So it has access to these functions.

```jsx
sayHi("John"); // Hello, John

function sayHi(name) {
  alert(`Hello, ${name}`);
}
```

**In strict mode, when a Function Declaration is within a code
block, it’s visible everywhere inside that block. But not outside of it.**

For instance, let’s imagine that we need to declare a function `welcome()` depending on the `age` variable that we get during runtime. And then we plan to use it some time later.

If we use Function Declaration, it won’t work as intended:

```jsx
let age = prompt("What is your age?", 18);

// conditionally declare a function
if (age < 18) {
  function welcome() {
    alert("Hello!");
  }
} else {
  function welcome() {
    alert("Greetings!");
  }
}

// ...use it later
welcome(); // Error: welcome is not defined
```

That’s because a Function Declaration is only visible inside the code block in which it resides.

```jsx
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {
  welcome = function () {
    alert("Hello!");
  };
} else {
  welcome = function () {
    alert("Greetings!");
  };
}

welcome(); // ok now
```

### Event Loop

→ Javascript is single threaded

From: [https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)

![https://res.cloudinary.com/practicaldev/image/fetch/s--44yasyNX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gid1.6.gif](https://res.cloudinary.com/practicaldev/image/fetch/s--44yasyNX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gid1.6.gif)

![https://res.cloudinary.com/practicaldev/image/fetch/s--d_n4m4HH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif2.1.gif](https://res.cloudinary.com/practicaldev/image/fetch/s--d_n4m4HH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif2.1.gif)

![https://res.cloudinary.com/practicaldev/image/fetch/s--MewGMdte--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif3.1.gif](https://res.cloudinary.com/practicaldev/image/fetch/s--MewGMdte--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif3.1.gif)

![https://res.cloudinary.com/practicaldev/image/fetch/s--b2BtLfdz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif4.gif](https://res.cloudinary.com/practicaldev/image/fetch/s--b2BtLfdz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif4.gif)

![https://res.cloudinary.com/practicaldev/image/fetch/s--NYOknEYi--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif5.gif](https://res.cloudinary.com/practicaldev/image/fetch/s--NYOknEYi--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif5.gif)

```jsx
const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"), 500);
const baz = () => console.log("Third");

bar();
foo();
baz();

// First
// Third
// Second
```

![https://res.cloudinary.com/practicaldev/image/fetch/s--BLtCLQcd--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif14.1.gif](https://res.cloudinary.com/practicaldev/image/fetch/s--BLtCLQcd--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif14.1.gif)

The **call stack** is responsible for keeping track of all the operations in line to be executed. Whenever a function is finished, it is popped from the stack.

The **event queue**
 is responsible for sending new functions to the stack for processing. It follows the queue data structure to maintain the correct sequence in which all operations should be sent for execution.

Whenever an async function is called, it is sent to a *browser API*. These are APIs built into the browser. Based on the command received from the call stack, the API starts its own single-threaded operation.

An example of this is the `setTimeout` method. When a `setTimeout` operation is processed in the stack, it is sent to the corresponding API which waits till the specified time to send this operation back in for processing.

Where does it send the operation? The *event queue*. Hence, we have a cyclic system for running async operations in JavaScript. The language itself is single-threaded, but the browser APIs act as separate threads.

The event loop facilitates this process; it **constantly checks whether or not the call stack is empty**. If it is empty, **new functions are added from the event queue**. If it is not, then the current function call is processed.

```jsx
console.log("Hi!");

setTimeout(() => {
  console.log("Execute immediately.");
}, 0);

console.log("Bye!");

// javascript engine places the callback on the callback queue and executes
// it when the call stack is empty

/* prints:
Hi!
Bye!
Execute immediately.
*/
```

### Garbage collection

The main concept of memory management in JavaScript is _reachability_.

Simply put, “reachable” values are those that are accessible or usable somehow. They are guaranteed to be stored in memory.

1. There’s a base set of inherently reachable values, that cannot be deleted for obvious reasons.

   For instance:

   - The currently executing function, its local variables and parameters.
   - Other functions on the current chain of nested calls, their local variables and parameters.
   - Global variables.
   - (there are some other, internal ones as well)

   These values are called _roots_.

2. Any other value is considered reachable if it’s reachable from a root by a reference or by a chain of references.

   For instance, if there’s an object in a global variable, and that object has a property referencing another object, _that_ object is considered reachable. And those that it references are also reachable. Detailed examples to follow.

```jsx
// user has a reference to the object
let user = {
  name: "John"
};`
```

The global variable `"user"` references the object `{name: "John"}` (we’ll call it John for brevity). The `"name"` property of John stores a primitive, so it’s painted inside the object.

If the value of `user` is overwritten, the reference is lost:

`user = null;`

Now John becomes unreachable. There’s no way to
access it, no references to it. Garbage collector will junk the data and
free the memory.

### Symbols

```jsx
let lib = {
  name: "ABC",
};

lib["id"] = 5;
lib["id"] = 6; // The value is changed because it is String [KEY]!!

lib[Symbol("id")] = 123;
lib[Symbol("id")] = 124; //Not changed

console.log(lib); // { name: "ABC", id: 6, Symbol(id): 123, Symbol(id): 124 }
```

### Hoisting

In JavaScript, a variable can be declared after it has been used.

In other words; a variable can be used before it has been declared.

```jsx
greet();
// Hi there.

function greet() {
  console.log("Hi, there.");
}
```

### Prototypes

Functions can be executed as a constructor function using `new` keyword.

```jsx
function Particle() {
  this.x = 100;
  this.y = 99;
}

var p = new Particle();
// p is assigned to *this*
```

Every object in JavaScript has a built-in property, which is called its **prototype.**
The prototype is itself an object, so the prototype will have its own prototype, making what's called a **prototype chain.**

The chain ends when we reach a prototype that has `null` for its own prototype.

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e6a52149-426a-444b-8016-388bccb8cbc8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230323T133448Z&X-Amz-Expires=86400&X-Amz-Signature=2720a2befaa8f66c24bc836e498c6ea814cbdcfeb715959c40bd07f56bc72f32&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

## Javascript Code Quality

### Transpilers

→translates source code to another source code

→It can parse (“read and understand”) modern code and rewrite it using older syntax constructs, so that it’ll also work in outdated engines.

```jsx
/*
E.g. JavaScript before year 2020 didn’t have the “nullish coalescing operator” ??.
So, if a visitor uses an outdated browser,
it may fail to understand the code like height = height ?? 100.

A transpiler would analyze our code and rewrite height ?? 100 into
(height !== undefined && height !== null) ? height : 100.
**/

// before running the transpiler
height = height ?? 100;

// after running the transpiler
height = height !== undefined && height !== null ? height : 100;
```

→ [Babel](https://babeljs.io/) is one of the most prominent transpilers out there.

→ Modern project build systems, such as [webpack](https://webpack.js.org/), provide a means to run a transpiler automatically on every code change, so it’s very easy to integrate into the development process.

### Polyfills

→A script that updates/adds new functions is called “polyfill”. It “fills in” the gap and adds missing implementations.

→ New language features may include not only syntax constructs and operators, but also built-in functions.

→For example, `Math.trunc(n)` is a function that “cuts off” the decimal part of a number, e.g `Math.trunc(1.23)` returns `1`.

In some (very outdated) JavaScript engines, there’s no `Math.trunc`, so such code will fail.

```jsx
//the polyfill for Math.trunc is a script that implements it, like this

if (!Math.trunc) {
  // if no such function
  // implement it
  Math.trunc = function (number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

## CSS

### `::before` and `::after` pseudo-element

`::before` and `::after` creates a pseudo-element that is the first/last child of the selected element. It is often used to add cosmetic content to an element with the content property. It is inline by default.

For example: This adds 🔗 to before every `a` tag and adds a `(Press the link)` to after the `a` tag.

```css
a::before {
  content: "🔗";
}

a::before {
  content: "(Press the link)";
}
```

🔗 <a target="\_blank" href="https://web.dev">web.dev</a>(Press the link)

## React

### Virtual DOM in React

→ DOM: Document Object Model

→ Every time state changes, the entire DOM gets updated ⇒ too slow and inefficient

→Every time state changes, the entire virtual DOM gets updated and compared to its previous state's DOM(diff-ing), React figures out which objects have changed.

→Only the changed objects gets updated on the real DOM (reconcilation)

### Life Cycle of React

**Mounting →** first time the component gets rendered and shown, runs only 1 time

```jsx
useEffect(() => {}, []); // componentDidMount
```

**Updating →** re-rendered when a prop that gets passed in the component changes and when a state variable within the component changes

**Un-mounting →** when we no longer want to show the react component

```jsx
useEffect(() => {
return () => {console.log("The component has unmounted"},[]) // unmounted
```
