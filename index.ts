import _ from 'lodash';

export type Chunked<T> = { total: number; chunks: T[][] };

function from<T>(ts: T[], chunkSize: number): Chunked<T> {
  const chunks = _.chunk(ts, chunkSize);
  console.log(`${ts.length} to apply in (${chunks.length} chunks)`);
  return { total: ts.length, chunks };
}

async function apply<T>(
  chunked: Chunked<T>,
  applyChunk: (ts: T[]) => Promise<any>,
): Promise<void> {
  const { chunks, total } = chunked;
  const chunkCount = chunks.length;
  const reportAt = Math.ceil(chunkCount / 10);

  const t0 = Date.now();
  let n = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const chunk of chunks) {
    // eslint-disable-next-line no-await-in-loop
    await applyChunk(chunk);
    n += chunk.length;

    if (n % reportAt === 0) {
      const dt = Math.floor((Date.now() - t0) / 1000);
      console.log(
        `${n} completed (${dt}s, ${Math.max(0, total - n)} remaining)`,
      );
    }
  }
}

export default {
  from,
  apply,
};
