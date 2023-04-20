function fib(n)
{
    fibArr = [0, 1]
    for (i = 2; i <= n; i++)
    {
        fibArr.push(fibArr[i - 1]+fibArr[i - 2])
    }
    return fibArr[n]
}

console.log(fib(10))