var db = require('./databaseConfig.js');

const gameDB =
{
    //Show all games in database
    getGame: function (callback) {
        var dbConn = db.getConnection();

        dbConn.connect(function (err) {
            //connect to mysql db
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                //Success connection to database
                var sql = "SELECT * FROM game;";
                dbConn.query(sql, [], function (err, results) {
                    return callback(err, results);
                })
            }
        });
    },


    addGame: function (title, description, price, platformid, categoryid, year, callback) {
        var dbConn = db.getConnection();

        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected!");

                // Split comma-separated input from postman
                var priceSplit = price.split(',');
                var platformSplit = platformid.split(',');

                var counter = 0;

                // Loop to execute the query depending on user input 
                for (var i = 0; i < priceSplit.length; i++) {
                    var newPrice = priceSplit[i];
                    var newPlatform = platformSplit[i];

                    var sql = 'INSERT INTO game (title, description, price, platformid, categoryid, year) VALUES (?, ?, ?, ?, ?, ?);';
                    dbConn.query(sql, [title, description, newPrice, newPlatform, categoryid, year], function (err, result) {
                        if (err) {
                            console.log(err);
                            return callback(err, null);
                        } else {
                            console.log(result.affectedRows);
                        }
                        counter++;

                        if (counter === priceSplit.length)
                        {
                            dbConn.end();
                            return callback(null, result); // Return the number of times the query was executed
                        }
                    });
                }

                
            }
        });
    },


    addPlatform: function (gameid, platformid, callback) {
        var dbConn = db.getConnection();
    
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected!");
    
                // Split comma-separated input from postman
                var platformSplit = platformid.split(',');
    
                for (var i = 0; i < platformSplit.length; i++) {
                    var newPlatform = platformSplit[i];
                    // Loop to execute the query for each platform
                    var sql = `INSERT INTO game_platform (fk_game, fk_platform) VALUES (?, ?);`;
    
                    dbConn.query(sql, [gameid, newPlatform], function (err, result) {
                        if (err) {
                            console.log(err);
                            return callback(err, null);
                        }
                    });
                }
    
                dbConn.end(); // Move dbConn.end() inside the loop
    
                return callback(null); // Return the number of platforms added
            }
        });
    },
    

    addCategory: function (gameid, categoryid, callback) {
        var dbConn = db.getConnection();
    
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected!");
    
                // Split comma-separated input from postman
                var categorySplit = categoryid.split(',');
    
                for (var i = 0; i < categorySplit.length; i++) {
                    var newCategory = categorySplit[i];
    
                    // Loop to execute the query for each platform
                    var sql = `INSERT INTO game_category (fk_gamec, fk_category) VALUES (?, ?);`;
    
                    dbConn.query(sql, [gameid, newCategory], function (err, result) {
                        if (err) {
                            console.log(err);
                            return callback(err, null);
                        }
                    });
                }
    
                dbConn.end(); // Move dbConn.end() inside the loop
    
                return callback(null); // Return the number of categories added
            }
        });
    },
    


    getGamePlatformandCategory: function (platformid, callback) {
        var dbConn = db.getConnection();

        dbConn.connect(function (err) {
            //connect to mysql db
            if (err) {
                console.log(err);
                return callback(err, null);
            }

            else {
                //Success connection to database
                var sql = `SELECT game.title, game.description, game.price, platform.platform_name, game.categoryid, category.catname, game.year
                FROM game
                INNER JOIN platform ON game.platformid = platform.platformid
                INNER JOIN category ON game.categoryid = category.categoryid
                WHERE game.platformid = ?;`;
                dbConn.query(sql, [platformid], function (err, results) {
                    return callback(err, results);
                })
            }
        });
    },

    deleteGame: function (gameid, callback) {
        var dbConn = db.getConnection();

        dbConn.connect(function (err) {
            //connect to mysql db
            if (err) {
                console.log(err);
                return callback(err, null);
            }

            else {
                //Success connection to database
                var sql = "DELETE FROM game WHERE gameid = ?;";
                dbConn.query(sql, [gameid], function (err, results) {
                    return callback(err, results);
                })
            }
        });
    }

    // End of gameDB program
}

module.exports = gameDB;