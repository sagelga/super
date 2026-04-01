# Inbound Sheet Module
## `getStatusInbound()`
This function retrieves the status from the ID given by the input.
If the ID is found, the email address of the approver must match the email parameter input
```js
getStatusInbound(id, approverEmail)
```
### Input
| Attribute     | Type     | Description                   |
| ------------- | -------- | ----------------------------- |
| id            | `String` | Request ID to search from     |
| approverEmail | `String` | Approver Email to search from |
