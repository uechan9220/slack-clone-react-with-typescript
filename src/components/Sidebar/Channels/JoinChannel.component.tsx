import * as React from 'react'
import { Modal } from '../../Modal/Modal.component'
import { Form } from '../../../styles/ModalButtons'
import { allChannelsQuery } from '../../../data/queries'
import { Query, QueryResult } from 'react-apollo'
import styled from 'styled-components'

interface Props {
  exitCallback: () => void
}

const ChannelContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid ${props => props.theme.borderColorLight};
`

export function JoinChannel(props: Props) {
  return (
    <Modal close={props.exitCallback} title="Browse Channels">
      <Query query={allChannelsQuery}>
        {({ loading, error, data }: QueryResult) => {
          if (loading) {
            return <p>loading</p>
          }

          return data.Channel.map((channel: { id: string; name: string }) => (
            <ChannelContainer key={channel.id}>
              # {channel.name}
            </ChannelContainer>
          ))
        }}
      </Query>
    </Modal>
  )
}
