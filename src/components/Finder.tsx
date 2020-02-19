import * as React from 'react'
import styled from 'styled-components'

interface Props {
  exitCallback: () => void
}

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 10;
  padding: 2rem;
  color: black;
  box-sizing: border-box;
  font-size: 2rem;
`

const ExitButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  h1{
    width: 100%;
    text-align: center;
  }
`

const ButtonClose = styled.button`
  outline: none;
  border: none;
  border-radius: 50%;
  padding: 1rem;
  cursor: pointer;
  text-align: center;
  background-color: white;
  font-size: inherit;
  i {
    width: 100%;
    height: 100%;
  }
  &:hover {
    background-color: lightgray;
    opacity: 0.7;
  }
`

const Form = styled.form`
  max-width: 700px;
  label {
    font-weight: bolder;
    width: 100%;
  }
  input {
    width: 100%;
    padding: 1rem;
    border: 1px solid black;
  }
`

export function Finder(props: Props) {
  return (
    <Container>
      <ExitButtonContainer>
        <ButtonClose onClick={props.exitCallback}>
          <i className="far fa-times-circle" />
        </ButtonClose>
        <h1>Create channel</h1>
      </ExitButtonContainer>
      <Form>
        <label htmlFor="channelName">Name</label>
        <input name="channelName" id="channelName" placeholder="eg leads" />
      </Form>
    </Container>
  )
}