var db = require('./databaseConfig.js');

const platformDB = 
{
    //Show all categories in database
    getPlatform: function(callback)
    {
        var dbConn = db.getConnection();

        dbConn.connect(function(err)
        {
            //connect to mysql db
            if(err)
            {
                console.log(err);
                return callback(err, null);
            }
            else
            {
                //Success connection to database
                var sql = "SELECT * FROM platform;";
                dbConn.query(sql, [], function(err, results)
                {
                    return callback(err,results);
                })
            }
        });
    },

    //Add user into database
    addPlatform: function(platform_name, description, callback)
    {
        var dbConn = db.getConnection();

        dbConn.connect(function (err)
        {
            if (err)
            {
                console.log(err);
                return callback(err, null);
            }
            else
            {
                console.log("Connected!");

                var sql = 'INSERT INTO platform (platform_name, description) VALUES (?, ?);';

                dbConn.query(sql, [platform_name, description], function (err, result) 
                {
                    dbConn.end();

                    if (err) 
                    {
                        console.log(err);
                        return callback(err, null);
                    }
                    else
                    {
                        console.log(result.affectedRows);
                        return callback(null, result.affectedRows);
                    }
                });
            }
        });
    }

    // End of platformMenu program
}

module.exports = platformDB;