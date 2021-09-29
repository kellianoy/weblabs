// Import Node html module
const http = require('http')
// Import Node url module
const url = require('url')
//Import Node querystring module
const qs = require('querystring')

// Define a string constant concatenating strings
const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
'       <h1>Welcome to the new technology</h1>' +
'        <p>Life if short but it would be cool to die earlier though</p>' +
'    </body>' +
'</html>'

const serverHandle = function (req, res) {
  const route = url.parse(req.url)
  const path = route.pathname 
  const params = qs.parse(route.query)
  
  res.writeHead(200, {'Content-Type': 'text/plain'});
  if (path === '/hello' && 'name' in params) {
    res.write('Hello ' + params['name'])
  } else {
    res.write('Hello anonymous')
  }
  
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(content);  
  res.end();
}

const server = http.createServer(serverHandle);
server.listen(8080)

