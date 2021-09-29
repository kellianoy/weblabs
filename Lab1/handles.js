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
'       <h1>Welcome to the multiple routes website</h1>' +
"       <p>Now you're going to ask, what's so interesting about this website ?</p>" +
"       <h2>/hello</h2> " +
"       <p>Simply put, when you access the website using /hello, you are welcomed by our top-notch program.</p> " +
"       <p>By using /hell?name=[yourname], you are welcomed with the name you chose.</p> " +
"       <a href='http://localhost:8080/hello?name=curious viewer'><p>Try it out !</p></a> " +
'    </body>' +
'</html>'

const denied = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
"      <h1 style = 'text-align : center; margin : 0px; padding : 0px;'>ERROR 404 BAD GATEWAY</h1>" +
"      <p style = 'text-align : center; margin : 0px; padding : 0px;'>(it's forbidden hehe)</p>" +
'    </body>' +
'</html>'

module.exports = {
    serverHandle: function (req, res) {
      const route = url.parse(req.url)
      const path = route.pathname 
      const params = qs.parse(route.query)
      
      
      if (path === '/')
      {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(content);
      }
      else if (path === '/hello' && 'name' in params) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Hello ' + params['name'])
        if (params['name']==='Kellian' || params['name']==='Yann' )
        {
          res.write(" ! " + "Glad you're back. Your team is made of two not very competent members but you keep on trying and that is something at least. (I guess). " 
            + "You want to know more ? Well too bad, you won't. You'll have to try again... (Don't).")
        }
      
      } 
      else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(denied)
      }
      
      res.end();
    } 
  }