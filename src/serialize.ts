const DOUBLE_QUOTE_CHARACTER = '<~>';

/**
 * Serialize an `object` into a `string` with a special character for double quotes.
 */
export function serialize<T>(input: T): string {
  return JSON.stringify(input).replace(/"/g, DOUBLE_QUOTE_CHARACTER);
}

/**
 * Deserialize a `string` back into an `object` with the special
 * character for double quotes removed and content double quotes escaped.
 */
export function deserialize<T>(input: string): T {
  const regexp = new RegExp(DOUBLE_QUOTE_CHARACTER, 'g');

  const parsableContent = input
    .replace(/"/g, '\\"') // Escape any quotes
    .replace(regexp, '"');

  return JSON.parse(parsableContent) as T;
}
