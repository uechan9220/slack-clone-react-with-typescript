import * as React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { StoreContext } from '../../../store/store'
import { CreateChannelMutation, CreateMembership } from '../../../data/mutations'
import { Modal } from '../../Modal/Modal.component'
import { Input } from '../../../styles/Input.styles'
import { CloseButton, SubmitButton, Form } from '../../../styles/ModalButtons'

interface Props {
  exitCallback: () => void
}


export function Finder(props: Props) {
  const { user } = React.useContext(StoreContext)
  const [ inputValue, setInputValue ] = React.useState<string>('')
  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)
  return (
    <Modal close={props.exitCallback} title="Create a channel">
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
                  <Input
                    name="channelName"
                    id="channelName"
                    placeholder="eg leads"
                    onChange={onChangeInputValue}
                  />
                  <CloseButton onClick={props.exitCallback}>Cancel</CloseButton>
                  <SubmitButton disabled={inputValue === ''} type="submit">Create</SubmitButton>
                </Form>
              </>
            )}
          </Mutation>
        )}
      </Mutation>
    </Modal>
  )
}
