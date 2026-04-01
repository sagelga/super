# Utility Module
## `columnToLetter(column: String|Number) --> letter: String`
Converts column number (a number) to a letter.
A is equals to 1 and so on.

## `letterToColumn(letter: String) --> colNum: Number`
Converts column letter to a column number.
A reverse of `columnToLetter()`

## `arrayToComma(arrays: []) --> csv: String`
Converts 1 dimension arrays (normal ones) to String by dividing it via ', ' to separate the string values in different array list

## `rangeToArray(array: []) --> array: []`
Converts range (2 dimensional array) to Array.
Mostly used with 2d array that have only 1 dimension on (eg. `[1,]`)

## `milisecToTime(time: Number) --> time: String`
Converts milliseconds to string that is in 'DDd HHh MMm' format.

```
milisecToTime(10000000);
=> '0d 02h 47m'
```
