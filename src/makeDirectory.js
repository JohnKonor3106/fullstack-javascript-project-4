import fs from "fs/promises";

const makeDirectory = (dirPath) => {
  return fs.mkdir(dirPath, { recursive: true })
  .catch((err) => {
    throw new Error("Error when creating directory", err);
  });
};

export default makeDirectory;
