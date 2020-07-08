export interface Predicate<T = any> {
  isSatisfiedBy(item: T): Promise<boolean>;
}
