import * as React from 'react'
import styled from 'styled-components'

const SidebarContainer = styled.div`
  width: 100%;
  background: #b6cbe0;
  width: 180px;
`
const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 25px;
  color: white;
  padding: 1rem;
  font-size: 1.2rem;
`

const H1 = styled.h1`
  font-weigth: 900;
  font-size: 1.3rem;
`

const UsernameContainer = styled.div`
  font-size: 1rem;
  grid-column-start: 1;
  grid-column-end: 3;
  margin-top: .5rem;
`

export function Sidebar() {
  return (
    <SidebarContainer>
      <Header>
        <H1>slack clone</H1>
        <div>
          {/* ここにベルを入れる */}
          {/* <i className="far fa-bell"></i> */}
        </div>
        <UsernameContainer>
          Moke
        </UsernameContainer>
      </Header>
    </SidebarContainer>
  )
}
