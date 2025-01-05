import { describe, expect, test } from "@jest/globals";
import nock from "nock";
import os from "os";
import { getFixturePath } from "../src/index.js";
import path from "path";
import fs from "fs/promises";
import { loadHtmlPage } from "../src/index.js";

let tempDir;

beforeEach(async () => {
  tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "page-loader-"));
});

describe('this function', () => {
  test("return path", async () => {
    const link = "https://example.ru";
    nock(link).get("/").reply(200);
  
    const result = path.join(tempDir, "example-ru.html");
    const pathFile = await loadHtmlPage(link, tempDir);
  
    expect(pathFile).toEqual(result);
  });
  
  test("save content", async () => {
    const fixturesPath = getFixturePath("content");
    const data = await fs.readFile(fixturesPath, "utf-8");
    const link = "https://example.ru";
    nock(link).get("/").reply(200, data);
  
    const pathFile = await loadHtmlPage(link, tempDir);
    const saveContent = await fs.readFile(pathFile, "utf-8");
  
    expect(saveContent).toEqual(data);
  });

  test('should error', async () => {
    const link = "https://example.ru";
    nock(link).get("/").reply(404);
    
    await expect(loadHtmlPage(link, tempDir)).rejects.toThrow('Download error');
    
  })
})


