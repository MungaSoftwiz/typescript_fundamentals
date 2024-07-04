//* Classes

//? Field types
class Car {
  // private nextSerialNumber: number
  static #nextSerialNumber: number
  static #generateSerialNumber() { return this.#nextSerialNumber++ } //Car.nextSerialNumber
  static {
    // `this` is the static scope. Run before any instance is created
    fetch("https://api.example.com/vin_number_data")
        .then(response => response.json())
        .then(data => {
            this.#nextSerialNumber = data.mostRecentInvoiceId + 1;
        })
  }
  static {} // can have more than one static blocks

  /*make: string // You define field before constructor in TS.
  model: string // previous way before param properties
  year: number */

  // serialNumber = Car.generateSerialNumber()

  // private - only instances of this class can see it
  // protected - subclasses can see it but not outside world
  // private _serialNumber = Car.generateSerialNumber()
  readonly #serialNumber = Car.#generateSerialNumber()
  protected get serialNumber(): number {
    return this.#serialNumber
  }

  /*constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    //     ^?
    this.year = year
  }*/

  constructor(
    public make: string, // Param properties reduces the boilerplate
    public model: string, // does not have this. prefix
    public year: number
  ) {}

  honk(duration: number): string {
    return `h${'o'.repeat(duration)}nk`;
  }
  getLabel() {
    return `${this.make} ${this.model} ${this.year} - #${this.serialNumber}`
  }
  equals(other: unknown) {
    if (other &&
      typeof other === 'object' &&
      #serialNumber in other) {
        other
//       ^?
        return other.#serialNumber === this.#serialNumber
      }
      return false
  }
}

let sedan = new Car('Honda', 'Accord', 2017)
// sedan.activateTurnSignal("left") //! not safe!
// new Car(2017, "Honda", "Accord") //! not safe!


//? method types

const c = new Car("Honda", "Accord", 2017);
c.honk(5); // "hooooonk"


//? static member fields


console.log( new Car("Honda", "Accord", 2017))
// > "Honda Accord 2017 - #100
console.log( new Car("Toyota", "Camry", 2022))
// > "Toyota Camry 2022 - #101


//? static blocks


//* Access modifier keywords

//? on member fields

// const s = new Sedan("Nissan", "Altima", 2020)
// s.serialNumber


//? on static fields

// Car.generateSerialNumber()

//* JS private #fields

//? member fields
// #serialNumber = Car.generateSerialNumber()

/* It's private in terms of encapsulation. If you're running it
somewhere where users have access to & can attach a debugger
and see the value of the field. Chrome dev tools has API for this.
*/
// c.#serialNumber


//? static fields
// static #nextSerialNumber: number
// static #generateSerialNumber() { return this.#nextSerialNumber++ }
// #serialNumber = Car.#generateSerialNumber()

//* Private field presence checks

// const c2 = c1
// c2.equals(c1)


//* Parameter properties
// constructor(
//   public make: string, // Param properties reduces the boilerplate
//   public model: string, // does not have this. prefix
//   public year: number
// ) {}

class Base {}

class Car2 extends Base {
  foo = console.log("class field initializer")
  constructor(public make: string) {
    super()
    console.log("custom constructor stuff")
  }
}

//* Overrides

// This shows intent that this class should overide the base
// class method and thus base class method must exist of same name
class Truck extends Car {
    override honk() { // OOPS!
        return "BEEP"
    }
}

const t = new Truck("Ford", "F-150", 2020);
t.honk(); // "BEEP"

//? override keyword
// override hoonk() { // OOPS!

//? noImplicitOverride
// "noImplicitOverride": true

/**/
export default {}
