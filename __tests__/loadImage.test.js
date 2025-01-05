import { describe, expect, it, test } from "@jest/globals";
import path from "path";
import fs from "fs/promises";
import os from "os";
import nock from "nock";
import { getFixturePath, loadImage, loadHtmlPage } from "../src/index.js";

let tempDir;
const beforeFixtures = getFixturePath("before.html");
const afterFixtures = getFixturePath("after.html");
const dataBefore = await fs.readFile(beforeFixtures, "utf-8");
const dataAfter = await fs.readFile(afterFixtures, "utf-8");
const imgFixturePath = getFixturePath('img', "node.png");
const imgData = await fs.readFile(imgFixturePath, 'binary');

beforeEach(async () => {
  tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "page-loader-"));
});

afterEach(async () => {
  if (tempDir) {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
});

describe('this function', () => {
  it('return modified image path', async () => {
    const host = "https://ru.hexlet.io";
    const pageUrl = "https://ru.hexlet.io/courses";

    nock(host)
    .persist()
    .get("/courses")
    .reply(200, dataBefore)
    .get("/courses/assets/professions/nodejs.png")
    .reply(200, imgData); 

    const pathFile = await loadHtmlPage(pageUrl, tempDir);
    await loadImage(pathFile, pageUrl, tempDir);
    const modifiedContent = await fs.readFile(pathFile, "utf-8");

    expect(modifiedContent).toEqual(dataAfter);
  })

  it('downloads images', async () => {
    const host = "https://ru.hexlet.io";
    const pageUrl = "https://ru.hexlet.io/courses";

    nock(host)
     .persist()
     .get("/courses")
     .reply(200, dataBefore)
     .get("/courses/assets/professions/nodejs.png")
     .reply(200, imgData); 

    const pathFile = await loadHtmlPage(pageUrl, tempDir);
    await loadImage(pathFile, pageUrl, tempDir);
    
    const imgPath = path.join(tempDir, 'ru-hexlet-io-courses_files','ru-hexlet-io-assets-professions-nodejs.png')

    await expect(fs.stat(imgPath)).resolves.not.toThrow();

  })

  it('should throw', async () => {
    const host = "https://ru.hexlet.io";
    const pageUrl = "https://ru.hexlet.io/courses";

    nock(host)
     .persist()
     .get("/courses")
     .reply(200, dataBefore)
     .get("/assets/professions/nodejs.png")
     .reply(200, imgData); 

    const pathFile = await loadHtmlPage(pageUrl, tempDir);
    await loadImage(pathFile, pageUrl, tempDir);
    
    await expect(loadImage(pathFile, pageUrl, tempDir)).rejects.toThrow('image download error');
  })
})
