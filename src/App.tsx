import React from 'react'
import './App.css'
import { Layout } from './components/Layout'

import ApolloClient, { split } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { createHttpLink } from 'apollo-link-http'
import { StoreContextProvider } from './store/store'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme/theme'

const wsLink = new WebSocketLink({
  uri: `wss://${process.env.REACT_APP_HASURA_ENDPOINT}`,
  options: {
    reconnect: true,
    timeout: 30000,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET
      }
    }
  }
})

const httpLink = createHttpLink({
  uri: `http://${process.env.REACT_APP_HASURA_ENDPOINT}`,
  headers: {
    'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET
  }
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
  uri: `https://${process.env.REACT_APP_HASURA_ENDPOINT}`,
  headers: {
    'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET
  },
})

const App = () => {
  return (
    <StoreContextProvider>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <div>
            <Layout />
          </div>
        </ApolloProvider>
      </ThemeProvider>
    </StoreContextProvider>
  )
}

export default App
