import * as React from 'react'
import styled from 'styled-components'
import { Query, Subscription } from 'react-apollo'
import gql from 'graphql-tag'
import { subscribe } from 'graphql'

const messageQuery = gql`
  {
    subscription {
      Message(
        where: { channelId: { _eq: "82c255bb-924d-49de-a9f0-36f852b3e445" } }
      ) {
        body
        data
        User {
          username
        }
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

interface Message {
  id: string
  body: string
  data: string
  User: {
    username: string
  }
}

export function MessageBox() {
  const messageListRef = React.createRef<HTMLDivElement>()

  React.useEffect(() => {
    messageListRef.current!.scrollTo(
      messageListRef.current!.scrollTop,
      messageListRef.current!.scrollHeight
    )
  }, [messageListRef])

  return (
    <Subscription subscription={messageQuery}>
      {({ data, loading }: any) => (
        <Container ref={messageListRef}>
          <ul>
            {!loading && data && data.Message
              ? (data.Message as Message[]).map(message => (
                  <li key={message.id}>
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
    </Subscription>
  )
}
