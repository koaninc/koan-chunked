import * as chunked from "../src/chunked";
import { expect } from "chai";
import sinon from "sinon";

describe("chunked unit tests", (): void => {
  const original: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  describe("from", (): void => {
    it("groups of 2", (): void => {
      const actual = chunked.from(original, 2);
      const expected = {
        "total": 10,
        "chunks": [
          [1, 2],
          [3, 4],
          [5, 6],
          [7, 8],
          [9, 10]
        ]
      };
      expect(actual).to.deep.equal(expected);
    });

    it("groups of 4", (): void => {
      const actual = chunked.from(original, 4);
      const expected = {
        "total": 10,
        "chunks": [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10]
        ]
      };
      expect(actual).to.deep.equal(expected);
    });
  });

  describe("apply", (): void => {
    let logSpy;

    beforeEach(() => {
      logSpy = sinon.spy(console, "log");
    });

    afterEach(() => {
      logSpy.restore();
    });

    it("chunk and apply", async(): Promise<void> => {
      const chunkedOriginal = chunked.from(original, 5);
      await chunked.apply(chunkedOriginal, (chunk) =>
        Promise.all(chunk.map((item) => item),
      ));

      sinon.assert.callCount(logSpy, 3);
    });

    it("chunk and apply with console log", async(): Promise<void> => {
      const chunkedOriginal = chunked.from(original, 4);
      await chunked.apply(chunkedOriginal, (chunk) =>
        Promise.all(chunk.map((item) => console.log(item)),
      ));

      sinon.assert.callCount(logSpy, 14);
    });
  });
});