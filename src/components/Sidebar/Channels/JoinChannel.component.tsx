import * as React from 'react'
import { Modal } from '../../Modal/Modal.component'
import { Form } from '../../../styles/ModalButtons'
import { allChannelsQuery } from '../../../data/queries'
import { Query, QueryResult } from 'react-apollo'
import styled from 'styled-components'
import { Input } from '../../../styles/Input.styles'
import { debounce } from 'lodash'

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
  ${ChannelItem}:last-child {
    border-bottom: 1px solid ${props => [props.theme.borderColorLight]};
  }
`

const SearchInput = styled(Input)`
  width: 100%;
  box-sizing: border-box;
`

export function JoinChannel(props: Props) {
  const refetchRef = React.useRef<Function>()
  const fetchData = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    (refetchRef as any).current({ channelName: `%${e.target.value}%` })
  }, 300)
  const filterChannels = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    fetchData(e)
  }
  return (
    <Modal close={props.exitCallback} title="Browse Channels">
      <>
        <Form>
          <SearchInput
            name="channelName"
            id="channelName"
            placeholder="Seach channels"
            onChange={filterChannels}
          />
        </Form>

        <Query query={allChannelsQuery} variables={{ channelName: '%%' }}>
          {({ loading, error, data, refetch }: QueryResult) => {
            refetchRef.current = refetch
            if (loading) {
              return <p>loading</p>
            }

            return (
              <>
                <ChannelContainer>
                  {data.Channel.map((channel: { id: string; name: string }) => (
                    <ChannelItem key={channel.id}># {channel.name}</ChannelItem>
                  ))}
                </ChannelContainer>
              </>
            )
          }}
        </Query>
      </>
    </Modal>
  )
}
