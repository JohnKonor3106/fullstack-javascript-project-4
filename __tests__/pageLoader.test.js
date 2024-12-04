import { expect } from '@jest/globals';
import nock from 'nock';
import os from 'os';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';
import { pageLoader } from '../src/index.js';

let tempDir;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

beforeEach( async () => {
 tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
})

test('should return path', async () => {
  const link = 'https://example.ru'
   nock(link)
    .get('/')
    .reply(200)
  
  const result = path.join(tempDir, 'example-ru.html')
  
  expect(await pageLoader(link, tempDir)).toEqual(result)
  
})

test('should save content', async () => {
  const fixturesPath = getFixturePath('content');
  const data = await fs.readFile(fixturesPath, 'utf-8');
  const link = 'https://example.ru'
   nock(link)
   .get('/')
   .reply(200, data)
  console.log(data)
  const pathFile = await pageLoader(link);
  const saveContent =  await fs.readFile(pathFile, 'utf-8');
  
  expect(saveContent).toEqual(data)
  
})
