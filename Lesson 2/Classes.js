var mathLib =
{
    add:function(num1, num2)
    {
        return num1 + num2
    },

    minus:function(num1, num2)
    {
        return num1 - num2
    },

    mult:function(num1, num2)
    {
        return num1 * num2
    },

    div:function(num1, num2)
    {
        return num1 / num2
    },

    mod:function(num1, num2)
    {
        if(num1 < num2)
        {
            return console.log("First number cannot be smaller than Second number")
        }
        else
        {
            return num1 % num2
        }
    }
};

module.exports=mathLib;