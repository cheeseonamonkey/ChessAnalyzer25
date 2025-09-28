const Pipeline = require("../../src/Util/Pipeline").Pipeline;

describe('Pipeline with numerical data [1, 2, 3]', () => {

    test('smoke test simple', async () => {
        const pipe = new Pipeline('root pipe', [
          data => data.map(it => it + 1),
          data => data.map(it => it + 1),
          new Pipeline('sub pipe', [
            data => data.map(it => it + 1),
          ])
        ]);
      
        let input = [2, 2, 2, 2];
        const result = await pipe.invoke(input);

        expect(result).toEqual([5,5,5,5]);  
        
      });
      

  test('constructor validations', () => {
    expect(() => new Pipeline('tag', [1])).toThrow();
    expect(() => new Pipeline([], 123)).toThrow(); // tag is [], invalid type
    expect(() => new Pipeline(null, [() => []])).not.toThrow();
    expect(() => new Pipeline(null, [new Pipeline()])).not.toThrow();
  });

  test('invoke with numerical input array [1, 2, 3]', async () => {
    const pipeline = new Pipeline(null, [
      data => data.map(x => x * 2),  // double each number
    ]);
    const input = [1, 2, 3];
    const result = await pipeline.invoke(input);
    expect(result).toEqual([2, 4, 6]);
  });

  test('invoke with nested pipelines and numerical data', async () => {
    const sub = new Pipeline(null, [data => data.map(x => x + 1)]);
    const pipeline = new Pipeline(null, [sub, data => data.map(x => x * 3)]);
    const input = [1, 2, 3];
    const result = await pipeline.invoke(input);
    expect(result).toEqual([6, 9, 12]); // (1+1)*3=6, (2+1)*3=9, (3+1)*3=12
  });

  test('pipeline invalidated after invoked', async () => {
    const pipeline = new Pipeline(null, [data => data]);
    const input = [1, 2, 3];
    await pipeline.invoke(input);
    await expect(pipeline.invoke(input)).rejects.toThrow();
  });

});
