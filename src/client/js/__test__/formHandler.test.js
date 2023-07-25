import { handleSubmit } from "../formHandler.js";
import { isValidURL } from "../urlValidator.js";

jest.mock('../urlValidator', () => ({
  isValidURL: jest.fn(),
}));

describe("Testing the submit functionality", () => {
  beforeEach(() => {
    // Mock the DOM elements
    document.body.innerHTML = `
      <form id="form">
        <input id="url" type="text" name="input" value="">
      </form>
      <div id="results"></div>
    `;
  });

  afterEach(() => {
    // Reset the fetch mock after each test
    global.fetch.mockReset();
    isValidURL.mockReset();
  });

  test("Testing the handleSubmit() function with invalid URL", async () => {
    const event = {
      preventDefault: jest.fn(),
    };

    isValidURL.mockReturnValueOnce(false);

    // Mock the fetch function to resolve with an error response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Failed to analyze the URL." }),
      })
    );

    // Call the handleSubmit function
    await handleSubmit(event);

    // Check if the error message is displayed in the results element
    expect(document.getElementById("results").innerHTML).toEqual(
      "<p>Please enter a valid URL</p>"
    );
  });

  test("Testing the handleSubmit() function with valid URL", async () => {
    const event = {
      preventDefault: jest.fn(),
    };

    isValidURL.mockReturnValueOnce(true);

    // Mock the fetch function to resolve with a successful response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ sentiment: "positive" }),
      })
    );

    // Set a valid URL value to the form input field
    document.getElementById("url").value = "https://example.com";

    // Call the handleSubmit function
    await handleSubmit(event);

    // Check if the error message is not displayed in the results element
    expect(document.getElementById("results").innerHTML).not.toContain(
      "<p>Please enter a valid URL</p>"
    );
  });
});
