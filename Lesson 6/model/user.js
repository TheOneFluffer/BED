const db = require('./databaseConfig.js');

var userDB =
{
    //Getting users
    getUser:function(callback)
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
                var sql = "select * from user";
                dbConn.query(sql, [], function(err, results)
                {
                    return callback(err,results);
                })
            }
        });
    },

    //Getting user by user id
    getUserByUserid: function(userid, callback)
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
                var sql = "select * from user where userid = ?";
                dbConn.query(sql, [userid], function(err, results)
                {
                    return callback(err,results);
                })
            }
        });
    },

    //Add user
    addUser: function (username, email, role, password, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected!");

                var sql = 'INSERT INTO user (username, email, role, password) VALUES (?, ?, ?, ?)';

                conn.query(sql, [username, email, role, password], function (err, result) {
                    conn.end();

                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result.affectedRows);
                        return callback(null, result.affectedRows);
                    }
                });
            }
        });
    },

    //insert user using post
    insertUser: function(userid, callback)
    {
        var dbConn = db.getConnection();

        dbConn.connect(function(err)
        {
            //connect to mysql db
            if(err)
            {
                return callback(err, null);
            }

            else
            {
                //Success connection to database
                var sql = "insert into user(username, email, password, role) values(?,?,?,?)";
                dbConn.query(sql, [username, email, password, role], function(err, results)
                {
                    return callback(err,results);
                })
            }
        });
    },

    updateUser: function(email,password,userid, callback)
    {
        var dbConn = db.getConnection();

        dbConn.connect(function(err)
        {
            //connect to mysql db
            if(err)
            {
                return callback(err, null);
            }

            else
            {
                //Success connection to database
                var sql = "insert into user(username, email, password, role) values(?,?,?,?)";
                dbConn.query(sql, [username, email, password, role], function(err, results)
                {
                    return callback(err,results);
                })
            }
        });
    },

    //delete user
    
}

module.exports = userDB;