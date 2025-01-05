import path from "path";
import fs from "fs/promises";
import os from "os";

const makeTempDir = (filename = "") => {
  return fs.mkdtemp(path.join(os.tmpdir(), filename));
};

export default makeTempDir;
