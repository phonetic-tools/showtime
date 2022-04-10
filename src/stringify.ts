import { Stream } from 'stream';

export function stringifyStream(stream: Stream): Promise<string> {
  const chunks: Buffer[] = [];

  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(Buffer.from(chunk)));
    stream.on('error', error => reject(error));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString()));
  });
}
