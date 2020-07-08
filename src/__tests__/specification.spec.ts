import { Specification } from "~/specification";

describe("Specification", () => {
  class GreaterThan extends Specification {
    constructor(private readonly num: number) {
      super();
    }

    isSatisfiedBy(num: number): boolean {
      return num > this.num;
    }
  }

  it("should be defined", () => {
    expect(typeof Specification).toBe("function");
  });

  it("should be a predicate on its own", () => {
    const gt1 = new GreaterThan(1);
    const gt2 = new GreaterThan(2);
    const gt3 = new GreaterThan(3);

    expect(gt1.isSatisfiedBy(1)).toBe(false);
    expect(gt2.isSatisfiedBy(4)).toBe(true);
    expect(gt3.isSatisfiedBy(4)).toBe(true);
  });
});
