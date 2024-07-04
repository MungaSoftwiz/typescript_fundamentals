//* Callables

interface TwoNumberCalculation {
  (x: number, y: number): number // Call signature
}

// See below type alias has a (=>) interrface above is (:)
type TwoNumberCalc = (x: number, y: number) => number

const add: TwoNumberCalculation = (a, b) => a + b
const subtract: TwoNumberCalc = (x, y) => x - y

//* `void`

function printFormattedJSON(obj: string[]) {
    console.log(JSON.stringify(obj, null, "  "))
}

const x = printFormattedJSON(["hello", "world"])

// If used in a function declaration return type, means
// I should return nothing useful/interesting e.g undefined
function foo(): void {}

function invokeInFourSeconds(callback: () => undefined) {
    setTimeout(callback, 4000)
}
// Willing to accept return value but makes sure within the
// function this callback is used you're not doing anything
// with the return value. Ignore return value
function invokeInFiveSeconds(callback: () => void) {
    setTimeout(callback, 5000)
}

const values: number[] = []
//invokeInFourSeconds(() => values.push(4)); //! Error: Type 'undefined' is not assignable to type 'number'.
invokeInFiveSeconds(() => values.push(4));

//* Constructables

interface DateConstructor {
    new(value: number): Date
}

let MyDateConstructor: DateConstructor = Date // these are rare
const d = new MyDateConstructor(1697923072611)

//* Function overloads

type FormSubmitHandler = (data: FormData) => void
type MessageHandler = (evt: MessageEvent) => void

// Function overloading: allows a function to be called with
// different types of parameters, enabling multiple behaviors based on the input types
function handleMainEvent( // Function heads: don't have a body
  elem: HTMLFormElement,
  handler: FormSubmitHandler
): void
function handleMainEvent(
  elem: HTMLIFrameElement,
  handler: MessageHandler
): void

// Underlying implementationa allows us to mix and match but
// nothing expresses the rship between 1st & 2nd args.
// So we've limited the combinations of what can be done using the heads above.
function handleMainEvent(
    elem: HTMLFormElement | HTMLIFrameElement,
    handler: FormSubmitHandler | MessageHandler
) { }

const myFrame = document.getElementsByTagName("iframe")[0]
handleMainEvent(myFrame, (evt) => { // evt: MessageEvent<any> pair
})


// //? Add above handleMainEvent function declaration

//? Form handler has a specific type now!
const myForm = document.getElementsByTagName("form")[0]
handleMainEvent(myForm, (evt) => { // evt: FormData pair
})

//* `this` types

// It's still 1 one argument function. "this" disappears
function myClickHandler(this: HTMLButtonElement, event: Event) {
    this.disabled = true
}
// myClickHandler(new Event("click")) // maybe ok?

// bind bakes a this in to a copy of the function to give you
// a copy. At this point it can be directly invoked
const myButton = document.getElementsByTagName("button")[0]
const boundHandler = myClickHandler.bind(myButton)
boundHandler(new Event("click")) // bound version: ok

// .call() & .apply(). Way to ivoke a function & pass args &
// also a "this"
myClickHandler.call(myButton, new Event("click")) // also ok

//* Function best practices

export async function getData(url: string): Promise<{ properties: string[]}> {
    const resp = await fetch(url)
    // if (resp.ok) {
        const data = (await resp.json()) as {
            properties: string[]
        }
        return data
    }
// }

function loadData() {
    getData("https://example.com").then((result) => {
        console.log(result.properties.join(", "))
//         //           ^?
    })
}
/**/
export default {}
