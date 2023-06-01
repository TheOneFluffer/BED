var db = require('./databaseConfig.js');

const reviewDB = 
{
    //Show all users in database
    getReviews: function(callback)
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
                var sql = "SELECT * FROM review;";
                dbConn.query(sql, [], function(err, results)
                {
                    return callback(err,results);
                })
            }
        });
    },

    //Add user into database
    addReviews: function(userid, gameid, content, rating, callback)
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

                var sql = 'INSERT INTO review (userid, gameid, content, rating) VALUES (?, ?);';

                dbConn.query(sql, [userid, gameid, content, rating], function (err, result) 
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
    // End of reviewDB program
}

module.exports = reviewDB;