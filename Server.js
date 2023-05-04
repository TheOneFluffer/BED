const http = require('http');
const port = 5000;
const host = "localhost";
const path = require('path');
const fs = require('fs');
const server = http.createServer(function(req,res){
    const { headers, method, url } = req;
    let body = [];
    
    req.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();

      console.log(body.length);
      // At this point, we have the headers, method, url and body, and can now
      // do whatever we need to in order to respond to this request.

        if (req.method=="GET"){ //GET Req will retrieve files from server
            var filename=req.url;
            if (filename=="/") {
                filename="./index.html";
            }
            var absFileLocation=path.resolve("./public"+filename);
            console.log(absFileLocation);
            fs.exists(absFileLocation,function(exists){
                if(exists){
                    res.statusCode=200;
                } else {
                    absFileLocation=path.resolve("./public/error.html");
                    res.statusCode=404;
                }
                res.setHeader("Content-Type","text/html");
                fs.createReadStream(absFileLocation).pipe(res);
            })
        }
        else if (req.method == "POST") {
            console.log(body);
            console.log(req.url);
        }
    });
    console.log(req.method);
    console.log(req.url);
    // res.statusCode=200;
    // res.setHeader("Content-Type","text/html");
    // res.end("<html><body>Welcome to failure management!></body></html>");
});

server.listen(port,host,function(){
    console.log(`Server started at http://${host}:${port}`);
});