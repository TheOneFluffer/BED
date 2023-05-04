const express = require('express');
const bodyParser = require('body-parser');
const host = "localhost";
const port = "8080";
const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser); //attach body-parser middleware
app.use(bodyParser.json());  //parse json data

//code logic for your ws API
//--------------------
var users = [
    {"userid":1, "username":"John", "email":"Mikehawk@abc.com", "age":"30", "password":"abc123"},
    {"userid":2, "username":"Mary", "email":"Maryland@abc.com", "age":"20", "password":"abc1234"}
];

app.get('/user',function(req,res)
{
    res.status(200);
    res.type('json');
    res.send(users);
});

//GET /user/:userid
app.get("/user/:userid", function(req,res)
{
    var userid = req.params.userid;
    var index = -1;
    var found = false;
    for (var i=0;i<users.length;i++) {
        if (users[i].userid==userid) {
            found = true;
            index = i;
            break;
        }
    }
    if (found) {
        console.log(users[index]);
        res.status(200);
        res.type('json');
        res.send(`{"user":${JSON.stringify(users[index])}}`);
    } else {
        res.status(404);
        res.type('json');
        res.send(`{"Message":"Userid ${userid} not found"}`);
    }
});

//POST /user
app.post("/user",function(req,res) {
    //retrieve user req input values
    var username = req.body.username;
    var email = req.body.email;
    var age = req.body.age;
    var password = req.body.password;

    //process request according to specs
    var userid = users[users.length-1].userid+1;
    //processing 
    var user = {"userid":userid, "username":username,"email":email,"age":age,"password":password};
    users.push(user);

    //return the response accordingly
    res.status(201);
    res.type('json');
    res.send(`{"Message":"New user with userid ${userid} created"}`);
});

//Deleting Users
app.delete("/user/:userid", function(req,res)
{
    //retrieve user req input values
    var username = req.body.username;
    var email = req.body.email;
    var age = req.body.age;
    var password = req.body.password;

    var userid = req.params.userid;
    var index = -1;
    var found = false;
    for (var i=0;i<users.length;i++)
    {
        if (users[i].userid==userid)
        {
            found = true;
            index = i;
            break;
        }
    }
    if (found)
    {
        users.splice(index, 1);
        res.status(200);
        res.type('json');
        res.send(`{"Message":"User with userid ${userid} has been deleted!"}`);
    }
    else
    {
        res.status(404);
        res.type('json');
        res.send(`{"Message":"Userid ${userid} not found"}`);
    }
});

//Editing user email
app.put("/user/:userid", function(req,res)
{
    //retrieve user req input values
    // var username = req.body.username;
    var email = req.body.email;
    // var age = req.body.age;
    // var password = req.body.password;

    var userid = req.params.userid;
    var index = -1;
    var found = false;
    for (var i=0;i<users.length;i++)
    {
        if (users[i].userid==userid)
        {
            found = true;
            index = i;
            break;
        }
    }
    if (found)
    {
        // users.splice(index, 1);
        var Uid = parseInt(userid)-1;
        console.log(Uid);
        var newDict = users[Uid];//Create new variable as dictionary
        newDict["email"] = email;
        res.status(200);
        res.type('json');
        res.send(`{"Message":"Userid ${userid}'s email has been edited!"}`);
    }
    else
    {
        res.status(404);
        res.type('json');
        res.send(`{"Message":"Userid ${userid}'s email cannot be edited!"}`);
    }
});

//-------------------

app.listen(port, host, () => 
{
    console.log(`Server started and accessible via http://${host}:${port}/`);
});
