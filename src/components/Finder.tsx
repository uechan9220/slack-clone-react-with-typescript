import * as React from 'react'
import styled from 'styled-components'

interface Props{

}

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: white;
`

export function Finder(props: Props) {
  return (
    <Container>
      test inside
    </Container>
  )
}