/// <reference types="node" />
import { ChildProcess } from 'child_process';
declare type Spawn = (
  command: string,
  args?: string[],
  options?: {
    pararel?: boolean;
  },
) => Promise<ChildProcess>;
export declare const spawn: Spawn;
export {};
