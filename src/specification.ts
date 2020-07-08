import { Predicate } from "./predicate";
import { AndSpecification } from "./predicates/and-specification";

export abstract class BaseSpecification<T = any> implements Predicate<T> {
  /**
   * Default predicate, always return `false` just to be safe.
   */
  isSatisfiedBy(item: T): boolean | Promise<boolean> {
    return false;
  }

  /**
   * Chain with AND predicate.
   * @param spec - Spec to chain
   */
  and(spec: Predicate<T>): Predicate<T> {
    return new AndSpecification<T>(this, spec);
  }
}

export class Specification<T> extends BaseSpecification<T> {}
