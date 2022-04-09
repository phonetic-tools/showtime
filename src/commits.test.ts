import {
  describe, expect, it, jest,
} from '@jest/globals';
import { readCommits } from './commits';

describe(readCommits.name, () => {
  it('should read commits', async () => {
    const commits = await readCommits('./repos/showtime-example-one', '');

    expect(commits).toMatchInlineSnapshot(`
Array [
  Object {
    "author": "Philip Bordallo",
    "authoredDate": "2022-04-03T22:41:52-04:00",
    "committedDate": "2022-04-03T22:41:52-04:00",
    "committer": "GitHub",
    "hash": "e0bc36e734dce696fcf04f1e9d2d889eac484cbd",
    "subject": "Add feature two (#4)",
    "trailers": Object {
      "Type": "fix",
    },
  },
  Object {
    "author": "Philip Bordallo",
    "authoredDate": "2022-04-03T21:57:40-04:00",
    "committedDate": "2022-04-03T21:57:40-04:00",
    "committer": "GitHub",
    "hash": "889c59d32a779fe10085a2514d32a02669802f52",
    "subject": "Remove feature fix (#3)",
    "trailers": Object {
      "Breaking-Change": "This will remove the ability to use the fix",
      "Type": "fix",
    },
  },
  Object {
    "author": "Philip Bordallo",
    "authoredDate": "2022-04-03T21:44:01-04:00",
    "committedDate": "2022-04-03T21:44:01-04:00",
    "committer": "GitHub",
    "hash": "83df1cbdde84cd13e78c6ca66b41c0cae54f79e4",
    "subject": "Fix broken feature (#2)",
    "trailers": Object {
      "Type": "fix",
    },
  },
  Object {
    "author": "Philip Bordallo",
    "authoredDate": "2022-04-03T21:31:31-04:00",
    "committedDate": "2022-04-03T21:31:31-04:00",
    "committer": "GitHub",
    "hash": "7ac84eb3e30fe38d2ac0f2ed4cbd9ffa8a953020",
    "subject": "Add new feature (#1)",
    "trailers": Object {
      "Type": "feature",
    },
  },
  Object {
    "author": "Philip Bordallo",
    "authoredDate": "2022-04-03T21:01:59-04:00",
    "committedDate": "2022-04-03T21:01:59-04:00",
    "committer": "GitHub",
    "hash": "68b418e5f3da02611f6891c63c7c027adbdaca13",
    "subject": "Initial commit",
    "trailers": Object {},
  },
]
`);
  });

  it('should read commits since a specific tag', async () => {
    const commits = await readCommits('./repos/showtime-example-one', 'v1.0.0');

    expect(commits).toMatchInlineSnapshot(`
Array [
  Object {
    "author": "Philip Bordallo",
    "authoredDate": "2022-04-03T22:41:52-04:00",
    "committedDate": "2022-04-03T22:41:52-04:00",
    "committer": "GitHub",
    "hash": "e0bc36e734dce696fcf04f1e9d2d889eac484cbd",
    "subject": "Add feature two (#4)",
    "trailers": Object {
      "Type": "fix",
    },
  },
]
`);
  });

  it('should default to cwd if no repoPath is given', async () => {
    const spy = jest.spyOn(process, 'cwd');
    spy.mockReturnValue('./repos/showtime-example-one');

    const commits = await readCommits();
    expect(commits).toMatchInlineSnapshot(`
Array [
  Object {
    "author": "Philip Bordallo",
    "authoredDate": "2022-04-03T22:41:52-04:00",
    "committedDate": "2022-04-03T22:41:52-04:00",
    "committer": "GitHub",
    "hash": "e0bc36e734dce696fcf04f1e9d2d889eac484cbd",
    "subject": "Add feature two (#4)",
    "trailers": Object {
      "Type": "fix",
    },
  },
  Object {
    "author": "Philip Bordallo",
    "authoredDate": "2022-04-03T21:57:40-04:00",
    "committedDate": "2022-04-03T21:57:40-04:00",
    "committer": "GitHub",
    "hash": "889c59d32a779fe10085a2514d32a02669802f52",
    "subject": "Remove feature fix (#3)",
    "trailers": Object {
      "Breaking-Change": "This will remove the ability to use the fix",
      "Type": "fix",
    },
  },
  Object {
    "author": "Philip Bordallo",
    "authoredDate": "2022-04-03T21:44:01-04:00",
    "committedDate": "2022-04-03T21:44:01-04:00",
    "committer": "GitHub",
    "hash": "83df1cbdde84cd13e78c6ca66b41c0cae54f79e4",
    "subject": "Fix broken feature (#2)",
    "trailers": Object {
      "Type": "fix",
    },
  },
  Object {
    "author": "Philip Bordallo",
    "authoredDate": "2022-04-03T21:31:31-04:00",
    "committedDate": "2022-04-03T21:31:31-04:00",
    "committer": "GitHub",
    "hash": "7ac84eb3e30fe38d2ac0f2ed4cbd9ffa8a953020",
    "subject": "Add new feature (#1)",
    "trailers": Object {
      "Type": "feature",
    },
  },
  Object {
    "author": "Philip Bordallo",
    "authoredDate": "2022-04-03T21:01:59-04:00",
    "committedDate": "2022-04-03T21:01:59-04:00",
    "committer": "GitHub",
    "hash": "68b418e5f3da02611f6891c63c7c027adbdaca13",
    "subject": "Initial commit",
    "trailers": Object {},
  },
]
`);
  });
});
