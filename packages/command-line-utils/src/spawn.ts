import { spawn as spawnCommand, ChildProcess } from 'child_process';

export type SpawnOption = {
  pararel?: boolean;
};

type Spawn = (
  command: string,
  args?: string[],
  option?: SpawnOption,
) => Promise<ChildProcess>;

export const spawn: Spawn = (command, args = [], option = {}) => {
  return new Promise((resolve, reject) => {
    const { pararel = false } = option;

    const ps = spawnCommand(command, args, { stdio: 'inherit' });

    ps.on('error', (data) => {
      reject(data);
    });
    ps.on('close', () => {
      resolve(ps);
    });
    ps.on('exit', (data) => {
      if (data === 0) {
        return;
      }
      reject(data);
    });

    if (pararel) {
      resolve(ps);
      return;
    }
  });
};
