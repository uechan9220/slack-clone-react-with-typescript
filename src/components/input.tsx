import * as React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const InputStyle = styled.input`
  padding: 1rem;
  border-radius: 7px;
  border: 3px solid darkgray;
  font-size: 1rem;
  outline: none;
  &:hover,
  &:active,
  &:focus {
    border: 3px solid dimgray;
  }
  box-sizing: border-box;
  position: fixed;
  bottom: 10px;
  width: calc(100vw - 240px);
`

const SubmitButton = styled.button`
  border-radius: 7px;
  outline: none;
  background-color: white;
  border: none;
  border-left: 3px solid darkgray;
  position: fixed;
  box-sizing: border-box;
  padding: 1.125rem;
  right: 15px;
  bottom: 15px;
  cursor: pointer;
`

const submitMessageMutation = gql`
  mutation SubmitMessage($userId: String!, $body: String, $channelId: uuid!) {
    insert_Message(
      objects: { userId: $userId, body: $body, channelId: $channelId }
    ) {
      returning {
        userId
        id
        body
        channelId
      }
    }
  }
`

export function InputMessage() {
  return (
    <Mutation mutation={submitMessageMutation}>
      {(submitMessage: any, { data }: any) => (
        <form
          onSubmit={e => {
            console.log((e.target as any).message.value)
            if ((e.target as any).message.value == 0) {
              alert('メッセージ入力をお願いします')
            } else {
              e.preventDefault()
              submitMessage({
                variables: {
                  userId: 'user1',
                  channelId: '82c255bb-924d-49de-a9f0-36f852b3e445',
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
          />
          <SubmitButton type="submit">
            <i className="fas fa-arrow-alt-circle-right"></i>
          </SubmitButton>
        </form>
      )}
    </Mutation>
  )
}
