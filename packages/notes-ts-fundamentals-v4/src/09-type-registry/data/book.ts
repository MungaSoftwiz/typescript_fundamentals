export class Book {
  deweyDecimalNumber(): number {
    return 42
  }
}

// This is module declaration. It allows us to layer types on top
// things already exported by a module ../registry.ts
declare module '../lib/registry' {
  export interface DataTypeRegistry {
    book: Book
  }
}
