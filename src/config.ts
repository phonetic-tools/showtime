export const Level = {
  major: 100,
  minor: 10,
  patch: 1,
  none: 0,
} as const;

export type LevelName = keyof typeof Level;
export type LevelValue = typeof Level[LevelName];

export type Config = {
  types: Record<string, LevelName>,
  modifiers?: Record<string, LevelName | undefined>,
  packages?: Record<string, string>,
  repoPath?: string,
};
