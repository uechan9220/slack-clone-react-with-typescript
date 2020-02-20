import * as React from 'react'
import styled from 'styled-components'
import { Channels } from './Channels'
import { DirectMessages } from './DirectMessage'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import { Channel } from '../generated/ChannelQuery'
import { Membership } from '../generated/SidebarQuery'
import { StoreContext } from '../store/store'

const membershipQuery = gql`
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

const SidebarContainer = styled.div`
  width: 100%;
  background: #5a00b4;
  padding: 1rem;
  color: white;
`
const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 25px;
  font-size: 1.2rem;
`

const H1 = styled.h1`
  font-weight: 900;
  font-size: 1.3rem;
`

const UsernameContainer = styled.div`
  font-size: 1rem;
  grid-column-start: 1;
  grid-column-end: 3;
  margin-top: 0.5rem;
`

export const Status = styled.span`
  height: 0.7rem;
  width: 0.7rem;
  border-radius: 100%;
  background-color: green;
  margin-right: 0.5rem;
  display: inline-block;
`

export function Sidebar() {
  const { user } = React.useContext(StoreContext)
  console.log(user)

  return (
    <Query query={membershipQuery} variables={{ user: user }}>
      {({ loading, error, data }: any) => (
        <SidebarContainer>
          {!loading && console.log(data)}
          <Header>
            <H1>slack clone</H1>
            <div>
              <i className="far fa-bell"></i>
            </div>
            <UsernameContainer>
              <Status></Status>
              Moke
            </UsernameContainer>
          </Header>
          {!loading && data.Membership ? (
            <>
              <Channels
                channels={(data.Membership as Membership[])
                  .filter(membership => !membership.direct)
                  .map(membership => membership.Channel)}
              />
              <DirectMessages
                channels={(data.Membership as Membership[]).reduce(
                  (acc, value) => {
                    if (value.direct) {
                      return [...acc, value.Channel]
                    }
                    return acc
                  },
                  [] as Channel[]
                )}
              />
            </>
          ) : null}
        </SidebarContainer>
      )}
    </Query>
  )
}
