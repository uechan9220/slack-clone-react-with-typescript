import * as React from 'react'
import { Modal } from '../../Modal/Modal.component'
import { Form } from '../../../styles/ModalButtons'
import { allChannelsQuery } from '../../../data/queries'
import { Query, QueryResult } from 'react-apollo'
import styled from 'styled-components'
import { Input } from '../../../styles/Input.styles'

interface Props {
  exitCallback: () => void
}

const ChannelItem = styled.div`
  padding: 1rem 2rem;
  border-top: 1px solid ${props => props.theme.borderColorLight};
  box-sizing: border-box;
`

const ChannelContainer = styled.div`
  margin-top: 2rem;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
`

const SearchInput = styled(Input)`
  width: 100%;
  box-sizing: border-box;
`

export function JoinChannel(props: Props) {
  return (
    <Modal close={props.exitCallback} title="Browse Channels">
      <Query query={allChannelsQuery} variables={{ channelName: '%%' }}>
        {({ loading, error, data }: QueryResult) => {
          if (loading) {
            return <p>loading</p>
          }

          return (
            <>
              <Form
                onSubmit={(e: any) => {
                  console.log(e.target.channelName.value)
                  e.preventDefault()

                  e.target.reset()
                }}
              >
                <SearchInput
                  name="channelName"
                  id="channelName"
                  placeholder="Seach channels"
                />
              </Form>
              <ChannelContainer>
                {data.Channel.map((channel: { id: string; name: string }) => (
                  <ChannelItem key={channel.id}># {channel.name}</ChannelItem>
                ))}
              </ChannelContainer>
            </>
          )
        }}
      </Query>
    </Modal>
  )
}
