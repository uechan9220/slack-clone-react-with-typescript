import * as React from 'react'
import styled from 'styled-components'

const ChannelsTitles = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  h2{
    font-size: 1rem;
  }
`

export function Channels() {
  return (
    <ChannelsTitles>
      <h2>Channels</h2>
      <i className="fal fa-plus-circle"></i>
    </ChannelsTitles>
  )
}