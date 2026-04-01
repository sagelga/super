# Apollo

Apollo is a GraphQL client. It performs GraphQL operations and returns results in JSON. We are using `apollo-client` as the main module for Apollo.

## Initializing Apollo Client

```javascript
// load required modules
const ApolloClient = require("apollo-client").ApolloClient;
const InMemoryCache = require("apollo-cache-inmemory").InMemoryCache;
const createHttpLink = require("apollo-link-http").createHttpLink;
const fetch = require("node-fetch");
const gql = require("graphql-tag");

// create apollo object (don't forget to import globalVars)
const apollo = new ApolloClient({
	link: createHttpLink({ uri: globalVars.gqlURL, fetch: fetch }),
	cache: new InMemoryCache()
});
```
## Using Apollo

### Simple Querying

Using Apollo is simple. Simply put a GraphQL query in the `query` object like the example below.

```javascript
apollo.query({ query: gql`[GraphQL query here]` });
```

It then returns a JavaScript object.

__Example:__ A function that sends a login request to the API and returns member information.

```javascript
const getMember = (usr, pwd) => {
	return apollo.query({
		query: gql`
			{
				login(username: "${usr}", password: "${pwd}") {
					member {
						id, username, firstName, lastName, email
					},
					token
				}
			}
		`
	});
};
```

### Querying with Authentication

Some queries require a bearer authentication token. This token is acquired when a user logs into the system (notice the _token_ key in the example above). To use a token with Apollo, see the example below.

```javascript
// load one more module
const setContext = require("apollo-link-context").setContext;

// declare a sample token
let amazingToken = "thisissowrongonsomanylevels";

// add a token to the header
const authLink = setContext((_, { headers }) => {
	return {headers: { authorization: token ? `bearer${amazingToken}` : "" }};
});

// create apollo object
const apollo = new ApolloClient({
	link: authLink.concat(
		createHttpLink({ uri: globalVars.gqlURL, fetch: fetch })
	),
	cache: new InMemoryCache()
});

// use apollo as normal
apollo.query({
	query: gql`
		{
			space(id: "a10ep-7g32a-kqn5x") {
				id, name, description, capacity, isAvailable
			}
		}
	`
});
```
