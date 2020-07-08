import { Predicate } from "./predicate";

export abstract class BaseSpecification<T = any> implements Predicate<T> {
  public async isSatisfiedBy(item: T): Promise<boolean> {
    return false;
  }

  public and(spec: Predicate<T>): Predicate<T> {
    return new AndSpecification<T>(this, spec);
  }

  public or(spec: Predicate<T>): Predicate<T> {
    return new OrSpecification<T>(this, spec);
  }
}

class AndSpecification<T = any> extends BaseSpecification<T> {
  constructor(
    private readonly left: Predicate<T>,
    private readonly right: Predicate<T>,
  ) {
    super();
  }

  public async isSatisfiedBy(item: T): Promise<boolean> {
    const leftSatisfied = await this.left.isSatisfiedBy(item);
    const rightSatisfied = await this.right.isSatisfiedBy(item);

    return leftSatisfied && rightSatisfied;
  }
}

class OrSpecification<T = any> extends BaseSpecification<T> {
  constructor(
    private readonly left: Predicate<T>,
    private readonly right: Predicate<T>,
  ) {
    super();
  }

  public async isSatisfiedBy(item: T): Promise<boolean> {
    const leftSatisfied = await this.left.isSatisfiedBy(item);
    const rightSatisfied = await this.right.isSatisfiedBy(item);

    return leftSatisfied || rightSatisfied;
  }
}

export class Specification<T> extends BaseSpecification<T> {}
