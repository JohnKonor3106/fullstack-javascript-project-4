import { expect } from "@jest/globals";
import { getName }from "../src/index.js";

 
 test('should name domain', () => {
    const example1 = getName('https://ru.hexlet.io');
    const example2 = getName('https://example.com/path/to/page')
    const example3 = getName('example.com/path/to/page')
    const example4 = getName('https://example.com/path_to_page*')
    const example5 = getName('https://example.com/path123/to/page')
    
    expect(example1).toEqual('ru-hexlet-io.html')
    expect(example2).toEqual('example-com-path-to-page.html')
    expect(example3).toEqual('example-com-path-to-page.html')
    expect(example4).toEqual('example-com-path-to-page-.html')
    expect(example5).toEqual('example-com-path123-to-page.html')
 })