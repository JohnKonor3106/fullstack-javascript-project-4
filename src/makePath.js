import path from "path";

const makePath = (...paths) => {
  if (paths.length < 1) {
    throw new Error('Not args');
  } else {
    try {
      return path.join(...paths);
    } catch (e) {
      throw new Error('Error when forming a path: ' + e.message);
    }
  }
};

export default makePath;

