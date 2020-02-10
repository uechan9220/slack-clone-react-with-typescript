import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export function MainContentHeader() {
  return (
    <Container>
      <div>
        <h3>#genneral</h3>
        <i className='far fa-user'></i>
      </div>
      <div>
        <input type='text' placeholder='search'></input>
      </div>
    </Container>
  )
}
