import * as React from 'react'
import { Modal } from '../../Modal/Modal.component'
import { Form } from '../../../styles/ModalButtons'
import { allUsersQuery, checkMembership } from '../../../data/queries'
import { Query, QueryResult, Mutation, useQuery } from 'react-apollo'
import styled from 'styled-components'
import { Input } from '../../../styles/Input.styles'
import { debounce } from 'lodash'
import { StoreContext, Actions } from '../../../store/store'
import { createDMChannel } from '../../../data/mutations'
// import { ExistingMembership } from '../../../data/mutations'

interface Props {
  exitCallback: () => void
}

interface User {
  username: string
  id: string
  color: string
}

const ChannelItem = styled.div`
  padding: 1rem 2rem;
  border-top: 1px solid ${props => props.theme.borderColorLight};
  box-sizing: border-box;
  cursor: pointer;
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

export function JoinDM(props: Props) {
  const { user, dispatch } = React.useContext(StoreContext)
  const createDMRef = React.useRef<Function>()
  const refetchRef = React.useRef<Function>()
  const { data, loading, refetch } = useQuery(allUsersQuery, {
    variables: { currentUserId: user, filter: '%' }
  })
  const fetchData = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    refetch({
      currentUserId: user,
      filter: `%${e.target.value}%`
    })
  }, 300)
  const filterChannels = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    fetchData(e)
  }

  function selectUser(
    user: { id: string; name: string },
  ) {
      (createDMRef as any)
        .current({
          variables: { userId: user }
        })
        .then((res: any) => {
          console.log(res)
          // const channelAffilication =
          //   res.data.insert_Membership.returning[0].Channel
          // dispatch({
          //   type: Actions.SELECTED_USER,
          //   payload: channelAffilication
          // })
        })
    props.exitCallback()
  }

  return (
    <Modal close={props.exitCallback} title="Direct Messages">
      <>
        <Form>
          <SearchInput
            name="channelName"
            id="channelName"
            placeholder="Seach channels"
            onChange={filterChannels}
          />
        </Form>

        <Mutation mutation={createDMChannel}>
          {(createDMFn: any) => {
            createDMRef.current = createDMFn
            return (
              <Query
                query={allUsersQuery}
                variables={{ currentUserId: user, filter: '%%' }}
              >
                {({ loading, error, data, refetch }: QueryResult) => {
                  refetchRef.current = refetch
                  if (loading) {
                    return <p>loading</p>
                  }

                  return (
                    <>
                      <ChannelContainer>
                        {data.User.map(
                          (user: {
                            id: string
                            username: string
                          }) => (
                            <ChannelItem
                              key={user.id}
                              onClick={() =>
                                selectUser(
                                  {id: user.id, name: user.username}
                                )
                              }
                            >
                              @ {user.username}
                            </ChannelItem>
                          )
                        )}
                      </ChannelContainer>
                    </>
                  )
                }}
              </Query>
            )
          }}
        </Mutation>
      </>
    </Modal>
  )
}
