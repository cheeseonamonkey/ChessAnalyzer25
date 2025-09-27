

const fs = require('fs');
const path = require('path');
const { Cache } = require("../../../src/Layers/ProxyLayer/Caching");

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let cache = new Cache()

test('should create .cache dir (and sub-dirs)', () => {
    expect(fs.existsSync(cache.dir)).toBe(true);

    expect(fs.existsSync(path.join(cache.dir, 'Users'))).toBe(true);
});


test('should clear .cache directory', async () => {
    await sleep(2800)
    cache.clear_cache();
    expect(fs.existsSync(cache.dir)).toBe(false);
});

