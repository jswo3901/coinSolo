'use strict';

const path = require('path');

// @CRA This is a custom Jest transformer turning file imports into filenames.
// @CRA http:// @CRAfacebook.github.io/jest/docs/tutorial-webpack.html

module.exports = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
