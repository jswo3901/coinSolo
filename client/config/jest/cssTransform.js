'use strict';

// @CRA This is a custom Jest transformer turning style imports into empty objects.
// @CRA http:// @CRAfacebook.github.io/jest/docs/tutorial-webpack.html

module.exports = {
  process() {
    return 'module.exports = {};';
  },
  getCacheKey() {
    // @CRA The output is always the same.
    return 'cssTransform';
  },
};
