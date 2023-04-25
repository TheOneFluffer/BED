const fs = require('fs');

fs.readFile('./test.txt', "utf8", function(err, data)
{
    console.log("Reading with Async: " + data.toString());
})