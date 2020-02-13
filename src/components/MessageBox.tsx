import * as React from 'react'
import styled from 'styled-components'
import { Query, QueryResult } from 'react-apollo'
import gql from 'graphql-tag'
import { Message } from '../generated/MessageQuery'
import { StoreContext } from '../store/store'

const messageQuery = gql`
  query MessageQuery($channelId: uuid){
    Message(
      where: { channelId: { _eq: $channelId } }
    ) {
      body
      data
      User {
        username
      }
    }
  }
`

const messageSubscription = gql`
  subscription MessageSubscription($channelId: uuid) {
    Message(
       where: { channelId: { _eq: $channelId } }
    ){
      body
      data
      User {
        username
      }
    }
  }
`

const Container = styled.div`
  margin-top: 85px;
  overflow-y: auto;
  height: calc(100vh - 185px);
  li {
    margin: 0.5rem 0;
  }
  p {
    margin-top: 0.25px;
  }
`

const UserName = styled.span`
  font-weight: 800;
  margin-right: 5px;
  font-size: 1.2rem;
`

const DateSpan = styled.span`
  color: darkgray;
`

export function MessageBox() {
  const messageListRef = React.createRef<HTMLDivElement>()
  const { selectedChannel } = React.useContext(StoreContext)

  React.useEffect(() => {
    messageListRef.current!.scrollTo(
      messageListRef.current!.scrollTop,
      messageListRef.current!.scrollHeight
    )
  }, [messageListRef])

  const subscription = (subscribeToMore: any) => {
    subscribeToMore({
      document: messageSubscription,
      updateQuery: (prev: Message[], { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev
        return subscriptionData.data
      }
    })
  }

  return (
    <Query query={messageQuery} variables={{channelId: selectedChannel}}>
      {({ data, loading, subscribeToMore}: any) => (
        <Container ref={messageListRef}>
          <ul>
            {console.log(data)}
            {!loading && data && data.Message
              ? (data.Message as Message[]).map((message, index) => (
                  <li key={index}>
                    <UserName>{message.User.username}</UserName>
                    <DateSpan>
                      {/* {new Intl.DateTimeFormat('en-GB').format(
                    new Date(message.data)
                  )} */}
                      {message.data}
                    </DateSpan>
                    <p>{message.body}</p>
                  </li>
                ))
              : null}
          </ul>
        </Container>
      )}
    </Query>
  )
}
