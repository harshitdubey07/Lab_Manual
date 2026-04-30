const os = require('os');
const path = require('path');
const url = require('url');

console.log('OS type:', os.type());
console.log('Platform:', os.platform());
console.log('Free memory:', os.freemem());

console.log('Path join:', path.join('folder','file.txt'));

const myUrl = new URL('https://example.com/test?name=harshit');
console.log('Host:', myUrl.host);
console.log('Query:', myUrl.searchParams.get('name'));