# Email Module
## `sendRecieptEmail()`
Function compose the emails, based on the setting of the email design.
This function creates a receipt email (copy of the response) to the responder.

By pulling the data from the `response.payloads.email.value` as the email address.

```js
sendRecieptEmail(response)
```

### Input
| Attribute | Type | Description                             |
| --------- | ---- | --------------------------------------- |
| response  | `{}` | a response that will email will send to |

## `stepOneApprovalEmail()`
Function compose the emails, based on the setting of the email design.
This function sends request for approval email to the first responder (step 1)

By pulling the data from the `response.step1.email.value` as the email address.

```js
stepOneApprovalEmail(response: {})
```

### Input
| Attribute | Type | Description                             |
| --------- | ---- | --------------------------------------- |
| response  | `{}` | a response that will email will send to |

## `stepTwoApprovalEmail()`
Function compose the emails, based on the setting of the email design.
This function sends to 'request for approval' to step 2 responder.

By pulling the data from the `response.step2.email.value` as the email address.

```js
stepTwoApprovalEmail(response: {})
```

### Input
| Attribute | Type | Description                             |
| --------- | ---- | --------------------------------------- |
| response  | `{}` | a response that will email will send to |

## `sendFinalEmail()`
Function compose the emails, based on the setting of the email design.
This function sends the confirmation email to MDM after step 1 and step2 has approved the request.

By pulling the data from the `response.step3.email.value` as the email address.

```js
sendFinalEmail(response: {})
```

### Input
| Attribute | Type | Description                             |
| --------- | ---- | --------------------------------------- |
| response  | `{}` | a response that will email will send to |

## `stepOneRejectEmail()`
Function compose the emails, based on the setting of the email design.
This function notifies the requester that their following manager rejects the request.

By pulling the data from the `response.payloads.email.value` as the email address.

```js
stepOneRejectEmail(response: {})
```

### Input
| Attribute | Type | Description                             |
| --------- | ---- | --------------------------------------- |
| response  | `{}` | a response that will email will send to |

## `stepTwoRejectEmail()`
Function compose the emails, based on the setting of the email design.
By pulling the data from the `response.payloads.email.value` AND `response.step2.email.value` as the email address.

```js
stepTwoRejectEmail(response: {})
```

### Input
| Attribute | Type | Description                             |
| --------- | ---- | --------------------------------------- |
| response  | `{}` | a response that will email will send to |
