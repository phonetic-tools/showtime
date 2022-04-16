import { readCommits } from './commits';
import type { Config } from './config';
import type { Expectation } from './expectations';
import { findExpectation } from './expectations';

export async function showtime(config: Config): Promise<Expectation> {
  const commits = await readCommits(config.repoPath);

  return findExpectation(commits, config);
}
