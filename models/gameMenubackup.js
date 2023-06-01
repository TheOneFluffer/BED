var db = require('./databaseConfig.js');

const gameDB = 
{
    //Show all games in database
    getGame: function(callback)
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
                var sql = "SELECT * FROM game;";
                dbConn.query(sql, [], function(err, results)
                {
                    return callback(err,results);
                })
            }
        });
    },
      
    addGame: function(title, description, price, platformid, categoryid, year, callback) {
        var dbConn = db.getConnection();
      
        dbConn.connect(function(err) {
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            console.log("Connected!");
      
            // Split comma-separated input from postman
            var priceSplit = price.split(',');
            var platformSplit = platformid.split(',');
      
            var sql = 'INSERT INTO game (title, description, price, platformid, categoryid, year) VALUES (?, ?, ?, ?, ?, ?);';
      
            // Loop to execute the query three times
            for (var i = 0; i < priceSplit.length; i++) {
              dbConn.query(sql, [title, description, priceSplit[i], platformSplit[i], categoryid, year], function(err, result) {
                if (err) {
                  console.log(err);
                  return callback(err, null);
                } else {
                  console.log(result.affectedRows);
                }
              });
            }
      
            dbConn.end();
            return callback(null, priceSplit.length); // Return the number of times the query was executed
          }
        });
      },

    addPlatform: function(fk_game, fk_platform, callback)
    {
        var dbConn = db.getConnection();
      
        dbConn.connect(function(err)
        {
            if (err)
            {
                console.log(err);
                return callback(err, null);
            }
            else
            {
                console.log("Connected!");

                // Split comma-separated input from postman
                var priceSplit = price.split(',');
                var platformSplit = platformid.split(',');

                var fk_sql = `INSERT INTO game_platform (fk_game, fk_platform) VALUES (?, ?);`;
      
                // Loop to execute the query for each platform
                for (var i = 0; i < priceSplit.length; i++)
                {
                    dbConn.query(fk_sql, [priceSplit[i], platformSplit[i]], function(err, result)
                    {
                        if (err)
                        {
                            console.log(err);
                            return callback(err, null);
                        }
                        else
                        {
                            console.log(result.affectedRows);
                        }
                   });
                    dbConn.query()
                }
            dbConn.end();
            return callback(null, priceSplit.length); // Return the number of platforms added
        }
    });
    },
      
    addCategory: function(fk_game, fk_platform, callback)
    {
        var dbConn = db.getConnection();
      
        dbConn.connect(function(err)
        {
            if (err)
            {
                console.log(err);
                return callback(err, null);
            }
            else
            {
                console.log("Connected!");

                // Split comma-separated input from postman
                var priceSplit = price.split(',');
                var platformSplit = platformid.split(',');

                var fk_sql = `INSERT INTO game_platform (fk_game, fk_platform) VALUES (?, ?);`;
      
                // Loop to execute the query for each platform
                for (var i = 0; i < priceSplit.length; i++)
                {
                    dbConn.query(fk_sql, [priceSplit[i], platformSplit[i]], function(err, result)
                    {
                        if (err)
                        {
                            console.log(err);
                            return callback(err, null);
                        }
                        else
                        {
                            console.log(result.affectedRows);
                        }
                   });
                    dbConn.query()
                }
            dbConn.end();
            return callback(null, priceSplit.length); // Return the number of platforms added
        }
    });
    },

    getGameID: function(platformid, callback)
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
                var sql = "SELECT * FROM game WHERE platformid = ?";
                dbConn.query(sql, [platformid], function(err, results)
                {
                    return callback(err, results);
                })
            }
        });
    }

    // End of gameDB program
}

module.exports = gameDB;