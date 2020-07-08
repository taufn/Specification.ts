import { Predicate } from "./predicate";

export abstract class BaseSpecification<T = any> implements Predicate<T> {
  public async isSatisfiedBy(item: T): Promise<boolean> {
    return false;
  }

  public and(spec: Predicate<T>): Predicate<T> {
    return new AndSpecification<T>(this, spec);
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
    const isLeftSatisfied = await this.left.isSatisfiedBy(item);
    const isRightSatisfied = await this.right.isSatisfiedBy(item);

    return isLeftSatisfied && isRightSatisfied;
  }
}

export class Specification<T> extends BaseSpecification<T> {}
