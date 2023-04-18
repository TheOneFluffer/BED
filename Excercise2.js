//Exercise 2
const numbers = [5,1,3,5,10,2,41,4];

function maxNumber(numlist)
{
    return(Math.max(...numlist));
}

console.log(maxNumber(numbers)) // 41