import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Layout } from './components/Layout'

import ApolloClient, { split, HttpLink, InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { createHttpLink } from 'apollo-link-http'

const wsLink = new WebSocketLink({
  uri: `ws://slack-clone-heroku.herokuapp.com/v1/graphql`,
  options: {
    reconnect: true
  }
})

const httpLink = createHttpLink({
  uri: 'http://slack-clone-heroku.herokuapp.com/v1/graphql'
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  uri: 'https://slack-clone-heroku.herokuapp.com/v1/graphql'
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Layout />
      </div>
    </ApolloProvider>
  )
}

export default App
