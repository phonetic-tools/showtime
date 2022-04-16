import type { Commit, Trailer } from './commits';
import { Level } from './config';
import type { Config } from './config';
import { LevelValue } from './config';

export type Expectation = {
  level: Level,
  commit?: Commit,
  modifier?: string,
  modifierContent?: string,
};

function findModifiers(trailers: Trailer, config: Config): Expectation {
  const trailerList = Object.keys(trailers);

  return trailerList.reduce<Expectation>((previous, trailerName) => {
    const level: Level | undefined = config.modifiers?.[trailerName];

    if (level) {
      return { level, modifier: trailerName };
    }

    return previous;
  }, { level: Level.none });
}

export async function findExpectation(commits: Commit[], config: Config): Promise<Expectation> {
  return commits.reduce<Expectation>((previous, commit) => {
    const typeName: string | undefined = commit.trailers.Type;

    if (!typeName) return previous;

    const currentLevel = config.types[typeName];
    const { level: modifierLevel, modifier } = findModifiers(commit.trailers, config);

    if (LevelValue[modifierLevel] > LevelValue[currentLevel]) {
      return {
        commit,
        level: modifierLevel,
        modifier,
        modifierContent: commit.trailers[modifier as string],
      };
    }

    if (LevelValue[currentLevel] > LevelValue[previous.level]) {
      return {
        commit,
        level: currentLevel,
      };
    }

    return previous;
  }, { level: Level.none });
}
