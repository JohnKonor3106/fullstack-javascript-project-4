import axios from "axios";
import path  from 'path';
import fs from 'fs/promises';
import os from 'os';
import { getName } from "./index.js";

const pageLoader = (link, dir = os.tmpdir()) => {
  const filename = getName(link);
  const pathFile = path.join(dir, filename);

  return axios.get(link)
    .then((response) => {
      const content = typeof response.data === 'string' ? response.data : JSON.stringify(response.data)
       return fs.writeFile(pathFile, content, 'utf-8')
        .then(() => {
            return pathFile
        })
    })
    .catch((e) => {
      console.error(e)
    })
}

export default pageLoader;


