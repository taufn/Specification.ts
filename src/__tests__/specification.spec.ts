import { Specification } from "~/specification";

describe("Specification", () => {
  it("should be defined", () => {
    expect(typeof Specification).toBe("function");
  });

  it("should return false when some/all params are undefined", () => {
    expect(Specification("a", undefined)).toBe(false);
    expect(Specification(undefined, 2)).toBe(false);
    expect(Specification(undefined, undefined)).toBe(false);
  });

  it("should return true when all params are defined", () => {
    expect(Specification(1, 2)).toBe(true);
  });
});
