/* VARIABLES */
var a = 1;     // function scoped, can be redeclared/reassigned
let b = 2;     // block scoped, can be reassigned, not redeclared
const c = 3;   // block scoped, cannot be reassigned

// TDZ & HOISTING

/* DATA TYPES */
const numType = 10;                 // Number
const strType = "hello";            // String
const boolType = true;              // Boolean
let undefType;                      // Undefined
const nullType = null;              // Null
const arrType = [1, 2, 3];          // Array (non-primitive)
const objType = { key: "value" };   // Object (non-primitive)
function funcType() { }             // Function (non-primitive)
const symType = Symbol("id");       // Symbol - always unique

console.log(typeof numType, typeof strType, typeof boolType, typeof arrType, typeof objType);


/* OPERATORS */
let x = 5, y = 3;
x + y; x - y; x * y; x / y; x % y; x ** y;   // arithmetic
x++; x--; ++x; --x;                          // increment/decrement
x > y; x < y; x >= y; x <= y;                // comparison
x == y;   // loose equal
x === y;  // strict equal 
x != y; x !== y;
x && y;   // AND
x || y;   // OR
!x;       // NOT
x = y;  x += y;  x -= y;  x *= y;  x /= y;   // assignment

// Nullish coalescing: use right side ONLY if left is null/undefined
const val = null ?? "default";       // "default"
// Optional chaining safely access nested properties
const obj = { a: { b: 1 } };
console.log(obj?.a?.b);              // 1
console.log(obj?.x?.y);              // undefined, no error



/* FUNCTIONS */
// Function declaration hoisted, can be called before it's defined
function add(x, y) {
    return x + y;
}

// Function expression not hoisted
const subtract = function (x, y) {
    return x - y;
};

// Arrow function - shorter syntax, no own "this"
const multiply = (x, y) => x * y;
const square = n => n * n;
const greet = () => "hello";        

// Default parameters
function power(base, exp = 2) {
    return base ** exp;
}

// Rest parameters gathers extra args into an array
function sumAll(...nums) {
    return nums.reduce((total, n) => total + n, 0);
}
console.log(sumAll(1, 2, 3, 4)); // 10

// Immediately Invoked Function Expression (IIFE)
(function () {
    console.log("runs immediately");
})();


/* BUILT-IN CONVERSION FUNCTIONS */
parseInt("100.45");      // 100
parseFloat("123.45abc"); // 123.45
isNaN("hello");           // true
Number("123");             // 123
String(123);                // "123"
Boolean(0);                  // false


/* ARRAYS */
let arr = [10, 20, 30];

arr.push(40);              // add to end          -> [10,20,30,40]
arr.pop();                  // remove from end     -> [10,20,30]
arr.unshift(0);            // add to start         -> [0,10,20,30]
arr.shift();                 // remove from start   -> [10,20,30]
arr.splice(1, 1);           // remove 1 item at index 1 -> [10,30]
arr.splice(1, 0, 20);      // insert 20 at index 1 -> [10,20,30]
arr.reverse();               // -> [30,20,10]
arr.concat([40, 50]);       // merges arrays, returns new array
arr.slice(1, 2);            // copies a portion, doesn't mutate
arr.indexOf(20);            // first index of value
arr.lastIndexOf(20);        // last index of value
arr.includes(20);           // true/false
arr.join("-");               // "30-20-10"
arr.sort();                  // sorts in place (as strings by default!)
arr.sort((a, b) => a - b);  // correct numeric sort


/* HIGHER ORDER ARRAY METHODS/FUNCTIONS */
const nums = [1, 2, 3, 4, 5];

nums.map(n => n * 2);                 // [2,4,6,8,10] transform 
nums.filter(n => n % 2 === 0);        // [2,4] keep items matching condition
nums.reduce((total, n) => total + n, 0); // 15 collapse array to one value
nums.forEach(n => console.log(n));    // just loops, returns undefined
nums.find(n => n > 3);                 // 4 first match
nums.findIndex(n => n > 3);           // 3 index of first match
nums.some(n => n > 4);                 // true at least one matches
nums.every(n => n > 0);                // true all match


/* LOOPS */
for (let i = 0; i < 3; i++) console.log(i);

let i = 0;
while (i < 3) { console.log(i); i++; }

let j = 0;
do { console.log(j); j++; } while (j < 3);

const person = { name: "Alex", age: 30 };
for (const key in person) console.log(key, person[key]); 

for (const val of nums) console.log(val); 


/* CONDITIONALS */
const score = 85;
if (score >= 90) {
    console.log("A");
} else if (score >= 80) {
    console.log("B");
} else {
    console.log("C");
}

const status = score >= 60 ? "pass" : "fail";

switch (status) {
    case "pass":
        console.log("You passed");
        break;
    case "fail":
        console.log("You failed");
        break;
    default:
        console.log("Unknown");
}


/* STRINGS */
const str = "Hello World";
str.length;
str.charAt(0);              
str.toUpperCase();          
str.toLowerCase();          
str.indexOf("World");      
str.slice(0, 5);            
str.substr(6);               
str.split(" ");         
str.replace("World", "JS");
str.trim();                   
str.includes("World");      
str.concat(" !");           

// Template literals preferred way to build strings
const name = "Alex";
console.log(`Hello, ${name}! 2 + 2 = ${2 + 2}`);


/* OBJECTS */
const user = {
    firstName: "Geek",
    lastName: "Fox",
    greet() { return `Hi, I'm ${this.firstName}`; } 
};

Object.keys(user);           
Object.values(user);         
Object.entries(user);        
Object.assign({}, user);  

// Destructuring - pull values out into variables
const { firstName, lastName } = user;

// Spread - copy/merge objects or arrays
const updatedUser = { ...user, age: 30 };
const combinedArr = [...nums, 6, 7];


/* CLASSES */
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        return `${this.name} makes a sound.`;
    }
    static info() {                  // static = called on the class itself
        return "Animal class";
    }
}

// Inheritance with extends + super
class Dog extends Animal {
    constructor(name, breed) {
        super(name);                 // calls the parent constructor
        this.breed = breed;
    }
    speak() {                        // overrides the parent method
        return `${this.name} barks.`;
    }
}

const rex = new Dog("Rex", "Labrador");
console.log(rex.speak());          


/* ERROR HANDLING */
try {
    JSON.parse("not valid json");    // this will throw
} catch (err) {
    console.log("Caught:", err.message);
} finally {
    console.log("Runs no matter what — cleanup goes here");
}

// Throwing your own errors
function checkAge(age) {
    if (age < 0) throw new Error("Age cannot be negative");
    return age;
}


/* CALLBACKS */

function fetchDataCallback(callback) {
    setTimeout(() => {
        callback("data loaded");
    }, 1000);
}
fetchDataCallback(result => console.log(result));

// Callback hell (why Promises exist): nested callbacks get messy
// step1(function(a){ step2(a, function(b){ step3(b, function(c){ ... }) }) })


/* PROMISES */
// A Promise represents a value that will exist LATER (pending/fulfilled/rejected)
const myPromise = new Promise((resolve, reject) => {
    const success = true;
    setTimeout(() => {
        success ? resolve("Success!") : reject("Failed!");
    }, 1000);
});

myPromise
    .then(result => console.log(result))   // runs if resolved
    .catch(err => console.log(err))        // runs if rejected
    .finally(() => console.log("done"));   // always runs

Promise.all([Promise.resolve(1), Promise.resolve(2)])   // waits for all, fails if any fails
    .then(results => console.log(results));              // [1, 2]

Promise.race([myPromise, Promise.resolve("fast")])       // resolves with whichever finishes first
    .then(result => console.log(result));

Promise.allSettled([Promise.resolve(1), Promise.reject("err")]) // waits for all never rejects
    .then(results => console.log(results));


/* ASYNC / AWAIT */
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadData() {                 // async function ALWAYS returns a Promise
    console.log("Loading started");
    await wait(1000);                        // pauses here until the Promise resolves
    console.log("Loading finished");
    return "data";
}

async function run() {
    try {
        const data = await loadData();       // await = "pause until this resolves"
        console.log(data);
    } catch (err) {
        console.log("Error:", err);          // catches rejected promises too
    }
}
run();


/* REGULAR EXPRESSIONS */
const re = /\S+@\S+\.\S+/;       // basic email pattern
re.test("abc@gmail.com");         // true
"abc@gmail.com".match(re);        // returns match details or null

// common patterns: [abc] one of a/b/c | [0-9] a digit | (x|y) x or y
// common metacharacters: . any char | \d digit | \s whitespace | \w word char
// common quantifiers: n+ one or more | n* zero or more | n? zero or one | n{3} exactly 3


/* DATE OBJECT */
const now = new Date();
now.getDate();        // day of month (1-31)
now.getDay();          // weekday (0-6, 0 = Sunday)
now.getMonth();        // month (0-11!)
now.getFullYear();     // 4-digit year
now.getHours();
now.getMinutes();
now.getTime();          // milliseconds since Jan 1, 1970
Date.now();              // current timestamp in ms


/* MATH OBJECT */
Math.PI;
Math.round(4.6);      // 5
Math.floor(4.6);      // 4
Math.ceil(4.1);        // 5
Math.max(1, 5, 3);    // 5
Math.min(1, 5, 3);     // 1
Math.sqrt(16);          // 4
Math.pow(2, 3);         // 8
Math.random();           // random number 0-1


/* DOM MANIPULATION */
/*
document.getElementById("id");
document.querySelector(".class");
document.querySelectorAll("div");
element.textContent = "new text";
element.innerHTML = "<b>bold</b>";
element.setAttribute("class", "box");
element.getAttribute("class");
element.classList.add("active");
element.classList.remove("active");
element.classList.toggle("active");
element.appendChild(newElement);
element.removeChild(childElement);
element.addEventListener("click", handlerFunction);
*/


/* EVENTS */
/*
onclick, onchange, onmouseover, onmouseout, onkeyup, onkeydown,
onload, onfocus, onblur, onsubmit, ondrag, oninput
Modern preferred way: element.addEventListener("click", fn);
*/


/* JSON */
const jsonString = JSON.stringify({ name: "Alex", age: 30 }); // object -> string
const parsedObj = JSON.parse(jsonString);                      // string -> object


/* MODULES */
/*
// file: math.js
export function add(a, b) { return a + b; }
export default function multiply(a, b) { return a * b; }

// file: app.js
import multiply, { add } from './math.js';
*/


/* MAP & SET */
const map = new Map();
map.set("key1", "value1");
map.get("key1");            // "value1"
map.has("key1");             // true
map.delete("key1");

const set = new Set([1, 2, 2, 3]);  // duplicates auto-removed -> {1,2,3}
set.add(4);
set.has(2);                          // true


console.log("Azfar Nayyan Cheat Sheet For JS at DUBIZZLE LABS");
