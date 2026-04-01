# How it works
This page will show you how the approval workflow works in real time. We still recommends you to read the code in `approvalProcess()` function.

## How the script works
1. Script will runs from Row n+1 (n = number of header row)
2. Checks the `Step 1 Approver Status` of the current row
   1. If it is `blank`, it will identifies as `New Request` and start the `New Request` process. Then repeats (2) with next row.
   2. If it is `Waiting`, it will checks the `Inbound` sheet data that holds the same Request ID and updates the corresponding status when there is a response. Then repeats (2) with next row.
   3. If the Status is `Approved`, the process repeats (2). But with `Step 2 Approver Status` and `Request Step 2 Approval`.
   4. Otherwise (as in case of `Reject` or `Skipped`), script will repeats (2) with next row.
3. When the status has reached to the last approver, (2) will starts again. But this time for `Approved`, it will sends an email to responder to do what the approver wants to do. Then the status will be updated as `Finished`.

## System Process
### New Request
Script will do as following to requests that has been tagged as `New Request`.
1. Send email to requester to notifies that the request is being processed.
2. Send email to `Step 1 Approver`, as determined by the requester.

### Checking the inbounds
Script will do as following to request that has been tagged as `Check for inbounds`.
1. Retrives the `Reqest ID` from the request.
2. Match `Request ID` with `Request ID` in inbounds. First response (order by Time) that contains the same `Request ID` will be chosen.
3. Chosen Response status are applied to the request.
