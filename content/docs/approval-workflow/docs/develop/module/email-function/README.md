# Email Function Module
## `getSubjectField()`
Generates the subject field for the email sending procedure.
Retrieves the information about the subject format from the `config` file,
as they are composed from the `prefix` and `suffix` of each type of request.

Retrieves the `response ID` and `request type` from the `response` object.

```js
getSubjectField(response: {}, args: {prefix: String, suffix: String})
```

### Input
| Attribute   | Type     | Description                             |
| ----------- | -------- | --------------------------------------- |
| response    | `{}`     | a response that will email will send to |
| args        | `{}`     |                                         |
| args.prefix | `String` | Prefix for Subject Field                |
| args.suffix | `String` | Suffix for Subject Field                |

## `getBodyField()`
Retrieves the body (response information) from the sheet to compose an email body in the table format, then store the calculated body field to the response object.

```js
getBodyField(rowNumber: Number)
```

### Input
| Attribute | Type     | Description                                    |
| --------- | -------- | ---------------------------------------------- |
| rowNumber | `Number` | row number that it will retrieve the data from |

### Output
| Attribute | Type     | Description                         |
| --------- | -------- | ----------------------------------- |
| body      | `String` | body of the email, in a HTML format |

## `sendEmails()`
Send emails to the given recipient.

This script is using `MailApp` object, which is 100% on Google Apps Script.

User that runs the script is the 'send from' .
In the production, you should have another email address space to run this script and they are the one sending emails.

```js
sendEmails(toAddress: String | Array, subject: String, body: String)
```

### Input
| Attribute | Type             | Description                                |
| --------- | ---------------- | ------------------------------------------ |
| toAddress | `String | Array` | email address that this email will send to |
| subject   | `String`         | subject of the email                       |
| body      | `String`         | body of the email                          |

### Output
| Attribute | Type     | Description                         |
| --------- | -------- | ----------------------------------- |
| body      | `String` | body of the email, in a HTML format |
