var express = require('express');
var serveStatic = require('serve-static');
var app = express();
var port=3000;
var hostname="localhost";

//Adding middleware below
//Use the second one if it is from online
app.use(function(req,res,next)
{
    //Custom middleware
    console.log(req.method);
    console.log(req.url);
    next();
});

app.use(serveStatic(__dirname + '/public')); //apply middleware with app.use


app.listen(port, hostname, () => 
{
    console.log(`Server started and accessible via http://${hostname}:${port}/`);
});