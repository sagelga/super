# Approval Status

## Type of Status
For each of the approval request, it will only contains one of the four status as following:

1. Approved
2. Rejected
3. Waiting
4. Skipped
5. Finished
6. [anything else]

### Approved
Approver of that level has approved the request. The request will either:

1. Send to the team that are response of doing what the approver wants to
2. Elevate the request to another approver. This will restart the process, but with a `Step [current_step + 1]` approver.

### Rejected
Any approver on any level rejects the request. Requester will be notified as the request has been rejected.

### Waiting
Request still waiting for approver's approval. Waiting request will either
1. Continue to wait
2. Resend the request via an email again after xx days of no response

### Skipped or [anything else]
Request is skipped by either:

1. Sheet Manager forced to skip this approval request.
2. Script forces the request to skip this request flow (i.e. Request has been Completed and Fulfilled).
3. Script ran to an issue, as it cannot understand the status of that request.

### Finished
Request has been approved. E-mail has been sent to responders and everything works perfectly. Script will acts this response in the same way as 'Skipped'.

Script will runs and actively refreshing the status only to status that are either 'Waiting' or 'Approved'.

'Rejected' and 'Skipped' request will be skipped immedietely.

## Edit the status
Editing the status is possible, but please make sure that the status format matches Approval Status. Here's some examples you can modify the request's status.

### Option 1 Edit status manually
Works with all status type
1. Go to the response row that you want to override
2. Go to the 'current step' of approval (marked with 'Waiting') or any step that will not get skipped. For more information about response status, please visit the link below.
3. Edit the status of that cell to any valid status value
4. Starts or wait for script to run
Make sure that you are typing in the correct format of approval status. If the status is incorrect, it will fallback and tries to roll back to the previous status.

### Option 2 Faking up Responses
Loophole behind this allows you to Approve or Reject any Response. Only works when the status is in `Waiting`.
1. Copy the Request ID from the request that you want to edit
2. Go to Target Response Form
3. Send a form with the Request ID and a status that you want
4. Script will picks the Respose as valid and continues with the script.
