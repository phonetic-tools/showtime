import { describe, expect, it } from '@jest/globals';

import { stringifyFormat, stringifyStream } from './stringify';
import { Readable } from 'stream';

describe(stringifyFormat.name, () => {
  it('should stringify an object', () => {
    const format = stringifyFormat({
      author: '%an',
      hash: '%H',
      subject: '%s',
    });

    expect(format).toBe('{"author":"%an","hash":"%H","subject":"%s"}');
  });

  it('should remove any extra spaces', () => {
    const format = stringifyFormat({
      longSpace: '      hi      ',
    });

    expect(format).toBe('{"longSpace":"hi"}');
  });
});

describe(stringifyStream.name, () => {
  it('should stringify a stream', async () => {
    const stream = Readable.from('Hello World');
    const data = await stringifyStream(stream);

    expect(data).toBe('Hello World');
  });

  it('should handle errors', async () => {
    const stream = Readable.from('Hello World');
    const data = stringifyStream(stream);

    stream.destroy(new Error('Uh oh, this is bad.'));

    await expect(data).rejects.toThrow('Uh oh, this is bad.');
  });
});
