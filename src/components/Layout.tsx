import * as React from 'react'
import styled from 'styled-components'
import { Sidebar } from './Sidebar'
import { MainContent} from './MainContent'

const Container = styled.div`
  display: flex;
  flex-wrap: warp;
  width: 100vw;
  height: 100vh;
`

export function Layout() {
  return (
    <Container>
      <Sidebar />
      <MainContent/>
    </Container>
  )
}
