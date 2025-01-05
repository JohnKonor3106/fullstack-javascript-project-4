import * as cheerio from "cheerio";
import { getName } from "./index.js";
import fs from "fs/promises";
import axios from "axios";
import url from "url";
import { makeDirectory, makePath } from "./index.js";

const loadImage = (pathFile, addr, output) => {
  const root = output;
  const { host, pathname} = url.parse(addr, true);
  const __files = `${getName(host)}${getName(pathname)}_files`;
  const pathDir = makePath(root, __files);

  return fs
    .readFile(pathFile, "utf-8")
    .then((content) => cheerio.load(content))
    .then(($) => {
      return makeDirectory(pathDir).then(() => {
        const images = $("img");
        const imagePromises = [];

        images.each((i, el) => {
          const src = $(el).attr("src") ? $(el).attr("src") : '';
          const url = src.startsWith('http') ? src : `${addr}${src}`;
          
          if (url) {
            const imgName = getName(src);
            const subFileName = getName(host);
            const modifiedSrc = imgName.replace(/-(png|svg|jpg)$/, ".$1");  
            const modifiedPath = makePath(__files, `${subFileName}${modifiedSrc}`);
            // Загрузка и сохранение изображения
            let fullpath;
            const imagePromise = axios
              .get(url, { responseType: "arraybuffer" })
              .then((response) => {
                if(response.status !== 200){
                return 
                }
                fullpath = makePath(root, modifiedPath);
                return fs.writeFile(fullpath, response.data, "binary");
              })
              .then(() => {
                // Обновление атрибута src
                $(el).attr("src", modifiedPath);
                return url;
              })
            imagePromises.push(imagePromise);
          }
            return 
        });

        return Promise.all(imagePromises).then(() => {
          // Обновление HTML-кода после изменения атрибутов src
          const updatedHtml = $.html();
          
          return fs
            .writeFile(pathFile, updatedHtml, "utf-8")
            .then(() => imagePromises);
        });
      });
    })
    .catch((err) => {
      throw new Error('image download error', err);
    });
};

export default loadImage;
