import { Specification } from "~/specification";

describe("Specification", () => {
  class GreaterThan extends Specification<number> {
    constructor(private readonly num: number) {
      super();
    }

    public async isSatisfiedBy(num: number): Promise<boolean> {
      return num > this.num;
    }
  }
  const gt1 = new GreaterThan(1);
  const gt5 = new GreaterThan(5);
  const gt9 = new GreaterThan(9);

  it("should be defined", () => {
    expect(typeof Specification).toBe("function");
  });

  it("should be a predicate on its own", () => {
    expect(gt1.isSatisfiedBy(1)).resolves.toBe(false);
    expect(gt5.isSatisfiedBy(10)).resolves.toBe(true);
    expect(gt9.isSatisfiedBy(8)).resolves.toBe(false);
  });

  it("should support AND specification", () => {
    const gt1n5 = gt1.and(gt5);
    const gt5n9 = gt5.and(gt9);

    expect(gt1n5.isSatisfiedBy(3)).resolves.toBe(false);
    expect(gt1n5.isSatisfiedBy(31)).resolves.toBe(true);
    expect(gt5n9.isSatisfiedBy(8)).resolves.toBe(false);
    expect(gt5n9.isSatisfiedBy(18)).resolves.toBe(true);
  });

  it("should support OR specification", () => {
    const gt1o5 = gt1.or(gt5);
    const gt5o9 = gt5.or(gt9);

    expect(gt1o5.isSatisfiedBy(3)).resolves.toBe(true);
    expect(gt1o5.isSatisfiedBy(1)).resolves.toBe(false);
    expect(gt5o9.isSatisfiedBy(8)).resolves.toBe(true);
    expect(gt5o9.isSatisfiedBy(1)).resolves.toBe(false);
  });

  it("should support NOT specification", () => {
    const gt1lt5 = gt1.not(gt5);
    const gt1lt9 = gt1.not(gt9);

    expect(gt1lt5.isSatisfiedBy(3)).resolves.toBe(true);
    expect(gt1lt5.isSatisfiedBy(5)).resolves.toBe(false);
    expect(gt1lt9.isSatisfiedBy(8)).resolves.toBe(true);
    expect(gt1lt9.isSatisfiedBy(10)).resolves.toBe(false);
  });
});
