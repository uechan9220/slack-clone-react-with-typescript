import gql from 'graphql-tag'

export const messageQuery = gql`
  query MessageQuery($channelId: uuid) {
    Message(where: { channelId: { _eq: $channelId } }) {
      id
      body
      data
      User {
        username
      }
    }
  }
`

export const membershipQuery = gql`
  query($user: String!) {
    Membership(where: { userId: { _eq: $user } }) {
      id
      direct
      Channel {
        id
        name
      }
    }
  }
`