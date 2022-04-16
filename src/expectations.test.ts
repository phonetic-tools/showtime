import { describe, expect, it } from '@jest/globals';
import { createHash } from 'crypto';
import { findExpectation } from './expectations';
import type { Commit } from './commits';
import type { Config } from './config';
import { Level } from './config';

const hash = createHash('sha256')
  .update('commit')
  .digest('hex');

function createCommit({ subject = '', trailers = {} }): Commit {
  return {
    author: 'Bob',
    authoredDate: '',
    committer: 'Bob',
    committedDate: '',
    hash,
    subject,
    trailers,
  };
}

const documentationCommit = createCommit({
  subject: 'Fix feature',
  trailers: {
    Type: 'documentation',
  },
});

const fixCommit = createCommit({
  subject: 'Fix feature',
  trailers: {
    Type: 'fix',
  },
});

const featureCommit = createCommit({
  subject: 'Add feature',
  trailers: {
    Type: 'feature',
  },
});

const breakingFixCommit = createCommit({
  subject: 'Fix feature',
  trailers: {
    'Type': 'fix',
    'Breaking-Change': 'Need to fix feature',
  },
});

const noTypeCommit = createCommit({
  subject: 'Chore',
  trailers: {},
});

const config: Config = {
  types: {
    feature: Level.minor,
    fix: Level.patch,
    documentation: Level.none,
  },
  modifiers: {
    'Breaking-Change': Level.major,
  },
  repoPath: '',
};

describe(findExpectation.name, () => {
  it('should have no expectation by default', async () => {
    const expectation = await findExpectation([], {
      types: {},
      modifiers: {},
      repoPath: '',
    });

    expect(expectation).toStrictEqual({
      level: Level.none,
    });
  });

  it('should have no expectation if there are no trailers', async () => {
    const commits = [
      noTypeCommit,
    ];

    const expectation = await findExpectation(commits, config);

    expect(expectation).toStrictEqual({
      level: Level.none,
    });
  });

  it('should have no expectation if only documentation', async () => {
    const commits = [
      noTypeCommit,
      documentationCommit,
    ];

    const expectation = await findExpectation(commits, config);

    expect(expectation).toStrictEqual({
      level: Level.none,
    });
  });

  it('should have patch expectation if there is a fix', async () => {
    const commits = [
      noTypeCommit,
      documentationCommit,
      fixCommit,
    ];

    const expectation = await findExpectation(commits, config);

    expect(expectation).toStrictEqual({
      commit: fixCommit,
      level: Level.patch,
    });
  });

  it('should have minor expectation if there is a feature', async () => {
    const commits = [
      noTypeCommit,
      documentationCommit,
      fixCommit,
      featureCommit,
    ];

    const expectation = await findExpectation(commits, config);

    expect(expectation).toStrictEqual({
      commit: featureCommit,
      level: Level.minor,
    });
  });

  it('should have major expectation if there is a breaking change', async () => {
    const commits = [
      noTypeCommit,
      documentationCommit,
      fixCommit,
      featureCommit,
      breakingFixCommit,
    ];

    const expectation = await findExpectation(commits, config);

    expect(expectation).toStrictEqual({
      commit: breakingFixCommit,
      level: Level.major,
      modifier: 'Breaking-Change',
      modifierContent: 'Need to fix feature',
    });
  });
});
