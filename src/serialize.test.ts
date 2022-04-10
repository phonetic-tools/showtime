import { describe, expect, it } from '@jest/globals';
import { deserialize, serialize } from './serialize';

describe(serialize.name, () => {
  it('should stringify and parse an object', () => {
    const content = serialize({
      author: '%an',
      hash: '%H',
      subject: '%s',
      specialCharacters: 'WITH_SPECIAL_CHARACTERS',
    });

    const output = deserialize(content.replace(/WITH_SPECIAL_CHARACTERS/, '"{\'}'));

    expect(output).toStrictEqual({
      author: '%an',
      hash: '%H',
      subject: '%s',
      specialCharacters: '"{\'}',
    });
  });
});
