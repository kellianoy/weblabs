const express = require('express')
const app = express()
const http = require('http')
const url = require('url')
const qs = require('querystring')

const config = {
  port: 3000,
  ip: "http://localhost" 
}



const data = {
  channels: [{
    id: '1',
    name: 'Channel 1',
  },{
    id: '2',
    name: 'Channel 2',
  },{
    id: '3',
    name: 'Channel 3',
  }]
}

const header = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>Chat Application</title>' +
"<style> @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap'); </style> " +
'    </head>' + 
'    <body>' +
"       <h1 style='text-align : center; font-family: Montserrat, sans-serif;'>typetrack</h1>"

const footer = '    </body>' +
'</html>'

const content = header +
"       <p>It is still a WIP and it will gradually get better, for now, excuse the mess.</p>" +
"       <h2>How to use the website</h2> " +
"       <p>Simply put, when you access the website using /channels, you access a list of channels.</p> " +
"       <p>You will eventually connect with other users and have a chat with them.</p> " +
"       <a href='"+config.ip+ ":"+config.port+"/channels'><p>Access channels</p></a> " +
footer




app.get('/', (req, res) => {
  res.send(content);
})

app.get('/channels', (req, res) => {
  chanContent = header +
  "<h2>List of channels</h2><ul>";
  data.channels.forEach(element => {
      chanContent+= "<div style='width:10%; height:10%; padding:1%; box-shadow:0 5px 10px rgba(0,0,0,.15);'><li><a href="
      +config.ip + ":" + config.port+"/channel/" 
      + element.id + ">" + element.name + "</a></li></div>";
    })
    chanContent+= "</ul>" + footer;
  res.send(chanContent);
})

app.get('/channel/:id', (req, res) => {
  chanContent = header +
  "<h2>Welcome, newcomer, to Channel " + req.params.id +" !</h2>" +
  "<p> Here, you can find all available informations about channel one in the simplest manner.</p>"+footer;
  res.send(chanContent);
})

app.listen(config.port, () => {
  console.log("Chat is waiting for you at " + config.ip + ":" + config.port)
})