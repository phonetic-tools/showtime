export const Level = {
  none: 'none',
  patch: 'patch',
  minor: 'minor',
  major: 'major',
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Level = typeof Level[keyof typeof Level];

export const LevelValue = {
  [Level.none]: 0,
  [Level.patch]: 1,
  [Level.minor]: 2,
  [Level.major]: 3,
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
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
