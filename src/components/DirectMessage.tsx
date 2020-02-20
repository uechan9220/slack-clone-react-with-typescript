import * as React from 'react'
import styled from 'styled-components'
import { Status } from './Sidebar'
import { DirectMessageProps } from '../generated/DirectMessageQuery'
import { StoreContext, Actions } from '../store/store'
import { Item } from '../styles/SidebarItem.styles'

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

export function DirectMessages({ channels }: DirectMessageProps) {
   const { dispatch } = React.useContext(StoreContext)

   const selectChannel = (channel: { id: string; name: string }) => {
     dispatch({ type: Actions.SELECTED_CHANNEL, payload: channel })
   }
  return (
    <>
      <MessagesTitles>
        <h2>Messages</h2>
        <i className="fas fa-plus"></i>
      </MessagesTitles>
      <ul>
        {channels.map(channel => (
          <Item onClick={() => selectChannel({ id: channel.id, name: channel.name })} key={channel.id}><Status></Status> {channel.name}</Item>
        ))}
      </ul>
    </>
  )
}
