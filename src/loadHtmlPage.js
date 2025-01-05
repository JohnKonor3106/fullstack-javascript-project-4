import fs from "fs/promises";
import path from "path";
import axios from "axios";
import { getName } from "../src/index.js";

const loadHtmlPage = (url, output) => {
  const filename = getName(url, ".html");
  const pathFile = path.resolve(output, filename);

  return axios
    .get(url)
    .then((response) => {
      return fs.writeFile(pathFile, response.data, "utf-8")
    .then(() => {
        return pathFile;
      });
    })
    .catch((err) => {
      throw new Error('Download error:', err);
    });
};

export default loadHtmlPage;
