/// <reference types="node" />
import { ChildProcess } from 'child_process';
export declare type SpawnOption = {
  pararel?: boolean;
};
declare type Spawn = (
  command: string,
  args?: string[],
  option?: SpawnOption,
) => Promise<ChildProcess>;
export declare const spawn: Spawn;
export {};
