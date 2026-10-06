# TypeScript Assignment - MCQ Answers

## Question 1: What is the compile-time type of value?
const arr = [1, "two", 3] as const;
const value = arr[1];

**Answer: B**

## Question 2
**Given the following, what error (if any) occurs, and why?**
interface A { x: number; y?: number; }
class C implements A {
  x = 0;
}
const c = new C();
c.y = 10;

**Answer: B. Error: Property 'y' does not exist on type 'C, implementing an interface with an optional property doesn't create that property on the class itself**


## Question 3
**What does the following code print, and why?**

enum Status { Active = "ACTIVE", Inactive = "INACTIVE" }
enum Level { Active = "ACTIVE", Low = "LOW" }
function check(s: Status) { return s; }
check(Level.Active);

**Answer: B. Compile-time error, string enum members are nominally typed, so Level.Active isn't assignable to Status despite identical string value**

## Question 4
**What is the type of A["id"] in the following code?**
type A = { id: number } & { id: string };

**Answer: C. never**

## Question 5
**What is the inferred return type of getArea below, and what compiler issue exists?**

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "triangle"; base: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "square": return shape.side ** 2;
  }
}


**Answer: B. Compile-time error, not all code paths return a value; the triangle case is unhandled and there's no default/never-based exhaustiveness check**