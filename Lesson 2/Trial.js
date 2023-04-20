function add (num1, num2)
{
    return num1 + num2;
}

function mod (num1, num2)
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

module.exports.add = add
module.exports.mod = mod