import { expect } from "@jest/globals";
import { getName } from "../src/index.js";

test("should name with protocol", () => {
  const example1 = getName("https://ru.hexlet.io", ".html");
  const example2 = getName("https://example.com/path/to/page.hello", ".html");
  const example3 = getName("https://example.com/path/to/page.movie", ".html");
  const example4 = getName("https://example.com/path_to_page", ".html");
  const example5 = getName("https://example.com/path123/to/page", ".html");

  expect(example1).toEqual("ru-hexlet-io.html");
  expect(example2).toEqual("example-com-path-to-page-hello.html");
  expect(example3).toEqual("example-com-path-to-page-movie.html");
  expect(example4).toEqual("example-com-path-to-page.html");
  expect(example5).toEqual("example-com-path123-to-page.html");
});

test("should name file without format", () => {
  const example1 = getName("https://ru.hexlet.io/assets/professions/nodejs");
  const example2 = getName("https://example.com/path/to/page/assets/professions/nodejs", );
  const example3 = getName("https://example.com/path/to/page/golum");
  const example4 = getName("https://example.com/path_to_page");
  const example5 = getName("https://example.com/path123/to/page/hello");

  expect(example1).toEqual("ru-hexlet-io-assets-professions-nodejs");
  expect(example2).toEqual("example-com-path-to-page-assets-professions-nodejs",);
  expect(example3).toEqual("example-com-path-to-page-golum");
  expect(example4).toEqual("example-com-path-to-page");
  expect(example5).toEqual("example-com-path123-to-page-hello");
});

test("should name file without protocol", () => {
  const example1 = getName("ru.hexlet.io/assets/professions/nodejs");
  const example2 = getName("example.com/path/to/page/assets/professions/nodejs",);
  const example3 = getName("example.com/path/to/page/golum");
  const example4 = getName("example.com/path_to_page");
  const example5 = getName("example.com/path123/to/page/hello");

  expect(example1).toEqual("ru-hexlet-io-assets-professions-nodejs");
  expect(example2).toEqual("example-com-path-to-page-assets-professions-nodejs",);
  expect(example3).toEqual("example-com-path-to-page-golum");
  expect(example4).toEqual("example-com-path-to-page");
  expect(example5).toEqual("example-com-path123-to-page-hello");
});
