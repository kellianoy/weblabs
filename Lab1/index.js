// Import Node html module
const http = require('http')
//Import handles module
const handles = require('./handles')

const server = http.createServer(handles.serverHandle);
server.listen(8080)

