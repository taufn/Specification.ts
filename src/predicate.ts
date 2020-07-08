export interface Predicate {
  isSatisfiedBy(item: any): boolean | Promise<boolean>;
}
