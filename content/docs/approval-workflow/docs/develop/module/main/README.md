# Main Module

## `onOpen()`
**Triggers automatically** after the host containers (sheet that this script hosted in) open.
It will opens the menu in the Google Sheets UI for manual operations.

In `functionName` key, there will be a function name labeled with `name` key.
`name` will be shown in the menu UI, and it will triggers `functionName`.

## `approveProcess()`
Starts the `approveResponse()` multiple times (as the first row of response to the last row of sheet).
That makes sure that every line has been run once.

Editing this function to run multiple times (currently running once) makes the script to updates the approval status and then proceeds the process by sending emails or mark to skip.

## `approveResponse(rowNumber: Number)`
A core process of the script. As it reads the information from the sheet and redistribute it throughout the script's function.

This function runs only a single row.

## `sheetPreparation()`
Script built for checking whether the system-required column is there or not. Not to be confused with fixing the missing column.
If they are not available, alert UI will be triggered, and show the value of the missing column.

This function should be executed in a `standalone` trigger mode (as it requires UI to show the response). To trigger a standalone execution, please read the other documentation page for more information.
