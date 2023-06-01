const mysql = require("mysql");

var dbConnect = 
{
    getConnection: function () 
    {
        var conn = mysql.createConnection(
        {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'Neko sama 123',
            database: 'game_server_assignment',
            dateStrings: true
        });
        return conn;
    }
};
  
  
// put this at the end of the file
module.exports = dbConnect;