

const fs = require('fs');
const path = require('path');
const { readCache, writeCache } = require("../../../src/Layers/ProxyLayer/Caching");


  let cache = new Cache()

  test('should create .cache directory', () => {
    expect(fs.existsSync(cache.dir)).toBe(true);
    expect(fs.existsSync(path.join(cache.dir, 'Users'))).toBe(true);
  });

  test('should clear .cache directory', () => {
    cache.clear_cache();
    expect(fs.existsSync(cache.dir)).toBe(false);
  });



  // todo: fix cache tests
