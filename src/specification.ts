import { Predicate } from "./predicate";

export abstract class Specification implements Predicate {
  /**
   * Default predicate, always return `false` just to be safe.
   */
  isSatisfiedBy(item: any): boolean {
    return false;
  }
}
