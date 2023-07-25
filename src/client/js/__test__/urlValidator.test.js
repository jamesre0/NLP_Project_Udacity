import { isValidURL } from "../urlValidator.js";

describe("Testing the URL validation functionality", () => {
  test("Testing the isValidURL() function", () => {
    expect(isValidURL("https://example.com")).toBeTruthy();
    expect(isValidURL("invalid url")).toBeFalsy();
  });
});