import { test, expect } from "vitest";

function add(a: number, b: number) {
  return a + b;
}

test("should pass", () => {
  expect(1).toBe(1);
});

test("add fucn", () => {
  expect(add(1, 2)).toBe(3);
});
