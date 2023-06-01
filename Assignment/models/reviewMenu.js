var db = require('./databaseConfig.js');

const reviewDB = 
{
    //Show all reviews in database
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
    addReviews: function(fk_user, fk_rgame, content, rating, callback)
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

                var sql = 'INSERT INTO review (fk_user, fk_rgame, content, rating) VALUES (?, ?, ?, ?);';

                dbConn.query(sql, [fk_user, fk_rgame, content, rating], function (err, result) 
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


    //Get review of game
    getGameReview: function(fk_rgame, callback)
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
                var sql = `SELECT gameid, content, rating, username, r.created_at
                FROM review r
                JOIN users ON r.fk_user = users.userid
                JOIN game ON r.fk_rgame = game.gameid
                WHERE r.fk_rgame = ?;`;
                dbConn.query(sql, [fk_rgame], function(err, results)
                {
                    return callback(err,results);
                })
            }
        });
    }

    // End of reviewDB program
}

module.exports = reviewDB;