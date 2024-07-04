// Type queres - way you can extract a type from a value
//* keyof  => used with a type e.g Date, to get the keys of the type

const contact = {
    name: "Asheley",
    email: "ashley@example.com"
}
// type whatIwant0 = keyof contact //! contact is value, not type
type WhatIwant = keyof typeof contact //✔️ "name" | "email"
type Try1 = typeof contact["name"] //✔️ string
// keyof = Object.keys() for types
// typeof = "get me the type of this value"


type DatePropertyNames = keyof Date

type DateStringPropertyNames = DatePropertyNames & string
type DateSymbolPropertyNames = DatePropertyNames & symbol

//* typeof

async function main() {
    const apiResponse = await Promise.all([
        fetch("https://example.com"),
        Promise.resolve("Titanium White"),
    ])
    // Type alias within function scope
    type ApiResponseType = typeof apiResponse
}

// ?^ note: type alias within a function scope!
const MyRule = CSSRule
CSSRule.STYLE_RULE
const foo = new MyRule()

type MyRuleType = typeof MyRule // called the static side of the class


//* Indexed Access Types - Accessing w/in a type using an index


interface Car {
    make: string
    model: string
    year: number
    color: { // This is a type
        red: string
        green: string
        blue: string
    }
}

let carColor: Car["color"] //✔️ Reaching for something that exists
// let carSomething: Car["not-something-on-car"] //! Reaching for something invalid
let carColorRedComponent: Car["color"]["red"] //✔️ Reaching for something nested
let carProperty: Car["color" | "year"] // ✔️ Passing a union type through the index

//* Use case: the type registry pattern

// See: 
import("./09-type-registry/")

/**/
export default {}
