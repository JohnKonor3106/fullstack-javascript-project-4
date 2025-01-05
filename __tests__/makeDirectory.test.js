import { test, expect, beforeEach, describe } from "@jest/globals";
import fs from "fs/promises";
import path from "path";
import { makeTempDir, makeDirectory } from "../src/index.js";

let tempDir;

beforeEach(async () => {
  tempDir = await makeTempDir("test-");
});

describe('makeDirectory', () => {
  test("should create directory and write file", async () => {
    const dirPath = path.join(tempDir, "files");
    await makeDirectory(dirPath);
  
    const filePath = path.join(dirPath, "file.txt");
    await fs.writeFile(filePath, "hello", "utf-8");
  
    const contentDir = await fs.readdir(dirPath);
    expect(contentDir).toEqual(["file.txt"]);
  
    const contentFile = await fs.readFile(filePath, "utf-8");
    expect(contentFile).toEqual("hello");
  });
  

  test('should error', async () => {
    await expect(makeDirectory('')).rejects.toThrow('Error when creating directory')
  })
})


