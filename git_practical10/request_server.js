const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);

    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', req.headers);

    res.writeHead(200, {'Content-Type': 'text/plain'});

    if(req.method === 'GET') {
        res.end('GET Request Received');
    } else if(req.method === 'POST') {
        res.end('POST Request Received');
    } else {
        res.end('Other Request');
    }
});

server.listen(8080, () => {
    console.log('Server running on port 8080');
});
