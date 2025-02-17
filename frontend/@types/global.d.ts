export {}

declare global {
  type Overwrite<T, U> = Omit<T, keyof U> & U
}
