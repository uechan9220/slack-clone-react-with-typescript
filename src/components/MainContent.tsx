import * as React from 'react'
import styled from 'styled-components'
import { MainContentHeader } from './MainContentHeader'
import { MessageBox } from './MessageBox'
import { InputMessage } from './input'

const Container = styled.div`
  padding: 1rem 3rem;
  color: ${props => `${props.theme.textColorDark}`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`

export function MainContent() {
  return (
    <Container>
      <MainContentHeader />
      <MessageBox />
      <InputMessage />
    </Container>
  )
}
