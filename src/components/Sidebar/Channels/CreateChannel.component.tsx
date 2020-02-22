import * as React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { StoreContext } from '../../../store/store'
import { CreateChannelMutation, CreateMembership } from '../../../data/mutations'
import { Modal } from '../../Modal/Modal.component'
import { Input } from '../../../styles/Input.styles'

interface Props {
  exitCallback: () => void
}

const CloseButton = styled.button`
  background-color: white;
  border: 1px solid lightgray;
  outline: none;
  border-radius: 1rem;
  color: dimgray;
  padding: 1rem;
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  :hover {
    border: 3px solid dimgray;
    color: black;
  }
`

const SubmitButton = styled(CloseButton)`
  background-color: darkgreen;
  border: 3px solid black;
  color: white;
  :disabled{
    background-color: lightgray;
    color: black;
    cursor: default;
  }
  &:not(:disabled):hover {
    color: white;
    border-color: 3px solid black;
  }
`

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
