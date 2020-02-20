import gql from 'graphql-tag'

export const messageSubscription = gql`
  subscription MessageSubscription($channelId: uuid) {
    Message(where: { channelId: { _eq: $channelId } }) {
      id
      data
      body
      User {
        username
      }
    }
  }
`