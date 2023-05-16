const express = require('express');
const bodyParser = require('body-parser');
const userDB = require('../model/user');

const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser); //attach body-parser middleware
app.use(bodyParser.json());  //parse json data

//Webservice endpoints
//-------------------------------------------------
app.get('/user', function(req,res)
{
    //processing...
    userDB.getUser(function(err,results)
    {
        if (err)
        {
            console.log(err);
            res.status(500);
            res.type("json");
            res.send(`{"Message":"Some error encountered!"}`);
        }
        else
        {
            res.status(200);
            res.type('json');
            res.send(results);
        }
    });
});

//get user logic
app.get('/user/:userid', function(req,res)
{
    var userid = req.params.userid;
    //processing...
    userDB.getUserByUserid(userid, function(err,results)
    {
        if (err)
        {
            console.log(err);
            res.status(500);
            res.type("json");
            res.send(`{"Message":"Some error encountered!"}`);
        }
        else
        {
            res.status(200);
            res.type('json');
            res.send(results);
        }
    });
});

//POST /user
app.post('/api/user',  function (req, res)
{
    //This is to create user
    var username = req.body.username;
    var email = req.body.email; 
    var role = req.body.role;
    var password = req.body.password;

    user.addUser(username, email, role, password, function (err, result)
    {
        if(!err)
        {
            console.log(result);
            res.send(result + ' record inserted');
        }
        else
        {
            res.send(err.statusCode);
        }
    });
});

//-------------------------------------------------

module.exports = app;