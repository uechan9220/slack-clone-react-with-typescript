import * as React from 'react'
import styled from 'styled-components'
import { Status } from './Sidebar'
import { DirectMessageProps } from '../generated/DirectMessageQuery'
import { StoreContext, Actions } from '../store/store'

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

export function DirectMessages({ channels }: DirectMessageProps) {
   const { dispatch } = React.useContext(StoreContext)

   const selectChannel = (id: string) => {
     dispatch({ type: Actions.SELECTED_CHANNEL, payload: id })
   }
  return (
    <>
      <MessagesTitles>
        <h2>Messages</h2>
        <i className="fas fa-plus"></i>
      </MessagesTitles>
      <ul>
        {channels.map(channel => (
          <MessageItem onClick={() => selectChannel(channel.id)} key={channel.id}><Status></Status> {channel.name}</MessageItem>
        ))}
      </ul>
    </>
  )
}
