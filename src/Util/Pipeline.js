class Pipeline {
  constructor(tag='', steps = []) {
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

  async invoke(data) {
    if (!this.isValid)
      throw new Error('Pipeline has been invalidated after previous invocation');
    if (!Array.isArray(data))
      throw new Error('data must be an array');

    for (const step of this.steps) {
      if (step instanceof Pipeline) {
        data = await step.invoke(data);
      } else if (typeof step === 'function') {
        data = await step(data);
      } else {
        throw new Error('Step must be a function or Pipeline');
      }
      if (!Array.isArray(data)) {
        throw new Error('Each step should return the mutated data array');
      }
    }

    this.isValid = false;  // invalidate pipeline after invocation

    return data;  // do NOT store outputData, just return
  }
}

module.exports = { Pipeline };
