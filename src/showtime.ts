import { readCommits } from './commits';
import { Config } from './config';
import { Expectation, findExpectation } from './expectations';

export async function showtime(config: Config): Promise<Expectation> {
  const commits = await readCommits(config.repoPath);

  return findExpectation(commits, config);
}
