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

  it("should be a predicate on its own", async () => {
    await expect(gt1.isSatisfiedBy(1)).resolves.toBe(false);
    await expect(gt5.isSatisfiedBy(10)).resolves.toBe(true);
    await expect(gt9.isSatisfiedBy(8)).resolves.toBe(false);
  });

  it("should support AND specification", async () => {
    const gt1n5 = gt1.and(gt5);
    const gt5n9 = gt5.and(gt9);

    await expect(gt1n5.isSatisfiedBy(3)).resolves.toBe(false);
    await expect(gt1n5.isSatisfiedBy(31)).resolves.toBe(true);
    await expect(gt5n9.isSatisfiedBy(8)).resolves.toBe(false);
    await expect(gt5n9.isSatisfiedBy(18)).resolves.toBe(true);
  });

  it("should support OR specification", async () => {
    const gt1o5 = gt1.or(gt5);
    const gt5o9 = gt5.or(gt9);

    await expect(gt1o5.isSatisfiedBy(3)).resolves.toBe(true);
    await expect(gt1o5.isSatisfiedBy(1)).resolves.toBe(false);
    await expect(gt5o9.isSatisfiedBy(8)).resolves.toBe(true);
    await expect(gt5o9.isSatisfiedBy(1)).resolves.toBe(false);
  });

  it("should support NOT specification", async () => {
    const gt1lt5 = gt1.not(gt5);
    const gt1lt9 = gt1.not(gt9);

    await expect(gt1lt5.isSatisfiedBy(3)).resolves.toBe(true);
    await expect(gt1lt5.isSatisfiedBy(5)).resolves.toBe(true);
    await expect(gt1lt5.isSatisfiedBy(6)).resolves.toBe(false);
    await expect(gt1lt9.isSatisfiedBy(8)).resolves.toBe(true);
    await expect(gt1lt9.isSatisfiedBy(10)).resolves.toBe(false);
  });

  it("should support multiple chains", async () => {
    const spec1 = gt1.and(gt5).not(gt9);
    const spec2 = gt1.or(gt5).not(gt9);
    const spec3 = gt1.or(gt5).and(gt9);
    const spec4 = gt1.and(gt5).or(gt9);

    await expect(spec1.isSatisfiedBy(4)).resolves.toBe(true);
    await expect(spec1.isSatisfiedBy(6)).resolves.toBe(true);
    await expect(spec1.isSatisfiedBy(9)).resolves.toBe(true);
    await expect(spec1.isSatisfiedBy(10)).resolves.toBe(false);
    await expect(spec2.isSatisfiedBy(4)).resolves.toBe(true);
    await expect(spec2.isSatisfiedBy(5)).resolves.toBe(true);
    await expect(spec2.isSatisfiedBy(1)).resolves.toBe(true);
    await expect(spec2.isSatisfiedBy(9)).resolves.toBe(true);
    await expect(spec2.isSatisfiedBy(10)).resolves.toBe(false);
    await expect(spec3.isSatisfiedBy(1)).resolves.toBe(false);
    await expect(spec3.isSatisfiedBy(5)).resolves.toBe(false);
    await expect(spec3.isSatisfiedBy(9)).resolves.toBe(false);
    await expect(spec3.isSatisfiedBy(10)).resolves.toBe(true);
    await expect(spec4.isSatisfiedBy(1)).resolves.toBe(false);
    await expect(spec4.isSatisfiedBy(5)).resolves.toBe(false);
    await expect(spec4.isSatisfiedBy(6)).resolves.toBe(true);
    await expect(spec4.isSatisfiedBy(9)).resolves.toBe(true);
    await expect(spec4.isSatisfiedBy(10)).resolves.toBe(true);
  });
});
