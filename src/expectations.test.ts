import { describe, expect, it } from '@jest/globals';
import { createHash } from 'crypto';
import { findExpectation } from './expectations';
import { Commit } from './commits';

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

const config = {
  types: {
    feature: 'minor',
    fix: 'patch',
    documentation: 'none',
  },
  modifiers: {
    'Breaking-Change': 'major',
  },
  repoPath: '',
} as const;


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


describe(findExpectation.name, () => {
  it('should no expectation by default', async () => {
    const expectation = await findExpectation([], {
      types: {},
      modifiers: {},
      repoPath: '',
    });

    expect(expectation).toStrictEqual({
      name: 'none',
      value: 0,
    });
  });

  it('should have no expectation there is no trailers', async () => {
    const commits = [
      noTypeCommit,
    ];

    const expectation = await findExpectation(commits, config);

    expect(expectation).toStrictEqual({
      name: 'none',
      value: 0,
    });
  });

  it('should have no expectation if only documentation', async () => {
    const commits = [
      noTypeCommit,
      documentationCommit,
    ];

    const expectation = await findExpectation(commits, config);

    expect(expectation).toStrictEqual({
      name: 'none',
      value: 0,
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
      name: 'patch',
      value: 1,
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
      name: 'minor',
      value: 10,
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
      name: 'major',
      modifier: 'Breaking-Change',
      value: 100,
    });

    const description = expectation.modifier ? expectation.commit?.trailers[expectation.modifier] : '';

    expect(description).toBe('Need to fix feature');
  });
});
