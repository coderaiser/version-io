'use strict';

const {run} = require('madrun');

module.exports = {
    'lint': () => 'putout lib test madrun.js',
    'fix:lint': () => run('lint', '--fix'),
};

