# Session

The project is using `express-session` as a middleware for session management.

## Initializing Session

Assuming you are in the root directory, with `express()` or `express.Router()` defined as `app`.

```javascript
// import global variables (change the path as needed)
const globalVars = require("./globalVars");

// import express-session
const session = require("express-session");

// use the session middleware
app.use(session(globalVars.sessionOptions));
```

## Using Session

Using session requires the `req` object. You can access the `session` object via `req.session`. You can then alter the `session` object as a normal object.

```javascript
// create a new 'hello' key in the session,
// with the value 'Sawasdee'
req.session.hello = "Sawasdee";

console.log(req.session.hello) // > "Sawasdee"
```
