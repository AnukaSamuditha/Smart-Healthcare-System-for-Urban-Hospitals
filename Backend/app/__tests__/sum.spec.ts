import { TestNumbers } from "#utils/test_util.js";
import { describe, expect, it } from "vitest";

describe("Test case for initiating the testing process", () => {
  it("Need to be correctly calculated the sum of two numbers", () => {
    expect(TestNumbers(5, 6)).toBe(11);
  });
});