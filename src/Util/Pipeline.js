/**
* Executes chronological data transformation steps
*/
class Pipeline {
  /**
  * @param {string} tag
  * @param {Array} steps - array of pipeline steps
   */
  constructor(tag = '', steps = []) {
    if (!Array.isArray(steps) || !steps.every(s => typeof s === 'function' || s instanceof Pipeline)) {
      throw new Error('steps must be an array of functions or Pipelines');
    }
    if (tag !== null && typeof tag !== 'string') {
      throw new Error('tag must be null or string');
    }
    this.steps = steps;
    this.tag = tag;
    this.isValid = true;
  }

  /**
   * executes the pipeline
   * @param {Array} data - data array to transform (omit if data inits in the pipeline itself)
   * @returns {Promise<Array>} - transformed data array (the same reference as the first parameter, but now transformed)
   */
  async invoke(data = []) {
    if (!this.isValid) throw new Error('Pipeline has been invalidated after previous invocation');
    if (!Array.isArray(data)) throw new Error('data must be an array');
    
    for (const step of this.steps) {
      data = await (step instanceof Pipeline ? step.invoke(data) : step(data));
      if (!Array.isArray(data)) throw new Error('Each step should return the mutated data array (you probably forgot `return data;` in the composable');
    }
    
    this.isValid = false;
    return data;
  }
}

module.exports = { Pipeline };