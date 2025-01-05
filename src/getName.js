import url from "url";

const getName = (addr, ext = "") => {
  const { hostname, pathname } = url.parse(addr, true);
  const regexp = /[^a-zA-Z0-9]/g;

  // Удаляем последний слеш, если он присутствует
  const nameHost = hostname ? hostname.replace(/\/$/, '') : '';
  const namePath = pathname ? pathname.replace(/\/$/, '') : '';

  const nameForFile = `${nameHost}${namePath}`.replace(regexp, '-');

  // Удаляем последний дефис, если он присутствует
  if (nameForFile.endsWith('-')) {
    return nameForFile.slice(0, -1) + ext;
  }

    return nameForFile + ext;
};

export default getName;

