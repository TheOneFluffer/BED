var mysql = require('mysql');

var dbconnect = 
{
    getConnection: function ()
    {
        var conn = mysql.createConnection
        ({
            host: "localhost",
            user: "root",
            password: "Neko sama 123",
            database: "furniture24"
        });
        return conn;
    }
};

module.exports = dbconnect;