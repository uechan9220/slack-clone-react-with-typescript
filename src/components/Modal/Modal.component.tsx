import * as React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

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
  h1 {
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
  height: 88px;
  width: 88px;
  i {
    font-size: 2rem;
  }
  &:hover {
    background-color: lightgray;
    opacity: 0.7;
  }
  span {
    font-size: 1rem;
  }
`

interface Props {
  children: React.ReactNode[] | React.ReactNode
  close: () => void
  title: string
}

export function Modal(props: Props) {
  const modalRoot = document.querySelector('#modal-root')
  React.useEffect(() => {
    const elem = document.createElement('div')
    modalRoot!.appendChild(elem)
    return () => {
      modalRoot!.removeChild(elem)
    }
  }, [modalRoot])
  return ReactDOM.createPortal(
    <Container>
      <>
        <ExitButtonContainer>
          <ButtonClose onClick={props.close}>
            <i className="far fa-times-circle" />
            <span>esc</span>
          </ButtonClose>
          <h1>Create a channel</h1>
        </ExitButtonContainer>
        <h1>{props.title}</h1>
        {props.children}
      </>
    </Container>,
    modalRoot!
  )
}
