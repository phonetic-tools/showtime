import { describe, expect, it } from '@jest/globals';
import { Config } from './config';
import { showtime } from './showtime';

const config: Config = {
  types: {
    feature: 'minor',
    fix: 'patch',
    documentation: 'none',
    release: 'none',
    merge: 'none',
  },
  modifiers: {
    'Breaking-Change': 'major',
  },
  repoPath: './repos/showtime-example-one',
};

describe(showtime.name, () => {
  it('should work', async () => {
    const expected = await showtime(config);

    expect(expected).toMatchInlineSnapshot(`
Object {
  "commit": Object {
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
  "modifier": "Breaking-Change",
  "name": "major",
  "value": 100,
}
`);
  });
});
