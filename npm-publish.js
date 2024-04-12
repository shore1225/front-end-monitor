const fs = require('fs');
const origin = './dist/main.js';
const target = './lib/main.js';

fs.rename(origin, target, (err) => {
    if (err) throw err;
});