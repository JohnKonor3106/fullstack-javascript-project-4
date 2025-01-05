import os from "os";
import { loadHtmlPage } from "./index.js";
import { loadImage } from "./index.js";

const pageLoader = (url, dir = os.tmpdir()) => {
  return loadHtmlPage(url, dir)
    .then((htmlPath) => {
      console.log(`HTML saved to: ${htmlPath}`);
      return htmlPath;
    })
    .then((htmlPath) => {
      const promises = loadImage(htmlPath, url, dir);
      return promises
      .then((images) => {
        images.forEach((link) => {
          return link
          .then((url) => {
            console.log(url)
          })
        })
        return `Images uploaded: ${images.length}`;
      });
    })
    .catch((error) => {
      console.error(`Error loading page: ${error.message}`);
      throw error;
    });
};

export default pageLoader;

