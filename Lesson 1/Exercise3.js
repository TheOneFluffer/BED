//Exercise 3
function  multiplicationTable(length)
{
    multiplication_table = []
    for(i = 1; i <= length + 1; i++)
    {
        length_table = []
        for(j = 1; j <= length + 1; j++)
        {
            length_table.push(j * 1)
        }

    multiplication_table.push(length_table);
    }
    return multiplication_table
}

console.log(multiplicationTable(12));