const mysql = require('mysql');

//This is used to connect to the mysql database
var dbconnect = 
{
    getConnection: function()
    {
        var conn = mysql.createConnection
        ({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'Neko sama 123',
            database: 'friendbook',
            dateStrings: true
        });
        return conn;
    }
};

//put this at the end of the file
module.exports = dbconnect;