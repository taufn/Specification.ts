import { Predicate } from "./predicate";

export abstract class Specification<T = any> implements Predicate<T> {
  public abstract async isSatisfiedBy(item: T): Promise<boolean>;

  public and(spec: Predicate<T>): Predicate<T> {
    return new AndSpecification<T>(this, spec);
  }

  public or(spec: Predicate<T>): Predicate<T> {
    return new OrSpecification<T>(this, spec);
  }

  public not(spec: Predicate<T>): Predicate<T> {
    return new NotSpecification<T>(spec);
  }
}

class AndSpecification<T> extends Specification<T> {
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

class OrSpecification<T> extends Specification<T> {
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

class NotSpecification<T> extends Specification<T> {
  constructor(private readonly spec: Predicate<T>) {
    super();
  }

  public async isSatisfiedBy(item: T): Promise<boolean> {
    const satisfied = await this.spec.isSatisfiedBy(item);
    return !satisfied;
  }
}
