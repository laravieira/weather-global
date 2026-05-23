export type KeyDefault<T extends object> = {
  key: string
} & T

export type MutationArg<T> = {
  arg: T
}
