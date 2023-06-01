var express=require('express');
var bodyParser=require('body-parser');

//Import databases from /models
const usersDB = require('../models/usersMenu');
const categoryDB = require('../models/categoryMenu');

var app=express();

var urlencodedParser = bodyParser.urlencoded({ extended:false });
app.use(bodyParser.json()); //parse appilcation/json data
app.use(urlencodedParser); //parse json data

//Webservice endpoints
//-------------------------------------------------
//Endpoint 1
app.get('/users', function(req, res) // This works
{
    //processing
    usersDB.getUsers(function(err, results)
    {
        if (err)
        {
            console.log("err");
            res.status(500);
            res.type("json");
            res.send(`{"Message":"Internal Server Error"}`);
        }
        else
        {
            res.status(200);
            res.type("json");
            res.send(results);
        }
    });
});

//Endpoint 2
app.post('/users', function (req, res) //Somewhat works, I get undefined error on line 76 but fixed it with manual text
{
    //retrieve user input
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var type = req.body.type;
    var profile_pic_url = req.body.profile_pic_url;

    usersDB.addUsers(username, email, password, type, profile_pic_url, function (err, results) 
    {
        if (err)
        {
            if (err.code === "ER_DUP_ENTRY")// Check for Duplication Entry
            { 
                if (err.sqlMessage.includes("email")) // Duplicate entry error for the email 
                {    
                    console.log(err);
                    res.status(422);
                    res.type("json");
                    res.send({"Message":"The email provided already exists."});
                }
            }

            else
            {
                console.log(err);
                res.status(500);
                res.type("json");
                res.send({"Message":"Some error encountered!"});
            }
        }

        else
        {
            res.status(201);
            res.type("json");
            res.send("User has been created!");
        }
    });
})

//Endpoint 3
app.get('/users/:id', function(req, res) 
{
    var userid = req.params.id;

    usersDB.getUserID(userid, function(err, results)
    {
        if (!err)
        {
            console.log("retrieving");
            res.status(200);
            res.type("json");
            res.send(results);
        }
        else
        {
            console.log(err);
            res.status(500);
            res.type("json");
            res.send(`{"Message":"Internal Server Error"}`);
        }
    });
});

//Endpoint 4
app.post('/category', function (req, res) //WIP
{
    //retrieve user input
    var catname = req.body.catname;
    var description = req.body.description;

    categoryDB.addCategory(catname, description, function (err, results) 
    {
        if (err)
        {
            if (err.code === "ER_DUP_ENTRY")// Check for Duplication Entry
            { 
                if (err.sqlMessage.includes("catname")) // Duplicate entry error for the email 
                {    
                    console.log(err);
                    res.status(422);
                    res.type("json");
                    res.send({"Message":"The category name provided already exists."});
                }

                else if (err.sqlMessage.includes("description")) // Duplicate entry error for the email 
                {    
                    console.log(err);
                    res.status(422);
                    res.type("json");
                    res.send({"Message":"The category description provided already exists."});
                }
            }

            else
            {
                console.log(err);
                res.status(500);
                res.type("json");
                res.send({"Message":"Internal Server Error"});
            }
        }

        else
        {
            res.status(201);
            res.type("json");
            res.send("Review has been created!");
        }
    });
})

//Endpoint 5


//If I ever need to delete stuff in mysql, code: 
//DELETE FROM game_server_assignment.users WHERE (username, email, password, type, profile_pic_url) = ("DigBar", "dbar@gmail.com", "gayraps", "Customer", "https://www.abc.com/dbar.jpg");
//-------------------------------------------------

module.exports=app;