import { Predicate } from "~/predicate";
import { BaseSpecification } from "~/specification";

export class AndSpecification<T = any> extends BaseSpecification<T> {
  /**
   * Inject dependencies.
   * @param left - Left predicate
   * @param right - Right predicate
   */
  constructor(
    private readonly left: Predicate<T>,
    private readonly right: Predicate<T>,
  ) {
    super();
  }

  /**
   * Define AND specification.
   * @param item - Item to test
   */
  public async isSatisfiedBy(item: T): Promise<boolean> {
    const isLeftSatisfied = await this.left.isSatisfiedBy(item);
    const isRightSatisfied = await this.right.isSatisfiedBy(item);

    return isLeftSatisfied && isRightSatisfied;
  }
}
