const app = require('./controller/app');

var host = "localhost";
var port = 8080;

app.listen(port, host, function()
{
    console.log(`Server stated at http://${host}:${port}/`);
})