/**
 * Sample function to test build.
 * @param a - Param A
 * @param b - Param B
 */
export function Specification<T = any, U = any>(a: T, b: U): boolean {
  return typeof a !== "undefined" && typeof b !== "undefined";
}
