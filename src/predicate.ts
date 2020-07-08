export interface Predicate<T = any> {
  isSatisfiedBy(item: T): boolean | Promise<boolean>;
}
