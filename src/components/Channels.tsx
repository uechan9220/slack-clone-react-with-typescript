import * as React from 'react'
import styled from 'styled-components'
import { ChannelProps } from '../generated/ChannelQuery'
import { StoreContext } from '../store/store'

const ChannelsTitles = styled.div`
  margin: 2rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  h2 {
    font-size: 1rem;
  }
`

const ChannelItem = styled.ul`
  margin: 0.25rem;
`

const Button = styled.button`
  background-color: transparent;
  padding: 5px;
  color: white;
  border: none;
  font-size: 1rem;
  &.channel-button {
    margin-top: 1rem;
    i {
      margin-right: 5px;
    }
  }
`

export function Channels({ channels }: ChannelProps) {
  const { dispatch } = React.useContext(StoreContext)

  const selectChannel = (id: string) => {
    dispatch({ type: 'SELECTED_CHANNEL', payload: id })
  }
  return (
    <>
      <ChannelsTitles>
        <h2>Channels</h2>
        <i className="fas fa-plus"></i>
      </ChannelsTitles>
      <ul>
        {channels.map(channel => (
          <ChannelItem
            onClick={() => selectChannel(channel.id)}
            key={channel.id}
          >
            # {channel.name}
          </ChannelItem>
        ))}
      </ul>

      <Button className="channel-button">
        <i className="fas fa-plus"></i> Add channel
      </Button>
    </>
  )
}
