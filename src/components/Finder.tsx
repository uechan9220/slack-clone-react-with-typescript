import * as React from 'react'
import styled from 'styled-components'

interface Props{
  exitCallback: () => void
}

const Container = styled.div`
  position: fixed;
  width: 94vw;
  height: 93vh;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 10;
  padding: 2rem;
`

const ExitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

export function Finder(props: Props) {
  return (
    <Container>
      <ExitButtonContainer>
        <div onClick={props.exitCallback}>
          <i className='far fa-times-circle' />
          Exit
        </div>
      </ExitButtonContainer>
    </Container>
  )
}