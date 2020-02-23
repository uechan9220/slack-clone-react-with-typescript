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

export const membershipSubscription = gql`
  subscription SidebarSubscription($user: String!) {
    Chanel(where: { Memberships: { userId: { _eq: $user } } }) {
      id
      name
      Memberships {
        userId
        direct
        id
        User {
          status
          username
        }
      }
      Memberships_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;