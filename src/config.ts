/* eslint-disable @typescript-eslint/no-redeclare */
export const Level = {
  major: 'major',
  minor: 'minor',
  patch: 'patch',
  none: 'none',
} as const;
export type Level = typeof Level[keyof typeof Level];

export const LevelValue = {
  [Level.major]: 3,
  [Level.minor]: 2,
  [Level.patch]: 1,
  [Level.none]: 0,
} as const;
export type LevelValue = typeof LevelValue[keyof typeof LevelValue];

export type Config = {
  types: {
    [type: string]: Level,
  },
  modifiers?: {
    [modifier: string]: Level,
  },
  packages?: {
    [packageName: string]: string,
  },
  repoPath?: string,
};
