# API guide

## GraphQL

We choose GraphQL instead of REST as a query language. See http://graphql.org for more information.

## How to Use

Try entering this url to your browser

http://api.panda.itforge.io/graphql?query={spaces{name}}

This sends GET request to `api.panda.itforge.io` host with `/graphql` path which our API lives in.
 
The varying part is our query string `query={spaces{name}}`

Value of `query` key in query string must contains valid GraphQL query like `{spaces{name}}`. In this case we ask server to gives us all spaces with their names.

See more about how to send GraphQL query over HTTP in http://graphql.org/learn/serving-over-http
