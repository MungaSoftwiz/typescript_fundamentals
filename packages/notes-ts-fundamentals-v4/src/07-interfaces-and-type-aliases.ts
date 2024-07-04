//* Type Aliases

// We can only declare an alias of a given name once
// within a given scope
type Amount = { // type info on right hand side(rare occasion)
  currency: string
  value: number
}

function printAmount(amt: Amount) { // we use Amount alias here
    console.log(amt)

    const { currency, value } = amt
    console.log(`${currency} ${value}`);
}

const donation = {
    currency: "USD",
    value: 30.0,
    description: "Donation to food bank",
}

printAmount(donation) //✔️ Valid


//? Let's look at a familiar example from the last chapter

function flipCoin() {
    if (Math.random() > 0.5) return "heads"
    return "tails"
}
const success = ["success", { name: "Mike North", email: "mike@example.com" }] as const
const fail = ["error", new Error("Something went wrong!")] as const

export function maybeGetUserInfo(): UserInfoOutcome{ // replaces success &  error types
    // implementation is the same in both examples
    if (flipCoin() === 'heads') {
        return success
    } else {
        return fail
    }
}

//? Let's model the return type as a type alias

type UserInfoOutcomeError = readonly ["error", Error]
type UserInfoOutcomeSuccess = readonly [
    "success",
    { readonly name: string; readonly email: string },
]
type UserInfoOutcome =
    | UserInfoOutcomeError
    | UserInfoOutcomeSuccess


//* Inheritance in type aliases


// You can create type aliases that combine existing types
// with new behavior by using Intersection (&) types.
type SpecialDate = Date & { getDescription(): string }

const newYearsEve: SpecialDate
    //                    ^?
    = Object.assign(
        new Date(),
        { getDescription: () => "Last day of the year" }
    )

newYearsEve.getDescription
// //             ^?

//* Interfaces

interface Amount2 { // Interface does not have equals(=) operator
    currency: string
    value: number
}

function printAmount2(amt: Amount2) {
    amt
}

//* Inheritance in interfaces

//? `extends` keyword
function consumeFood(arg: string) { }

class AnimalThatEats {
    eat(food: string) {
        consumeFood(food)
    }
}
class Cat extends AnimalThatEats {
    meow() {
        return "meow"
    }
}

const c = new Cat()
c.eat("cat food")
c.meow()

// We can have an interface that extends an interface. For alike things.
interface Animal {
    isAlive(): boolean
}
interface Mammal extends Animal {
    getFurOrHairColor(): string
}
interface Hamster extends Mammal {
    squeak(): string
}
function careForHamster(h: Hamster) {
    h.getFurOrHairColor()
    h.squeak()
    //   ^|
}


//? `implements` keyword

// Used to state that a given class should produce instances
// that confirm to a given interface
interface AnimalLike {
    eat(food: string): void
}

class Dog implements AnimalLike {
    isAlive(): boolean {
        return true
    }
    bark() {
        return "woof"
    }
    eat(food: string) {
        consumeFood(food)
    }
}

class LivingOrganism { //? A base class
    isAlive() {
        return true
    }
}
interface CanBark { //? Another interface
    bark(): string
}
class Dog2
    extends LivingOrganism //? Extends a class
    implements Animal, AnimalLike, CanBark { //? Implements interfaces
    bark() {
        return "woof"
    }
    eat(food: string) {
        consumeFood(food)
    }
}

//? Implements sometimes works with type aliases

type CanJump = {
    jumpToHeight(): number
        // | [number, number]
}
class Dog3 implements CanJump {
    jumpToHeight() {
        return 1.7
    }
    eat(food: string) {
        consumeFood(food)
    }
}

// type CanBark =
//   | number
//   | {
//       bark(): string
//     }

//* Open interfaces


function feed(animal: AnimalLike) {
  if (animal.isAlive())
    animal.eat("food")
    
}

// Open interfaces allows stacking of items on top of other items
interface AnimalLike { //✔️ Additional declaration is OK
    isAlive(): boolean
}

//* Use case: augmenting existing types


window.document // an existing property
//      ^? (property) document: Document
window.exampleProperty = 42
//      ^? (property) exampleProperty: number

// tells TS that `exampleProperty` exists
// global tells which scope that type information is part of
declare global {
    interface Window { // Makes declaration ofinterface in global scope
    exampleProperty: number
    }
}

//* Recursive types

type NestedNumbers = number | NestedNumbers[]
 
const val: NestedNumbers = [3, 4, [5, 6, [7], 59], 221]

if (typeof val !== "number") {
  val.push(41)
  //val.push("this will not work") //! No strings allowed
}

/**/
export default {}

// Choosing Types over Interfaces
/*1. If you need to define something other than an object type
    (e.g., use of the | union type operator), you must use a type alias
  2. If you need to define a type to use with the implements
    heritage term on a class, use an interface
  3. If you need to allow consumers of your types to augment them,
    you must use an interface.
*/