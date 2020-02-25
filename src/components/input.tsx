import * as React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { StoreContext } from '../store/store'
import { submitMessageMutation } from '../data/mutations'

const InputStyle = styled.input`
  padding: 1rem;
  border-radius: 7px;
  border: 3px solid ${props => `${props.theme.borderColorDark}`};
  font-size: 1rem;
  outline: none;
  &:hover,
  &:active,
  &:focus {
    border: 3px solid ${props => `${props.theme.hoverBorderColor}`};
  }
  box-sizing: border-box;
  position: fixed;
  bottom: 10px;
  width: calc(100vw - 240px);
`

const SubmitButton = styled.button`
  border-radius: 7px;
  outline: none;
  background-color: ${props => `${props.theme.backgroundColorLight}`};
  border: none;
  border-left: 3px solid ${props => `${props.theme.borderColorDark}`};
  position: fixed;
  box-sizing: border-box;
  padding: 1rem;
  right: 15px;
  bottom: 15px;
  cursor: pointer;
`

export function InputMessage() {
  const { selectedChannel, user } = React.useContext(StoreContext)
  const [inputValue, setInputValue] = React.useState('')

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)
  return (
    <Mutation mutation={submitMessageMutation}>
      {(submitMessage: any, { data }: any) => (
        <form
          onSubmit={e => {
            console.log((e.target as any).message.value)
            console.log(user)
            if ((e.target as any).message.value === 0) {
              alert('メッセージ入力をお願いします')
            } else {
              e.preventDefault()
              submitMessage({
                variables: {
                  userId: user,
                  channelId: selectedChannel.id,
                  body: (e.target as any).message.value
                }
              })
              ;(e.target as any).reset()
            }
          }}
        >
          <InputStyle
            name="message"
            type="text"
            placeholder="Message boku_doraemoon"
            onChange={onChangeInput}
          />
          <SubmitButton type="submit" disabled={inputValue === ''}>
            <i className="fas fa-arrow-alt-circle-right" />
          </SubmitButton>
        </form>
      )}
    </Mutation>
  )
}
