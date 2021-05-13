/// <reference types="node" />
export declare const readFile: (pathname: string) => Promise<Buffer>;
export declare const writeFile: (
  pathname: string,
  data: string,
) => Promise<void>;
export declare const isDirectory: (pathname: string) => Promise<boolean>;
export declare const extractFileName: (pathname: string) => string;
export declare const extractExtension: (pathname: string) => string;
export declare const getFilePathnames: (
  dirPathname: string,
) => Promise<string[]>;
