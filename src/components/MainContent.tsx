import * as React from 'react'
import styled from 'styled-components'
import { MainContentHeader } from './MainContentHeader'

const Container = styled.div`
  padding: 1rem 3rem;
  color: black;
`

export function MainContent() {
  return (
    <Container>
      <MainContentHeader />
    </Container>
  )
}
