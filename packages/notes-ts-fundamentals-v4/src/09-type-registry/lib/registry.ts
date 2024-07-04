// there is only one definition of the types exported by this file
// If we modify this interface using module declaration in
// ../data/book, mod will affect every place where DataTypeRegistry is used

export interface DataTypeRegistry {
  // empty by design. Open interface.
  // Empty interface acts as registry that other modules are
  // adding their entries in there
}
// the "& string" is just a trick to get
// a nicer tooltip to show you in the next step
export function fetchRecord(
  arg: keyof DataTypeRegistry & string,
  id: string,
) {}
// Compare this snippet from packages/notes-ts-fundamentals-v4/src/10-type-aliases.ts:
