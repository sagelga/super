# Response Object

``` javascript
var response = {
      step1: {
        status: {
          value: null,
          cell: columnToLetter(getColumnNumber('Step 1 Status', {
            rowNumber: 1,
            sheetObject: sheet
          })) + i
        },
        timestamp: {
          value: null,
          cell: columnToLetter(getColumnNumber('Step 1 Timestamp', {
            rowNumber: 1,
            sheetObject: sheet
          })) + i
        },
        comments: {
          value: null,
          cell: columnToLetter(getColumnNumber('Step 1 Comments', {
            rowNumber: 1,
            sheetObject: sheet
          })) + i
        },
        formUrl: {
          value: null,
          cell: columnToLetter(getColumnNumber('Step 1 Response Form URL', {
            rowNumber: 1,
            sheetObject: sheet
          })) + i
        },
        email: {
          value: null,
          cell: columnToLetter(getColumnNumber("User's manager email address", {
            rowNumber: 1,
            sheetObject: sheet
          })) + i
        }
      },
      step2: {
        status: {
          value: null,
          cell: columnToLetter(getColumnNumber('Step 2 Status', {
            rowNumber: 1,
            sheetObject: sheet
          })) + i
        },
        timestamp: {
          value: null,
          cell: columnToLetter(getColumnNumber('Step 2 Timestamp', {
            rowNumber: 1,
            sheetObject: sheet
          })) + i
        },
        comments: {
          value: null,
          cell: columnToLetter(getColumnNumber('Step 2 Comments', {
            rowNumber: 1,
            sheetObject: sheet
          })) + i
        },
        formUrl: {
          value: null,
          cell: columnToLetter(getColumnNumber('Step 2 Response Form URL', {
            rowNumber: 1,
            sheetObject: sheet
          })) + i
        },
        email: {
          value: CONFIG.email.step2.email,
          cell: null
        }
      },
      step3: {
        status: {
          value: null,
          cell: null
        },
        timestamp: {
          value: null,
          cell: null
        },
        comments: {
          value: null,
          cell: null
        },
        formUrl: {
          value: null,
          cell: null
        },
        email: {
          value: CONFIG.email.step3.email,
          cell: null
        }
      },
      payloads: {
        id: {
          value: null,
          cell: columnToLetter(getColumnNumber('Response ID', {
            rowNumber: 1,
            sheetObject: sheet
          })) + i
        },
        skipRow: {
          value: null,
          cell: columnToLetter(getColumnNumber('Skips Override', {
            rowNumber: 1,
            sheetObject: sheet
          })) + i
        },
        email: {
          value: null,
          cell: columnToLetter(getColumnNumber('Email Address', {
            rowNumber: 1,
            sheetObject: sheet
          })) + i
        },
        requestType: {
          value: null,
          cell: columnToLetter(getColumnNumber('Request Type', {
            rowNumber: 1,
            sheetObject: sheet
          })) + i
        },
        timestamp: {
          value: null,
          cell: columnToLetter(getColumnNumber('Timestamp', {
            rowNumber: 1,
            sheetObject: sheet
          })) + i
        },
        requestTimeout: null,
        bodyField: null,
        rowNumber: i
      }
    }
```
