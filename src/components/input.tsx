import * as React from 'react'
import styled from 'styled-components'

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
`

export function InputMessage() {
  return <InputStyle type='text' placeholder='Message boku_doraemoon' />
}
