const fs = require('fs');
const path = require('path');
const findUp = require('find-up');

class Cache {
  dir; // .cache path

  constructor() {
    this.init_cache_sync();
  }

  init_cache_sync() {
    // find package.json synchronously
    const packageJsonPath = findUp.findUpSync('package.json');
    if (!packageJsonPath) {
      throw new Error('Could not find project root (no package.json found!)');
    }

    // get root dir
    const rootDir = path.dirname(packageJsonPath);
    this.dir = path.resolve(rootDir, '.cache');

    // create directories synchronously
    fs.mkdirSync(this.dir, { recursive: true });
    fs.mkdirSync(path.join(this.dir, 'Users'), { recursive: true });
  }

  clear_cache() {
    if (fs.existsSync(this.dir)) {
      fs.rmSync(this.dir, { recursive: true, force: true });
    }
  }
}

// Example usage
//let c = new Cache();
//c.clear_cache();

