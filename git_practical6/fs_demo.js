const fs = require('fs');

// CREATE file
fs.writeFileSync('test.txt', 'Hello World');

// READ file
console.log('READ:', fs.readFileSync('test.txt','utf8'));

// APPEND file
fs.appendFileSync('test.txt', '\nAdded line');

// READ after append
console.log('UPDATED:', fs.readFileSync('test.txt','utf8'));

// DELETE file
fs.unlinkSync('test.txt');

console.log('File deleted');
