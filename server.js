const User = require("../friendbook/models/User");

User.findByID(1, (error, user) =>
{
    if (error)
    {
        console.log(error);
        return;
    };
    console.log(user);
});