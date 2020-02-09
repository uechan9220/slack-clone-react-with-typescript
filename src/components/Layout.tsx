import * as React from 'react'
import styled from 'styled-components'
import { Sidebar } from './Sidebar'

const Container = styled.div`
  display: flex;
  flex-wrap: warp;
  width: 100vw;
  height: 100vh;
`

const SidebarContainer = styled.div`
  width: 100%;
  background: #b6cbe0;
  width: 250px;
`

export function Layout() {
  return (
    <Container>
      <Sidebar />
      <div>message box</div>
    </Container>
  )
}
