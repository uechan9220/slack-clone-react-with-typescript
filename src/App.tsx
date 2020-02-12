import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Layout } from './components/Layout'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

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
