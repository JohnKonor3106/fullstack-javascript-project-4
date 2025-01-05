import { fileURLToPath } from "url";
import path from "path";

const getFixturePath = (...files) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const basePath = path.join(__dirname, "..", "__fixtures__");
  
  return path.join(basePath, ...files);
};

export default getFixturePath;
