import { describe, expect, it } from '@jest/globals';
import { parseFormat, stringifyFormat } from './format';

describe('format', () => {
  it('should stringify and parse an object', () => {
    const format = stringifyFormat({
      author: '%an',
      hash: '%H',
      subject: '%s',
      specialCharacters: 'WITH_SPECIAL_CHARACTERS',
    });

    const expected = parseFormat(format.replace(/WITH_SPECIAL_CHARACTERS/, '"{\'}'));

    expect(expected).toStrictEqual({
      author: '%an',
      hash: '%H',
      subject: '%s',
      specialCharacters: '"{\'}',
    });
  });
});
