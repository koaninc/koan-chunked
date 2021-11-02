# koan-chunked
**Work in progress - please don't mind the momentary mess**

Helper functions to create and apply chunks. It's a wrapper around [lodash chunk](https://lodash.com/docs/4.17.15#chunk) that provides additional logging and a way to process the chunks.

## Install
Using npm

```bash
npm i koan-chunked
```

Add to the top of the file
```typescript
import * as chunked from "koan-chunked"
```
## Usage
### from => Chunk items in an array (can be any valid TypeScript type)

```typescript
/*
* @param ts {array}
* @param chunkSize {number}
*/
```

```typescript
const original: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const groupedByTwo = chunked.from(original, 2);

/* groupedByTwo = {
      "total": 10,
      "chunks": [
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
        [9, 10]
      ]
    }
*/
```

### apply => Unwind chunked items
```typescript
type Chunked<T> = { total: number; chunks: T[][] };

/*
* @param chunked {Chunked<T>}
* @param applyChunk {function that returns a Promise}
*/
```

```typescript
  await chunked.apply(groupedByTwo, (chunk) =>
    Promise.all(chunk.map((item) => console.log(item)),
  ));

  // This will console.log each item in groupedByTwo
```
