# Sheets Module
## `getCellValue()`
Get the cell value from the given columnNumber, rowNumber and sheetObject.

Data Type is determined by that cell data type. Returns '' when cell is empty or out of range

```js
getCellValue(columnNumber: String | Number,
             rowNumber: String | Number,
             sheetObject) --> dataType String
```

### Input
| Attribute    | Type              | Description                                    |
| ------------ | ----------------- | ---------------------------------------------- |
| columnNumber | `String / Number` | column number in which that cell is located in |
| rowNumber    | `String / Number` | row number in which that cell is located in    |
| sheetObject  | `Object`          | sheet object that cell is located in           |

### Output
| Type  | Description                                                              |
| ----- | ------------------------------------------------------------------------ |
| `any` | data type from input. Returns '' when the cell is empty or out of range. |

## `getColumnNumber()`
Retrieves the column number of that search query. Must be exact match to results in column number.

``` js
getColumnNumber(searchQuery: String | Number,
                args: {rowNumber: Number, sheetObject: Object}) --> colNum: Number
```

### Input
| Attribute        | Type              | Description                                                                              |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------------- |
| searchQuery      | `String / Number` | query of the search                                                                      |
| args             | `Object`          | (optional) settings to the search                                                        |
| args.rowNumber   | `Number`          | specified the row number (for search to go to only 1 line, instead of all) (default : 1) |
| args.sheetObject | `Object`          | specified the sheet that the search will be in. (default: sheet)                         |

### Output
| Type     | Description                                       |
| -------- | ------------------------------------------------- |
| `Number` | column number. Returns Null when the search fails |

## `getRowRange()`
Retrieves the array of row from the sheet.
Mostly used with other functions to retrieve single (or some) data from the range retrieval.

``` js
getRowRange(rowNumber: Number, sheetObject: {}) --> []
```

### Input
| Attribute   | Type              | Description                  |
| ----------- | ----------------- | ---------------------------- |
| rowNumber   | `String / Number` | row number                   |
| sheetObject | `Object`          | sheet that will retrieved in |

### Output
| Type | Description |
| ---- | ----------- |
| `[]` | range       |

## `getColumnRange()`
Retrieves the column value array from the sheetObject.
Mostly used in functions that wants the data from the array.

``` js
getColumnRange(columnNumber: Number, sheetObject: {}) --> []
```

### Input
| Attribute    | Type              | Description                       |
| ------------ | ----------------- | --------------------------------- |
| columnNumber | `String / Number` | column number                     |
| sheetObject  | `Object`          | sheet that will be retrieved from |

### Output
| Type | Description                                |
| ---- | ------------------------------------------ |
| `[]` | array with the value in that column number |

## `pullValue()`
Pulls the value from the given cell value (in `response` object) and store it into the `response` object.

Real definition of this function is to pull the data from the given cell value, but just using `response` to pull the cell value from and store it in the `response` object.

``` js
pullValue(response: {}) --> {}
```

### Input
| Attribute | Type     | Description                         |
| --------- | -------- | ----------------------------------- |
| response  | `Object` | response object of that row number. |

### Output
| Type | Description      |
| ---- | ---------------- |
| `{}` | updated response |

## `pushValue()`
Store the `value` (as given) to the cell, using the values in the `response` object.

Response key is required (given as `response`) in order to retrieve its cell value, using `setCellValue()`

``` js
pushValue(response: {}, value: any)
```

### Input
| Attribute | Type     | Description                                |
| --------- | -------- | ------------------------------------------ |
| response  | `Object` | response key (will retrieve cell from that |
| value     | `any`    | new value of that given cell               |

## `setCellValue()`
Set the cell value to a given value, by using the cell value given as a1Notation.

``` js
setCellValue(a1Notation: String, value: any, sheetObject: {})
```

### Input
| Attribute   | Type     | Description                                       |
| ----------- | -------- | ------------------------------------------------- |
| a1Notation  | `String` | cell value, noted in A1Notation                   |
| value       | `any`    | value of the cell will be                         |
| sheetObject | `Object` | sheet that the cell value is in (default : sheet) |

### Output
| Type | Description      |
| ---- | ---------------- |
| `{}` | updated response |

## `createNewColumn()`
Create a new column with the header name of name and settings with args object.

``` js
createNewColumn(name: any, args: {columnNumber, appendAfter, sheetObject, checkExistence})
```

### Input
| Attribute           | Type       | Description                                                                                            |
| ------------------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| name                | `String`   | value of the header label                                                                              |
| args                | `any`      |                                                                                                        |
| args.columnNumber   | `Object`   | column number that it will append to                                                                   |
| args.appendAfter    | `Boolean ` | if this true, the appended column will be at columnNumber + 1                                          |
| args.sheetObject    | `Object`   | sheet that the column will be append from                                                              |
| args.checkExistance | `Boolean ` | check whether the header is already exist or not. If it already exists, then do not create new column. |

