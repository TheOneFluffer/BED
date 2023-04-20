// function Testing(num)
// {
//     console.log(`The number is ${num}`);
// }

// Testing("Hello");


//Exercise 1
const n = 15;

function bigBus(numbers)
{
    numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

    for (i = 0; i < numbers(); i++)
    {
        if (i % 3 == 0)
        {
            return('Big');
        }
        else if (i % 5 == 0)
        {
            return('Bus');
        }
        else if (i % 3 == 0 && i % 5 == 0)
        {
            return('BigBus')
        }
        else
    }
}
console.log(bigBus(n))