var express = require('express');
var bodyParser = require('body-parser');

//Import databases from /models
const usersDB = require('../models/usersMenu');
const categoryDB = require('../models/categoryMenu');
const platformDB = require('../models/platformMenu');
const gameDB = require('../models/gameMenu');
const reviewDB = require('../models/reviewMenu');

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json()); //parse appilcation/json data
app.use(urlencodedParser); //parse json data

//Webservice endpoints
//-------------------------------------------------
//Endpoint 1
app.get('/users', function (req, res) // Completed
{
    //processing
    usersDB.getUsers(function (err, results) {
        if (err) {
            console.log("err");
            res.status(500);
            res.type("json");
            res.send(`{"Message":"Internal Server Error"}`);
        }
        else {
            res.status(200);
            res.type("json");
            res.send(results);
        }
    });
});


//Endpoint 2
app.post('/users', function (req, res) //Somewhat complete, needs some more tweaking
{
    //retrieve user input
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var type = req.body.type;
    var profile_pic_url = req.body.profile_pic_url;

    usersDB.addUsers(username, email, password, type, profile_pic_url, function (err, results) {
        if (err) {
            if (err.code === "ER_DUP_ENTRY")// Check for Duplication Entry
            {
                if (err.sqlMessage.includes("email")) // Duplicate entry error for the email 
                {
                    console.log(err);
                    res.status(422);
                    res.type("json");
                    res.send({ "Message": "The email provided already exists." });
                }
            }

            else {
                console.log(err);
                res.status(500);
                res.type("json");
                res.send({ "Message": "Some error encountered!" });
            }
        }

        else {
            res.status(201);
            res.type("json");
            res.send("User has been created!");
        }
    });
})


//Endpoint 3
app.get('/users/:id', function (req, res) //Completed
{
    var userid = req.params.id;

    usersDB.getUserID(userid, function (err, results) {
        if (!err) {
            console.log("retrieving");
            res.status(200);
            res.type("json");
            res.send(results);
        }
        else {
            console.log(err);
            res.status(500);
            res.type("json");
            res.send(`{"Message":"Internal Server Error"}`);
        }
    });
});


//Endpoint 4
app.post('/category', function (req, res) //Completed
{
    //retrieve user input
    var catname = req.body.catname;
    var description = req.body.description;

    categoryDB.addCategory(catname, description, function (err, results) {
        if (err) {
            if (err.code === "ER_DUP_ENTRY")// Check for Duplication Entry
            {
                if (err.sqlMessage.includes("catname")) // Duplicate entry error for the email 
                {
                    console.log(err);
                    res.status(422);
                    res.type("json");
                    res.send({ "Message": "The category name provided already exists." });
                }
            }

            else {
                console.log(err);
                res.status(500);
                res.type("json");
                res.send({ "Message": "Internal Server Error" });
            }
        }

        else {
            res.status(201);
            res.type("json");
            res.send("Review has been created!");
        }
    });
})


//Optional endpoint for reading category
app.get('/category', function (req, res) // Completed
{
    //processing
    categoryDB.getCategory(function (err, results) {
        if (err) {
            console.log("err");
            res.status(500);
            res.type("json");
            res.send(`{"Message":"Internal Server Error"}`);
        }
        else {
            res.status(200);
            res.type("json");
            res.send(results);
        }
    });
});


//Endpoint 5
app.post('/platform', function (req, res) // Completed
{
    //retrieve user input
    var platform_name = req.body.platform_name;
    var description = req.body.description;

    platformDB.addPlatform(platform_name, description, function (err, results) {
        if (err) {
            if (err.code === "ER_DUP_ENTRY")// Check for Duplication Entry
            {
                if (err.sqlMessage.includes("platform_name")) // Duplicate entry error for the email 
                {
                    console.log(err);
                    res.status(422);
                    res.type("json");
                    res.send({ "Message": "The platform name provided already exists." });
                }
            }

            else {
                console.log(err);
                res.status(500);
                res.type("json");
                res.send({ "Message": "Internal Server Error" });
            }
        }

        else {
            res.status(201);
            res.type("json");
            res.send("New platform has been created!");
        }
    });
})


//Optional endpoint for reading platform
app.get('/platform', function (req, res) // Completed
{
    //processing
    platformDB.getPlatform(function (err, results) {
        if (err) {
            console.log("err");
            res.status(500);
            res.type("json");
            res.send(`{"Message":"Internal Server Error"}`);
        }
        else {
            res.status(200);
            res.type("json");
            res.send(results);
        }
    });
});


//Endpoint 6
app.post('/game', function (req, res) {
    //retrieve user input
    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    var platformid = req.body.platformid;
    var categoryid = req.body.categoryid;
    var year = req.body.year;

    gameDB.addGame(title, description, price, platformid, categoryid, year, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type("json");
            res.send({ "Message": "Internal Server Error" });
        } else {
            var gameid = result.insertId;

            gameDB.addPlatform(gameid, platformid, function (err) {
                if (err) {
                    console.log(err);
                    res.status(500);
                    res.type("json");
                    res.send({ "Message": "Internal Server Error" });
                } else {
                    gameDB.addCategory(gameid, categoryid, function (err) {
                        if (err) {
                            console.log(err);
                            res.status(500);
                            res.type("json");
                            res.send({ "Message": "Internal Server Error" });
                        } else {
                            res.status(201);
                            res.type("json");
                            res.send("New game has been added!");
                        }
                    });
                }
            });
        }
    });
});



//Optional endpoint for reading game
app.get('/game', function (req, res) // Completed
{
    //processing
    gameDB.getGame(function (err, results) {
        if (err) {
            console.log("err");
            res.status(500);
            res.type("json");
            res.send(`{"Message":"Internal Server Error"}`);
        }
        else {
            res.status(200);
            res.type("json");
            res.send(results);
        }
    });
});



//Endpoint 7
app.get('/game/:platformid', function (req, res) { //Completed
    //retrieve user input
    var platformid = req.params.platformid;

    gameDB.getGamePlatformandCategory(platformid, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type("json");
            res.send(`{"Message":"Internal Server Error"}`);
        }
        else {
            res.status(200);
            res.type("json");
            res.send(results);
        }
    });
});


//Endpoint 8
app.delete('/game/:gameid', function (req, res) { //Testing
    //retrieve user input
    var gameid = req.params.gameid;

    gameDB.deleteGame(gameid, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type("json");
            res.send({ "Message": "Some error encountered!" });
        } else {
            res.status(204);
            res.type("json");
            res.send("Game has been deleted!");
        }
    });
});


//Endpoint 9

//Endpoint 10
app.post('/users/:fk_user/game/:fk_rgame/review/', function (req, res) //Completed
{
    //retrieve user input
    var fk_user = req.params.fk_user;
    var fk_rgame = req.params.fk_rgame;
    var content = req.body.content;
    var rating = req.body.rating;

    reviewDB.addReviews(fk_user, fk_rgame, content, rating, function (err, results) {
        if (err) {
                console.log(err);
                res.status(500);
                res.type("json");
                res.send({ "Message": "Some error encountered!" });
            }

        else {
            res.status(201);
            res.type("json");
            res.send("Review has been created!");
        }
    });
});


//Optional endpoint for reading review
app.get('/review', function (req, res) // Completed
{
    //processing
    reviewDB.getReviews(function (err, results) {
        if (err) {
            console.log("err");
            res.status(500);
            res.type("json");
            res.send(`{"Message":"Internal Server Error"}`);
        }
        else {
            res.status(200);
            res.type("json");
            res.send(results);
        }
    });
});


//Endpoint 11
app.get('/game/:fk_rgame/review', function (req, res) { //Completed
    //retrieve user input
    var fk_rgame = req.params.fk_rgame;

    reviewDB.getGameReview(fk_rgame, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type("json");
            res.send(`{"Message":"Internal Server Error"}`);
        }
        else {
            res.status(200);
            res.type("json");
            res.send(results);
        }
    });
});

//If I ever need to delete stuff in mysql, code: 
//DELETE FROM game_server_assignment.users WHERE (username, email, password, type, profile_pic_url) = ("DigBar", "dbar@gmail.com", "gayraps", "Customer", "https://www.abc.com/dbar.jpg");
//-------------------------------------------------

module.exports = app;