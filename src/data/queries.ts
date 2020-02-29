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
  query MembershipQuery($userId: String!) {
    Membership(where: { userId: { _eq: $userId } }) {
      id
      direct
      Channel {
        id
        name
      }
    }
  }
`

export const allChannelsQuery = gql`
  query ChannelsQuery($channelName: String) {
    Channel(where: { name: { _ilike: $channelName }, Memberships: {direct: {_eq: false}} }) {
      id
      name
      Memberships {
        userId
      }
    }
  }
`
