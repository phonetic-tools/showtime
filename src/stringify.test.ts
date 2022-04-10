import { describe, expect, it } from '@jest/globals';

import { stringifyStream } from './stringify';
import { Readable } from 'stream';

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
