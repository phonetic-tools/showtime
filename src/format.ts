const STRINGIFY_QUOTE = '<~>';

export function stringifyFormat<T>(format: T): string {
  return JSON.stringify(format).replace(/"/g, STRINGIFY_QUOTE);
}

export function parseFormat<T>(format: string): T {
  const regexp = new RegExp(STRINGIFY_QUOTE, 'g');

  const parsableFormat = format
    .replace(/"/g, '\\"') // Escape any quotes
    .replace(regexp, '"');

  return JSON.parse(parsableFormat) as T;
}
