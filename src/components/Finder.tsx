import * as React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { StoreContext } from '../store/store'
import { CreateChannelMutation, CreateMembership } from '../data/mutations'
import { Modal } from './Modal/Modal.component'

interface Props {
  exitCallback: () => void
}

const Form = styled.form`
  max-width: 700px;
  label {
    font-weight: bolder;
    width: 100%;
  }
  input {
    width: 100%;
    padding: 1rem;
    border: 1px solid black;
  }
`

export function Finder(props: Props) {
  const { user } = React.useContext(StoreContext)
  return (
    <Modal close={props.exitCallback} title="Create Title">
      <Mutation mutation={CreateMembership} update={() => props.exitCallback()}>
        {(createMembership: any, { data }: any) => (
          <Mutation
            mutation={CreateChannelMutation}
            update={(cache: any, data: any) => {
              console.log(data)
              console.log(data.data.insert_Channel!.returning[0].id)
              console.log(user)
              createMembership({
                variables: {
                  channelId: data.data.insert_Channel!.returning[0].id,
                  userId: user
                }
              })
            }}
          >
            {(createChannel: any, { data }: any) => (
              <>
                <Form
                  onSubmit={(e: any) => {
                    console.log(e.target.channelName.value)
                    e.preventDefault()
                    createChannel({
                      variables: { name: e.target.channelName.value }
                    })
                    e.target.reset()
                  }}
                >
                  <label htmlFor="channelName">Name</label>
                  <input
                    name="channelName"
                    id="channelName"
                    placeholder="eg leads"
                  />
                  <button onClick={props.exitCallback}>Cancel</button>
                  <button type="submit">Create</button>
                </Form>
              </>
            )}
          </Mutation>
        )}
      </Mutation>
    </Modal>
  )
}
