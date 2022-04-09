import { Commit, Trailer } from './commits';
import { Level } from './config';
import type { Config, LevelName, LevelValue } from './config';


export type Expectation = {
  name: LevelName,
  value: LevelValue,
  commit?: Commit,
  modifier?: keyof Trailer,
};


function getLevelExpectation(name: LevelName): Expectation {
  if (!Level[name]) {
    return { name: 'none', value: 0 };
  }

  return {
    name,
    value: Level[name],
  };
}

function findModifiers(trailers: Trailer, config: Config): Expectation {
  const trailerList = Object.keys(trailers);

  return trailerList.reduce<Expectation>((previous, trailerName) => {
    const trailerValue = config.modifiers[trailerName];
    if (trailerValue) {
      const { name, value } = getLevelExpectation(trailerValue);

      return {
        name,
        value,
        modifier: trailerName,
      };
    }

    return previous;
  }, { name: 'none', value: 0 });
}

export async function findExpectation(commits: Commit[], config: Config): Promise<Expectation> {
  return commits.reduce<Expectation>((previous, commit) => {
    const typeName = commit.trailers.Type;

    if (!typeName) return previous;

    console.log(config);

    const current = getLevelExpectation(config.types[typeName]);
    const modifier = findModifiers(commit.trailers, config);

    if (modifier.value > current.value) {
      return {
        commit,
        ...modifier,
      };
    }

    if (current.value > previous.value) {
      return {
        commit,
        name: current.name,
        value: current.value,
      };
    }

    return previous;
  }, { name: 'none', value: 0 });
}
