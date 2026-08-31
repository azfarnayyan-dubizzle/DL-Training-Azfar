# Computer Systems & Runtime Assignment

## 1. CPU Core vs Thread

### CPU Core

A CPU core is a physical processing unit inside the CPU.

For example, a 4-core CPU has 4 physical cores that can do work.

### Thread

A thread is a sequence of instructions that a CPU can execute.

A CPU core can handle one or more threads depending on the CPU.

### Simple Example

Think of:

- CPU = Restaurant
- CPU Core = Chef
- Thread = Order

If a restaurant has 4 chefs, it can work on multiple orders at the same time.

### Difference

| CPU Core | Thread |
|---|---|
| Physical part of the CPU | Unit of work/execution |
| Does the actual processing | Contains instructions to be processed |
| Example: 4 cores | Example: 8 threads |

---

## 2. Where is a Variable Stored: Stack or Heap?

In Node.js, JavaScript runs mainly on the V8 JavaScript engine.

A simple way to understand memory is:

- **Stack**: Used for function calls and local execution data.
- **Heap**: Used for objects and dynamically allocated data.

Example:

```javascript
function greet() {
    let name = "Azfar";

    let user = {
        name: "Azfar",
        age: 25
    };
}
```

A simple mental model is:

```text
Stack                  Heap

name                   user object
"Azfar"                ├── name
                       └── age
```

The `user` variable contains a reference to an object, while the object is stored in the heap.

> Note: This is a simple learning model. The V8 engine can optimize how values are actually stored, so not every variable is always physically stored exactly this way.

---

## 3. Why is RAM Faster Than an SSD?

RAM is faster than an SSD because RAM is designed for very fast access while programs are running.

### RAM

RAM is temporary memory used by running programs.

```text
CPU
 ↓
RAM
```

RAM is volatile, which means its data is lost when the computer is turned off.

### SSD

An SSD is used for permanent storage.

```text
CPU
 ↓
RAM
 ↓
SSD
```

Data on an SSD remains after the computer is turned off.

### Simple Example

Think of:

- **RAM = Your desk**
- **SSD = Your storage cabinet**

Your desk is faster to access, but it has limited space.

The storage cabinet is slower to access, but it can store much more information.

### Main Difference

| RAM | SSD |
|---|---|
| Very fast | Slower than RAM |
| Temporary/volatile | Permanent/non-volatile |
| Used by running programs | Used for long-term storage |
| Usually smaller | Usually larger |
| More expensive per GB | Cheaper per GB |

### Simple Flow

```text
SSD
 ↓
Load program/data
 ↓
RAM
 ↓
CPU
 ↓
Program runs
```

---

# Summary

- A **CPU core** is a physical processing unit.
- A **thread** is a sequence of work that can be executed by a CPU.
- The **stack** is mainly used for function execution and local data.
- The **heap** is mainly used for objects and dynamically allocated data.
- **RAM** is faster and used for active programs.
- **SSD** is slower but provides permanent storage.
