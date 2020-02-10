import * as React from 'react'
import styled from 'styled-components'
import { Status } from './Sidebar'

const MessagesTitles = styled.div`
  margin: 2rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  h2 {
    font-size: 1rem;
  }
`

const MessageItem = styled.ul`
  margin: 0.25rem;
`

export function DirectMessages() {
  const Message = ['Bot', 'moke', 'Jane Doe', 't.yamada', 't.satou']
  return (
    <>
      <MessagesTitles>
        <h2>Messages</h2>
        <i className="fas fa-plus"></i>
      </MessagesTitles>
      <ul>
        {Message.map(Message => (
          <MessageItem key={Message}><Status></Status> {Message}</MessageItem>
        ))}
      </ul>
    </>
  )
}
