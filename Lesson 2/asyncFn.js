const fs = require('fs');

//async
function processFile(filepath, callback)
{
    fs.readFile(filepath, "utf8", function(err, data)
    {
        if (err)
        {
            return callback(err,null, "Your file cannot be processed!");
        }
        else
        {
            return callback(null,data, "File has been processed");
        }
    });
}

processFile("Classes.js", function (err, msg)
{
    console.log(err);
    console.log(msg);
})