var db = require('./databaseConfig.js');

const usersDB = 
{
    //Show all users in database
    getUsers: function(callback)
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
                var sql = "SELECT * FROM users;";
                dbConn.query(sql, [], function(err, results)
                {
                    return callback(err,results);
                })
            }
        });
    },

    //Add user into database
    addUsers: function(username, email, password, type, profile_pic_url, callback)
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

                var sql = 'INSERT INTO users (username, email, password, type, profile_pic_url) VALUES (?, ?, ?, ?, ?);';

                dbConn.query(sql, [username, email, password, type, profile_pic_url], function (err, result) 
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
    },

    //Get specific user
    getUserID: function(userid, callback)
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
                var sql = "SELECT * FROM users WHERE userid = ?";
                dbConn.query(sql, [userid], function(err, results)
                {
                    return callback(err, results);
                })
            }
        });
    }

    // End of usersDB program
}

module.exports = usersDB;