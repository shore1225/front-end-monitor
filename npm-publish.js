const fs = require('fs');
const origin = './dist/main.js';
const target = './lib/main.js';

fs.renameSync(origin, target);
