const fs = require('fs');
const path = require('path');


// Custom find-up function
function findUpSync(filename, startDir = __dirname) {
  let dir = startDir;
  while (true) {
    const target = path.join(dir, filename);
    if (fs.existsSync(target)) return target;
    const parent = path.dirname(dir);
    if (parent === dir) return null; // reached root
    dir = parent;
  }
}

// Usage in your Cache class
class Cache {
  dir; //string

  Users; //object for DSL?

  constructor() {
    this.init_cache();
  }

  init_cache() {
    const packageJsonPath = findUpSync('package.json');
    if (!packageJsonPath) {
      throw new Error('Could not find project root (no package.json found!)');
    }

    const rootDir = path.dirname(packageJsonPath);
    this.dir = path.resolve(rootDir, '.cache');

    fs.mkdirSync(this.dir, { recursive: true });
    fs.mkdirSync(path.join(this.dir, 'Users'), { recursive: true });
  }

  clear_cache() {
    if (fs.existsSync(this.dir)) {
      fs.rmSync(this.dir, { recursive: true, force: true });
    }
  }



}


module.exports = {
    Cache
};



// Example usage
// let c = new Cache();
// c.clear_cache();
