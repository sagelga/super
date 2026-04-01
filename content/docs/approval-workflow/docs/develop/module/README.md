# Introduction
Each function will be separated by its functionality or part of work. Each function is mostly independent from each other, but might requires data (such as Object) to complete any transaction.

::: tip NOTE
This documentation only covers the JavaScript part of my script. Some of the objects (eg. sheets, spreadsheet or MailApp ) is made by Google itself. To use these object, please read Google Documentation for more information.
:::

Function includes:
- `main` : contains core workflow. To edit the workflow, edit this file.
- `functions`: contains utility functions that will be used by other functions.
- `utility`: contains SheetObject utility functions that will deal with transforming data sets / inputs / objects
- configurations : contains general workflow configuration
- `sheets` : contains data read/write functions to core Google Sheets sheet. These function will deal with any data requests made from other function.
inbound sheets: contains data read/write functions to inbound form data ingestion.
- `email`: dealing with sending emails
- `email functions` : dealing with setting up email templates
