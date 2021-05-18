import fs from 'fs';
import path from 'path';

export const createDir = (pathname: string): Promise<void> => {
  return fs.promises.mkdir(pathname);
};

const existPathname = async (pathname: string): Promise<boolean> => {
  try {
    await fs.promises.stat(pathname);
    return true;
  } catch (err) {
    return false;
  }
};

const ensureWriteProcess = async (pathname: string): Promise<void> => {
  const fileDirname = path.dirname(pathname);
  if (await existPathname(fileDirname)) {
    return;
  }
  await ensureWriteProcess(fileDirname);
  await createDir(fileDirname);
};

export const readFile = (pathname: string): Promise<Buffer> => {
  return fs.promises.readFile(pathname);
};

export const writeFile = async (
  pathname: string,
  data: string,
): Promise<void> => {
  await ensureWriteProcess(pathname);
  return fs.promises.writeFile(pathname, data, { encoding: 'utf8' });
};

export const isDirectory = async (pathname: string): Promise<boolean> => {
  const pathState = await fs.promises.stat(pathname);
  return pathState.isDirectory();
};

export const extractFileName = (pathname: string): string => {
  return pathname.split('/').pop() || '';
};

export const extractExtension = (pathname: string): string => {
  return pathname.split('.').pop() || '';
};

export const getFilePathnames = async (
  dirPathname: string,
): Promise<string[]> => {
  const pathnames = await fs.promises.readdir(dirPathname);
  let allPathnames: string[] = [];
  for (const pathname of pathnames) {
    const absoluteFilePathname = path.join(dirPathname, pathname);
    if (await isDirectory(absoluteFilePathname)) {
      const nestedFilePathnames = await getFilePathnames(absoluteFilePathname);
      allPathnames = allPathnames.concat(nestedFilePathnames);
    } else {
      allPathnames = allPathnames.concat(absoluteFilePathname);
    }
  }
  return allPathnames;
};
