# Script's Constraint
This is the list of all constrains that exists in the script.
Make sure that you did not do things as following, as the data retrieval or update can create a bigger issue.

## System-required column header or whole column
As it is required by the script to fetch and release data correctly. Do not delete system-required column header or whole column while the script is running.

## System-required sheet deletions / name edit
You should not delete/rename the 'Response' and 'Inbound' sheet while the script is running.

## Inserting / Moving data between rows
You should not insert or move any row between the response record. It will cause the response ID to recalculate and may looking for inbound that have the same IDs.

Any same ID in the header does not make error, but just correction of the data is wrong.

If the response ID is changed, no worries. But to the response in the inbound, that must be changed to 'respond to the new response ID'.

## Change data type in system-required column
Changing the data type via Sheet might cause the script to retrieve unreadable data, causing script to make errors.

## Footer Row
There is no support for footer row. Footer row will be treated as a Response.

## Changing status manually
If you have changed the status manually, please make sure it is script-readable. Else the script will incorrectly determines the Response actions.

## Have multiple system-required header name
When there is a multiple system-required header name (e.g. Response ID), script will takes the leftmost data as system-required column. (i.e. When you have Response ID at column A and D, script will takes column A as system-required column for Response ID)

For best practice, you should not have any duplicate header name. This can cause data to be fetched from a wrong column or store data in an incorrect column.
