import fs from 'fs';
import path from 'path';

const createDir = (pathname: string) => {
  return fs.promises.mkdir(pathname);
};

const existPathname = async (pathname: string) => {
  try {
    await fs.promises.stat(pathname);
    return true;
  } catch (err) {
    return false;
  }
};

const ensureWriteProcess = async (pathname: string) => {
  const fileDirname = path.dirname(pathname);
  if (await existPathname(fileDirname)) {
    return;
  }
  await ensureWriteProcess(fileDirname);
  await createDir(fileDirname);
};

export const readFile = (pathname: string) => {
  return fs.promises.readFile(pathname);
};

export const writeFile = async (pathname: string, data: string) => {
  await ensureWriteProcess(pathname);
  return fs.promises.writeFile(pathname, data, { encoding: 'utf8' });
};
