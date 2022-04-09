import { spawn } from 'child_process';
import { stringifyFormat, stringifyStream } from './stringify';


export const KEY_VALUE_SEPARATOR = ':';
export const NEW_LINE_SEPARATOR = '\n';

export type Trailer = Record<string, string>;

export type Commit = {
  author: string,
  authoredDate: string,
  committedDate: string,
  committer: string,
  hash: string,
  subject: string,
  trailers: Trailer,
};

type RawCommit = Omit<Commit, 'trailers'> & {
  rawTrailers: string,
};

/**
 * Take `data`, split it by a `separator` into values, remove any empty values,
 * and map over each line with a `callback`
 */
function splitParser<ParsedValue>(
  data: string,
  callback: (value: string) => ParsedValue,
  separator = NEW_LINE_SEPARATOR,
): ParsedValue[] {
  return data
    .split(separator)
    .filter(Boolean)
    .map(callback);
}

/**
 * Create a key-value pair of trailers and remove extra whitespace
 */
function createTrailerKeyValue(trailer: string): string[] {
  return trailer
    .split(KEY_VALUE_SEPARATOR)
    .map(item => item.trimStart());
}

/**
 * Parse string commits into commit objects.
 */
function commitParser(rawCommits: string): Commit[] {
  return splitParser<Commit>(rawCommits, (item) => {
    const {
      rawTrailers,
      hash,
      subject,
      author,
      authoredDate,
      committer,
      committedDate,
    } = JSON.parse(item) as RawCommit;

    const trailers = Object.fromEntries(
      splitParser(
        rawTrailers,
        createTrailerKeyValue,
      ),
    ) as Trailer;

    return {
      author,
      authoredDate,
      committer,
      committedDate,
      hash,
      subject,
      trailers,
    };
  });
}

/**
 *
 * @param repoPath The path of the git repo to read from. Defaults to `process.cwd()`
 * @returns
 */
export async function readCommits(
  repoPath: string = process.cwd(),
  tag?: string,
): Promise<Commit[]> {
  const format = stringifyFormat<RawCommit>({
    author: '%aN', // Respecting mailmap
    authoredDate: '%aI',
    committer: '%cN', // Respecting mailmap
    committedDate: '%cI',
    hash: '%H',
    subject: '%s',
    rawTrailers: `%(trailers:separator=${NEW_LINE_SEPARATOR})`,
  });
  const args = [
    'log',
    `--format=${format}`,
    tag ? `${tag}..HEAD` : '',
  ].filter(Boolean);

  const commitStream = spawn('git', args, { cwd: repoPath }).stdout;

  const data = await stringifyStream(commitStream);
  return commitParser(data);
}
