import path from "path";
import { describe, expect} from "@jest/globals";
import { makePath } from "../src/index.js";

describe('makePath function', () => {
  it('should form the correct path', () => {
    const pathfile = makePath('root', 'subdir', 'file');
    expect(pathfile).toBe(path.join('root', 'subdir', 'file'));
  });

  it('should throw an error when no paths are provided', () => {
    expect(() => makePath()).toThrow('Not args')
  });

  it('should throw an error when path.join fails', () => {
    expect(() => makePath(null)).toThrow(`Error when forming a path: The "path" argument must be of type string. Received null`);
  });
});


