import * as React from 'react'
import styled from 'styled-components'
import { StoreContext } from '../store/store'
import { Input } from '../styles/Input.styles'

const Container = styled.div`
  z-index: 5;
  background-color: white;
  position: fixed;
  top: 0;
  width: calc(100vw - 240px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid lightgray;
`

const Title = styled.div`
  h3 {
    font-weight: 900;
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
  }
  i {
    margin-right: 0.5rem;
    color: darkgray;
  }
`

export function MainContentHeader() {
  const { selectedChannel } = React.useContext(StoreContext)

  return (
    <Container>
      <Title>
        <div>
          <h3>#{selectedChannel.name}</h3>
        </div>
        <div>
          <i className='far fa-user'></i>
          42 members
        </div>
      </Title>
      <div>
        <Input type='text' placeholder='search' />
      </div>
    </Container>
  )
}
