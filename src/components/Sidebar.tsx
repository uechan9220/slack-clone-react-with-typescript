import * as React from 'react'
import styled from 'styled-components'
import { Channels } from './Channels'
import { DirectMessages } from './DirectMessage'

const SidebarContainer = styled.div`
  width: 100%;
  background: #5a00b4;
  width: 180px;
  padding: 1rem;
  color: white;
`
const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 25px;
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
  margin-top: 0.5rem;
`

export const Status = styled.span`
  height: 0.7rem;
  width: 0.7rem;
  border-radius: 100%;
  background-color: green;
  margin-right: 0.5rem;
  display: inline-block;
`

export function Sidebar() {
  return (
    <SidebarContainer>
      <Header>
        <H1>slack clone</H1>
        <div>
          {/* ここにベルを入れる */}
          <i className="far fa-bell"></i>
        </div>
        <UsernameContainer>
          <Status></Status>
          Moke
        </UsernameContainer>
      </Header>
      <Channels />
      <DirectMessages />
    </SidebarContainer>
  )
}
